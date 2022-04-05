<template>
    <beautiful-chat
        :participants="participants"
        :titleImageUrl="titleImageUrl"
        :onMessageWasSent="onMessageWasSent"
        :messageList="messageList"
        :newMessagesCount="newMessagesCount"
        :isOpen="isChatOpen"
        :close="closeChat"
        :open="openChat"
        :showEmoji="true"
        :showFile="true"
        :showEdition="true"
        :showDeletion="true"
        :deletionConfirmation="true"
        :showTypingIndicator="showTypingIndicator"
        :showLauncher="true"
        :showCloseButton="true"
        :colors="colors"
        :alwaysScrollToBottom="alwaysScrollToBottom"
        :disableUserListToggle="true"
        :messageStyling="messageStyling"
        @onType="handleOnType"
        @edit="editMessage"
        title="NFQA问答机器人"
    >
        <template v-slot:text-message-body="{ message }">
            <div align="left" v-if="message.data.meta">
                <div>{{ message.data.text }}</div>

                <el-link v-if="store.state.displayPreview">
                    <router-link target="_blank" :to="message.data.meta">
                        <span>预览</span>
                    </router-link>
                    <el-icon class="el-icon--right">
                        <iconview />
                    </el-icon>
                </el-link>

                <el-link :href="message.data.url" v-if="store.state.displayPreview">
                    <span>下载</span>
                    <el-icon class="el-icon--right">
                        <download />
                    </el-icon>
                </el-link>
            </div>

            <div align="left" v-else>
                {{ message.data.text }}

                <div v-if="message.data.preview">
                    <el-radio-group v-model="isNeedPreview" @change="myRadioCallBack">
                        <el-radio :label="true" size="small" :disabled="isDisableRadio">是</el-radio>
                        <el-radio :label="false" size="small" :disabled="isDisableRadio">否</el-radio>
                    </el-radio-group>
                </div>

                <div>
                    <el-rate
                        v-if="message.data.rate"
                        allow-half
                        v-model="rate"
                        @click="thanks"
                        :disabled="isDisableRate"
                    />
                </div>
            </div>
        </template>
    </beautiful-chat>
</template>

<script lang="ts" setup>
import Axios from "axios";
import { useStore } from "vuex";
import { ElNotification } from "element-plus";
import { getCurrentInstance, reactive, ref, h } from "vue";
import { Download, View as iconview } from "@element-plus/icons-vue";

import getHttp from "../utils/django-http";
import { message, notice, record, searchResult } from "../utils/interfaces";
import { stringIsEmpty, isString } from "../utils/type-utils";
import { colors, participants, titleImageUrl } from "../utils/robot-information";

const store = useStore();
const isNeedPreview = ref(false);
const isDisableRadio = ref(false);
const isDisableRate = ref(false);

const myRadioCallBack = () => {
    isDisableRadio.value = true;
    if (isNeedPreview.value) {
        messageList.push(addMessage("robot", { text: "给你看!" }));
    } else {
        messageList.push(addMessage("robot", { text: "不给你看!" }));
    }
};
const rate = ref(null);

const thanks = () => {
    isDisableRate.value = true;
    ElNotification({
        title: "谢谢评分😜",
        message: h("i", { style: "color: teal" }, "我们会继续努力的！"),
        position: "top-right",
    });
};

const addMessage = (author: string, data: object, type: string = "text"): message => {
    return { type: type, author: author, data: data };
};

let messageList: Array<message> = reactive([
    addMessage("robot", { text: "欢迎来到NFQA!" }),
    addMessage("robot", { text: "你可以向我一些问题。" }),
    addMessage("robot", { text: "请问您要预览文件吗？", preview: true }),
    addMessage("robot", { text: "请为我们评分 谢谢!", rate: true }),
]);

let newMessagesCount = ref(0);
let isChatOpen = ref(false);
let showTypingIndicator = ref("");
let alwaysScrollToBottom = ref(false);
let messageStyling = ref(true);

const search = async (question: string) => {
    const instance = getCurrentInstance();
    const http = getHttp(instance);
    const api = http + "neo4j/";
    store.state.chatCount += 1;

    try {
        let data: record = { question: question, state: 0, history: { context: [] }, count: 0 };

        if (store.state.hasHistory) {
            data = executeHistoryHandler(question);
        }

        //当聊天轮数小于5 才请求后端
        let response = { data: { results: "" } };
        if (store.state.chatCount < 5) {
            response = await Axios.post(api, data);
        }
        const results: Array<notice> | string = response.data.results;
        //当聊天轮数小于3 才保存历史
        if (store.state.chatCount < 3) {
            store.state.history = {
                context: results,
            };
        }
        store.state.hasHistory = true;

        return processResult(results);
    } catch (error) {
        console.log(error);
        throw new Error("没有查找到结果");
    }
};

const selectedFile = (question: string): record => {
    const item_number = Number(question);
    store.state.history.context = store.state.history.context[item_number - 1];
    let data: record = {
        question: "selected",
        state: 1,
        history: store.state.history.context,
        count: store.state.chatCount,
    };
    return data;
};

