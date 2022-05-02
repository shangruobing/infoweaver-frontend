<template>
    <div class="wave">
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
            title="InfoWeaver智能问答机器人"
            id="robot"
        >
            <template v-slot:text-message-body="{ message }">
                <div align="left" v-if="message.data.meta">
                    <div>{{ message.data.text }}</div>

                    <el-link v-if="!isSelectedFile" type="info" @click="selectFile(message.data)">
                        点击查看更多详情
                    </el-link>

                    <div v-if="displayPreview && !message.data.id">
                        <el-link>
                            <router-link target="_blank" :to="message.data.meta">
                                <span>预览</span>
                            </router-link>
                            <el-icon class="el-icon--right">
                                <iconview />
                            </el-icon>
                        </el-link>

                        <el-link :href="message.data.url">
                            <span>下载</span>
                            <el-icon class="el-icon--right">
                                <download />
                            </el-icon>
                        </el-link>
                    </div>
                </div>

                <div align="left" v-else>
                    {{ message.data.text }}
                    <div v-if="message.data.preview">
                        <el-radio-group v-model="isNeedPreview" @change="myRadioCallBack">
                            <el-radio :label="true" size="small" :disabled="isDisableRadio">是</el-radio>
                            <el-radio :label="false" size="small" :disabled="isDisableRadio">否</el-radio>
                        </el-radio-group>
                    </div>

                    <el-link v-if="message.data.changeNoticeList" type="info" @click="changeBatch">
                        <span>点击换一批</span>
                        <el-icon class="el-icon--right">
                            <refresh />
                        </el-icon>
                    </el-link>

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
        <span class="wave-span"></span>
        <span class="wave-span"></span>
    </div>
</template>

<script lang="ts" setup>
import Axios from "axios";
import { reactive, ref, h } from "vue";
import { ElNotification } from "element-plus";
import { Download, View as iconview, Refresh } from "@element-plus/icons-vue";

import { getHttp } from "../utils/django-http";
import { stringIsEmpty, isString } from "../utils/type-utils";
import { colors, participants, titleImageUrl } from "../utils/robot-information";
import { Message, Notice, ChatRecord, ChatReply, AnswerType, SearchResult } from "../utils/interfaces";

const isNeedPreview = ref<boolean>();
const isDisableRadio = ref(false);
const isDisableRate = ref(false);

const selectFile = (message: any) => {
    addMessage("me", { text: message.text });
    const id = message.id;

    const array = chatRecord.history;
    array.forEach((i: { mysql_id: string }) => {
        if (i.mysql_id === id) {
            chatRecord.history = i;
        }
    });
    isSelectedFile.value = true;
    addMessage("robot", { text: "请问您需要预览下载它吗?", preview: true });
    addMessage("robot", { text: "对于这篇文件，您还有什么疑问吗?" });
};

const myRadioCallBack = () => {
    isDisableRadio.value = true;
    if (isNeedPreview.value) {
        confirmPreview();
    }
};

const rate = ref(null);

const thanks = () => {
    isDisableRate.value = true;
    ElNotification({
        title: "谢谢评分😜",
        message: h("i", { style: "color: teal" }, "我们会继续努力的！"),
        position: "bottom-right",
    });
    addMessage("robot", { text: "再见！！！" });
};

const addMessage = (author: string, data: object, type: string = "text"): void => {
    const message = { type: type, author: author, data: data };
    messageList.push(message);
};

const messageList: Array<Message> = reactive([]);

const newMessagesCount = ref(0);
const isChatOpen = ref(false);
const showTypingIndicator = ref("");
const alwaysScrollToBottom = ref(true);
const messageStyling = ref(true);

const http = getHttp();

const isSelectedFile = ref(false);
const displayPreview = ref(false);

const chatRecord: ChatRecord = reactive({ question: "", has_history: false, history: {} });
const chatReply: ChatReply = reactive({ answer_type: "", results: "" });
const chatCount = ref(0);
const searchPage = ref(1);

const clearHistory = () => {
    isSelectedFile.value = false;
    displayPreview.value = false;
    chatRecord.question = "";
    chatRecord.has_history = false;
    chatRecord.history = {};
    chatReply.answer_type = "";
    chatReply.results = "";
    chatCount.value = 0;
};

const changeBatch = async () => {
    messageList.splice(-5, 5);
    searchPage.value += 1;
    chatCount.value -= 1;
    const api = http + "neo4j/?page=" + searchPage.value;

    const response = await Axios.post(api, { question: chatRecord.question });
    const search = saveHistory(response);
    processSearchResult(search);
};

const search = async (question: string) => {
    const api = http + "neo4j/";

    try {
        chatRecord.question = question;

        //Test 2次输入刘海丹
        if (!isSelectedFile.value) {
            chatRecord.has_history = false;
        }
        const response = await Axios.post(api, chatRecord);

        console.log("response", response);
        console.log("isSelectedFile", isSelectedFile.value);
        console.log("chatRecord", chatRecord);

        return saveHistory(response);
    } catch (error) {
        console.log(error);
        throw new Error("Result is NULL!");
    }
};

const saveHistory = (response: any): any => {
    chatReply.answer_type = response.data.answer_type;
    chatReply.results = response.data.results;

    if (chatReply.answer_type === AnswerType.DATABASE) {
        chatCount.value += 1;
        chatRecord.history = chatReply.results;
        chatRecord.has_history = true;
    }

    return processResult(chatReply.results);
};

