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
import { reactive, ref } from "vue";
import Axios from "axios";
import { Download, View as iconview } from "@element-plus/icons-vue";
let participants = reactive([
  {
    id: "robot",
    name: "Robot",
    imageUrl:
      "https://portrait.gitee.com/uploads/avatars/user/3474/10422230_shangruobing_1644648546.png!avatar60",
  },
]);
const titleImageUrl = ref(
  "https://portrait.gitee.com/uploads/avatars/user/3474/10422230_shangruobing_1644648546.png!avatar60"
);
interface message {
  type: string;
  author: string;
  data: {
    text?: string;
    meta?: string;
    emoji?: string;
    url?: string;
  };
}
let messageList: Array<message> = reactive([
  {
    type: "text",
    author: `robot`,
    data: { text: `欢迎来到NFQA!` },
  },
  {
    type: "text",
    author: `robot`,
    data: { text: "你可以向我一些问题。" },
  },
]);
let newMessagesCount = ref(0);
let isChatOpen = ref(false);
let showTypingIndicator = ref("");

let alwaysScrollToBottom = ref(false);
let messageStyling = ref(true);
const sendMessage = (text: any) => {
  console.log("text", text);
  if (text.length > 0) {
    newMessagesCount.value = isChatOpen.value ? newMessagesCount.value : newMessagesCount.value + 1;
    onMessageWasSent({
      author: "support",
      type: "text",
      data: { text },
    });
  }
};
interface notice {
  name?: string;
  id?: number;
  url?: string;
}

const search = async (question: string) => {
  const data = { question: question };
  const api = "http://127.0.0.1:8000/api/neo4j/";
  try {
    const response = await Axios.post(api, data);
    if (response.data.results instanceof Array && response.data.results.length <= 0) {
      throw new Error("没有查找到匹配文章");
    }
    const result: Array<notice> = [];
    response.data.results.forEach((item: { mysql_id: number; name: string; url: string }) => {
      result.push({
        id: item.mysql_id,
        name: item.name,
        url: item.url,
      });
    });

    console.log("response", response);
    console.log("result", result);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("没有查找到匹配文章");
  }
};

const onMessageWasSent = async (message: any) => {
  // called when the user sends a message
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
    const result = await search(message.data.text);
    messageList.push({
      type: "text",
      author: `robot`,
      data: { text: "已经为您找到如下文件" },
    });
    for (let i = 0; i < result.length; i++) {
      messageList.push({
        type: "text",
        author: `robot`,
        data: {
          text: result[i].name,
          meta: "/word/" + result[i].id,
          url: result[i].url,
        },
      });
    }
  } catch (error) {
    console.log(error);
    messageList.push({
      type: "text",
      author: `robot`,
      data: { text: "对不起，这个问题我不知道" },
    });
  }
};

const receivedEmoji = (message: any) => {
  messageList.push({
    type: "emoji",
    author: `robot`,
    data: { emoji: message.data.emoji },
  });
};

const receivedFile = (message: any) => {
  messageList.push({
    type: "text",
    author: `robot`,
    data: { text: "暂不支持上传文件功能哦" },
  });
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
  //   const m = messageList.find((m) => m.id === message.id);
  //   m.isEdited = true;
  //   m.data.text = message.data.text;
  console.log("editMessage", message);
};
const colors = {
  header: {
    bg: "#4e8cff",
    text: "#ffffff",
  },
  launcher: {
    bg: "#4e8cff",
  },
  messageList: {
    bg: "#ffffff",
  },
  sentMessage: {
    bg: "#4e8cff",
    text: "#ffffff",
  },
  receivedMessage: {
    bg: "#eaeaea",
    text: "#000000",
  },
  userInput: {
    bg: "#f4f7f9",
    text: "#565867",
  },
};
</script>

<style scoped>
div{
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