const executeHistoryHandler = (question: string): record => {
    let data: record;
    if (store.state.chatCount === 2) {
        data = selectedFile(question);
    } else {
        data = {
            question: question,
            state: 1,
            history: store.state.history.context[0],
            count: store.state.chatCount,
        };

        if (store.state.chatCount === 5) {
            if (question === "YES") {
                confirmPreview();
            }
        }
        if (store.state.chatCount === 6) {
            if (question === "YES") {
                messageList.push(addMessage("robot", { text: "谢谢，是否退出！" }));
            }
        }
        if (store.state.chatCount === 7) {
            if (question === "YES") {
                messageList.push(addMessage("robot", { text: "再见！！！" }));
            }
        }
    }

    return data;
};

const processResult = (results: searchResult): searchResult | undefined => {
    if (Array.isArray(results)) {
        let result: Array<notice> = [];
        results.forEach((item) => {
            result.push({
                id: item.id,
                name: item.name,
                url: item.url,
            });
        });
        return result;
    }
    if (!stringIsEmpty(results)) {
        return results;
    }
};

const confirmPreview = (): void => {
    let data = {
        text: store.state.history.context[0].name,
        meta: "/word/" + store.state.history.context[0].mysql_id,
        url: store.state.history.context[0].url,
    };
    messageList.push(addMessage("robot", data));
    messageList.push(addMessage("robot", { text: "您对此次服务满意吗" }));
    store.state.displayPreview = true;
};

const onMessageWasSent = async (message: message): Promise<void> => {
    messageList.push(message);
    if (message.type === "text") {
        await receivedText(message);
    }
    if (message.type === "emoji") {
        receivedEmoji(message);
    }
    if (message.type === "file") {
        receivedFile(message);
    }
};

const receivedText = async (message: any) => {
    try {
        const result: notice[] | string | any = await search(message.data.text);

        if (isString(result)) {
            messageList.push(addMessage("robot", { text: result }));

            if (store.state.chatCount === 4) {
                messageList.push(addMessage("robot", { text: "请问您需要预览或者下载这个文件嘛?" }));
                store.state.displayPreview = true;
            }
            return;
        }

        if (typeof result == "object") {
            if (store.state.chatCount === 1) {
                messageList.push(
                    addMessage("robot", {
                        text: "已经为您找到如下文件,请问您对哪个文件感兴趣?输入123指定",
                    })
                );
            }
            if (store.state.chatCount === 2) {
                //TODO 缺少文件相关信息的查询展示
                messageList.push(
                    addMessage("robot", {
                        text: "已经为您找到下面这篇文件的相关信息，您可以关于这篇文件对我进行提问",
                    })
                );
            }
            for (let i = 0; i < result.length; i++) {
                let data = {
                    text: result[i].name,
                    meta: "/word/" + result[i].id,
                    url: result[i].url,
                };
                messageList.push(addMessage("robot", data));
            }
        }
    } catch (error) {
        console.log(error);
        messageList.push(addMessage("robot", { text: "对不起，这个问题我不知道" }));
    }
};

const receivedEmoji = (message: any): void => {
    messageList.push(addMessage("robot", { emoji: message.data.emoji }, "emoji"));
};

const receivedFile = (message: any): void => {
    console.log(message);
    messageList.push(addMessage("robot", { text: "暂不支持上传文件功能哦" }));
};

const openChat = (): void => {
    // called when the user clicks on the fab button to open the chat
    isChatOpen.value = true;
    newMessagesCount.value = 0;
};

const closeChat = (): void => {
    store.state.hasHistory = false;
    store.state.history = { context: [] };
    store.state.chatCount = 0;
    store.state.displayPreview = false;
    isChatOpen.value = false;
    messageList.splice(0, messageList.length);
    messageList.push(addMessage("robot", { text: "欢迎来到NFQA!" }));
    messageList.push(addMessage("robot", { text: "你可以向我一些问题。" }));
};

const handleScrollToTop = () => {
    // called when the user scrolls message list to top
    // leverage pagination for loading another page of messages
};

const handleOnType = () => {
    // console.log("Emit typing event");
};

const sendMessage = (text: string) => {
    if (text.length > 0) {
        newMessagesCount.value = isChatOpen.value ? newMessagesCount.value : newMessagesCount.value + 1;
        onMessageWasSent(addMessage("support", { text: text }));
    }
};

const editMessage = (message: message) => {
    console.log("editMessage", message);
};
</script>

<style scoped>
div {
    /* font-family: Microsoft YaHei, Helvetica, Arial, sans-serif; */
    /* font-family: STHeiti Light, Helvetica, Arial, sans-serif; */
    font-weight: 500;
}
.el-link {
    margin-right: 45px;
    font-size: 80%;
}

.router-link-active {
    text-decoration: none;
}

a {
    text-decoration: none;
    color: #222222;
}

.router-link-active {
    text-decoration: none;
}
.el-link .el-icon--right.el-icon {
    vertical-align: text-bottom;
}
</style>