const processResult = (results: SearchResult): SearchResult | undefined => {
    if (results.length <= 0) {
        throw new Error("Results is null!");
    }
    if (Array.isArray(results)) {
        const result: Array<Notice> = [];
        results.forEach((item) => {
            result.push({
                id: item.mysql_id,
                name: item.name,
                url: item.url,
            });
        });

        return result;
    }

    if (isString(results)) {
        if (chatReply.answer_type === AnswerType.BAIDU) {
            addMessage("robot", { text: "这个问题我不知道，但百度百科是这样解释的..." });
        }
        if (chatReply.answer_type === AnswerType.BERT) {
            chatCount.value += 1;
        }
        return results;
    }
};

const confirmPreview = (): void => {
    const data = {
        text: chatRecord.history.name,
        meta: "/word/" + chatRecord.history.mysql_id,
        url: chatRecord.history.url,
    };
    addMessage("robot", data);
    displayPreview.value = true;
};

const onMessageWasSent = async (message: Message): Promise<void> => {
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
        const result: Notice[] | string | any = await search(message.data.text);
        processSearchResult(result);
    } catch (error) {
        console.log(error);
        addMessage("robot", { text: "对不起，这个问题我不知道" });
    }
};

const processSearchResult = (result: Notice[] | string | any): void => {
    if (isString(result)) {
        addMessage("robot", { text: result });
    }

    if (Array.isArray(result)) {
        renderNoticeList(result);
    }

    robotReply();
};

const renderNoticeList = (noticeList: Array<Notice>): void => {
    addMessage("robot", { text: "已经为您找到如下文件,请问您对哪个文件感兴趣?" });
    const result: Notice[] | any = noticeList;
    for (let i = 0; i < result.length; i++) {
        const data = {
            text: result[i].name.split(".")[0],
            meta: "/word/" + result[i].id,
            url: result[i].url,
            id: result[i].id,
        };

        addMessage("robot", data);
    }
    addMessage("robot", { text: "没有满意的文件?", changeNoticeList: true });
};

const robotReply = (): void => {
    if (chatCount.value === 4) {
        addMessage("robot", { text: "请为我们评分 谢谢!", rate: true });
    }
};

const receivedEmoji = (message: any): void => {
    setTimeout(() => addMessage("robot", { emoji: message.data.emoji }, "emoji"), 1000);
};

const receivedFile = (message: any): void => {
    addMessage("robot", { text: "暂不支持上传文件功能哦" });
};

const openChat = (): void => {
    isChatOpen.value = true;
    newMessagesCount.value = 0;
    clearHistory();

    addMessage("robot", { text: "欢迎来到InfoWeaver!" });
    addMessage("robot", { text: "您可以向我问一些问题。" });

    const node1 = <HTMLElement>document.getElementsByClassName("wave")[0].children[1];
    const node2 = <HTMLElement>document.getElementsByClassName("wave")[0].children[2];
    node1.style.animationPlayState = "paused";
    node2.style.animationPlayState = "paused";
};

const closeChat = (): void => {
    isChatOpen.value = false;
    clearHistory();
    messageList.splice(0, messageList.length);

    const node1 = <HTMLElement>document.getElementsByClassName("wave")[0].children[1];
    const node2 = <HTMLElement>document.getElementsByClassName("wave")[0].children[2];
    node1.style.animationPlayState = "running";
    node2.style.animationPlayState = "running";
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
        addMessage("support", { text: text });
    }
};

const editMessage = (message: Message) => {
    console.log("editMessage", message);
};
</script>

<style lang="scss" scoped>
div {
    font-weight: 500;
}

span {
    color: #000;
}

.el-radio {
    font-weight: 500;
    color: #000;
}
.el-link {
    margin-right: 45px;
    font-size: 80%;
    font-weight: 500;
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

:deep(.sc-header--title) {
    font-family: "Consolas";
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 0.5;
    }
    100% {
        opacity: 1;
    }
}

:deep(.sc-message--content) {
    animation-name: fadeIn;
    animation-duration: 0.6s;
    animation-iteration-count: 1;
    animation-delay: 0s;
}

@keyframes living {
    0% {
        transform: scale(1);
        opacity: 0.3;
    }
    25% {
        transform: scale(1.5);
        opacity: 0.2;
    }
    50% {
        transform: scale(1.75);
        opacity: 0;
    }
    75% {
        transform: scale(1.5);
        opacity: 0.2;
    }
    100% {
        transform: scale(1);
        opacity: 0.3;
    }
}

.wave {
    position: fixed;
    width: 60px;
    height: 60px;
    right: 25px;
    bottom: 25px;
    z-index: 1000;

    .wave-span {
        position: absolute;
        width: 60px;
        height: 60px;
        right: 0px;
        bottom: 0px;
        background: #409eff;
        border-radius: 50%;
        animation: living 3s linear infinite;
    }

    span:nth-child(2) {
        animation-delay: 1.5s;
    }

    #robot {
        position: absolute;
        right: 0px;
        bottom: 0px;
        width: 60px;
        height: 60px;
        z-index: 1000;
    }
}
</style>
