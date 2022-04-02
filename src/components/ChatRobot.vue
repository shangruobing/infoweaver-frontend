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
    >
        <template v-slot:text-message-body="{ message }">
            <div align="left" v-if="message.data.meta">
                <div>{{ message.data.text }}</div>
                <el-link>
                    <router-link target="_blank" :to="message.data.meta">
                        <span>预览</span>
                    </router-link>
                    <el-icon class="el-icon--right"><iconview /></el-icon>
                </el-link>

                <el-link :href="message.data.url">
                    <span>下载</span>
                    <el-icon class="el-icon--right"><download /> </el-icon
                ></el-link>
            </div>

            <div align="left" v-else>{{ message.data.text }}</div>
        </template>
    </beautiful-chat>
</template>

<script lang="ts" setup>
import Axios from "axios";
import { useStore } from "vuex";
import { getCurrentInstance, reactive, ref } from "vue";
import { Download, View as iconview } from "@element-plus/icons-vue";

import getHttp from "../utils/django-http";
import { message, notice } from "../utils/interfaces";
import { stringIsEmpty, isString } from "../utils/type-utils";
import { colors, participants, titleImageUrl } from "../utils/robot-information";

const store = useStore();

const generateMessage = (author: string, data: object, type: string = "text") => {
    return { type: type, author: author, data: data };
};

let messageList: Array<message> = reactive([
    generateMessage("robot", { text: "欢迎来到NFQA!" }),
    generateMessage("robot", { text: "你可以向我一些问题。" }),
]);

let newMessagesCount = ref(0);
let isChatOpen = ref(false);
let showTypingIndicator = ref("");
let alwaysScrollToBottom = ref(false);
let messageStyling = ref(true);

let history = reactive({
    context: [],
});

const sendMessage = (text: any) => {
    if (text.length > 0) {
        newMessagesCount.value = isChatOpen.value
            ? newMessagesCount.value
            : newMessagesCount.value + 1;
        onMessageWasSent(generateMessage("support", { text: text }));
    }
};

const search = async (question: string) => {
    let data = { question: question, state: 0, history: { context: [] } };
    const instance = getCurrentInstance();
    const http = getHttp(instance);
    const api = http + "neo4j/";

    try {
        if (store.state.hasHistory) {
            const item_number = Number(question);
            console.log("选择了", item_number);

            data = { question: "selected", state: 1, history: history.context[item_number - 1] };
        }

        console.log("有无历史记录", store.state.hasHistory);
        console.log("历史记录", history);

        store.state.hasHistory = true;

        const response = await Axios.post(api, data);
        const results = response.data.results;
        console.log(results);

        history = {
            context: results,
        };
        console.log(history);

        if (Array.isArray(results)) {
            let result: Array<notice> = [];
            results.forEach((item: { mysql_id: number; name: string; url: string }) => {
                result.push({
                    id: item.mysql_id,
                    name: item.name,
                    url: item.url,
                });
            });
            return result;
        }

        if (!stringIsEmpty(results)) {
            return results;
        }
    } catch (error) {
        console.log(error);
        throw new Error("没有查找到结果");
    }
};

const onMessageWasSent = async (message: any) => {
    messageList.push(message);
    if (message.type === "text") {
        receivedText(message);
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
            messageList.push(
                generateMessage("robot", { text: "这个问题我不知道，但我去查了百度，结果如下" })
            );
            messageList.push(generateMessage("robot", { text: result }));
            return;
        }

        if (typeof result == "object") {
            messageList.push(generateMessage("robot", { text: "已经为您找到如下文件" }));

            for (let i = 0; i < result.length; i++) {
                let data = {
                    text: result[i].name,
                    meta: "/word/" + result[i].id,
                    url: result[i].url,
                };
                messageList.push(generateMessage("robot", data));
            }
            messageList.push(generateMessage("robot", { text: "请问您对哪个文件感兴趣?" }));
            messageList.push(generateMessage("robot", { text: "输入123确定文件?" }));
        }
    } catch (error) {
        console.log(error);
        messageList.push(generateMessage("robot", { text: "对不起，这个问题我不知道" }));
    }
};

const receivedEmoji = (message: any) => {
    messageList.push(generateMessage("robot", { emoji: message.data.emoji }, "emoji"));
};

const receivedFile = (message: any) => {
    messageList.push(generateMessage("robot", { text: "暂不支持上传文件功能哦" }));
};

const openChat = () => {
    // called when the user clicks on the fab button to open the chat
    isChatOpen.value = true;
    newMessagesCount.value = 0;
};
const closeChat = () => {
    // called when the user clicks on the botton to close the chat
    isChatOpen.value = false;
};
const handleScrollToTop = () => {
    // called when the user scrolls message list to top
    // leverage pagination for loading another page of messages
};
const handleOnType = () => {
    // console.log("Emit typing event");
};
const editMessage = (message: any) => {
    console.log("editMessage", message);
};
</script>

<style scoped>
div {
    /* font-family: Microsoft YaHei, Helvetica, Arial, sans-serif; */
    font-family: STHeiti Light, Helvetica, Arial, sans-serif;
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
