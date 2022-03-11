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
        <el-link>
          <router-link target="_blank" :to="message.data.meta">{{ message.data.text }}</router-link>
        </el-link>
      </div>

      <div align="left" v-else>{{ message.data.text }}</div>
    </template>
  </beautiful-chat>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import Axios from "axios";

let participants = reactive([
  {
    id: "user1",
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
  };
}
let messageList: Array<message> = reactive([
  {
    type: "text",
    author: `user1`,
    data: { text: `欢迎来到NFQA!` },
  },
  {
    type: "text",
    author: `user1`,
    data: { text: "你可以向我一些问题。" },
  },
]);
let newMessagesCount = ref(0);
let isChatOpen = ref(false);
let showTypingIndicator = ref("");
const colors = reactive({
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
});
let alwaysScrollToBottom = ref(false);
let messageStyling = ref(true);
const sendMessage = (text: any) => {
  console.log("text", text);
  if (text.length > 0) {
    newMessagesCount.value = isChatOpen.value
      ? newMessagesCount.value
      : newMessagesCount.value + 1;
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
}
const search = async (question: string) => {
  const data = { question: question };
  const api = "http://127.0.0.1:8000/api/neo4j/";
  try {
    const response = await Axios.post(api, data);
    const result: Array<notice> = [];
    if (response.data.results.length > 0) {
      for (let i = 0; i < response.data.results.length; i++) {
        result.push({
          id: response.data.results[i].mysql_id,
          name: response.data.results[i].name,
        });
      }
      console.log("response", response);
      console.log("result", result);
      return result;
    } else {
      throw new Error("没有查找到匹配文章");
    }
  } catch (error) {
    console.log(error);
    throw new Error("没有查找到匹配文章");
  }
};
const onMessageWasSent = async (message: any) => {
  // called when the user sends a message
  messageList.push(message);
  if (message.type === "text") {
    try {
      const result = await search(message.data.text);
      messageList.push({
        type: "text",
        author: `user1`,
        data: {
          text: "已经为您找到如下文件,点击文件名即可预览",
        },
      });
      for (let i = 0; i < result.length; i++) {
        messageList.push({
          type: "text",
          author: `user1`,
          data: {
            text: result[i].name,
            meta: "/word/" + result[i].id,
          },
        });
      }
    } catch (error) {
      console.log(error);
      messageList.push({
        type: "text",
        author: `user1`,
        data: { text: "对不起，这个问题我不知道" },
      });
    }
  }
  if (message.type === "emoji") {
    messageList.push({
      type: "emoji",
      author: `user1`,
      data: { emoji: message.data.emoji },
    });
  }
  if (message.type === "file") {
    messageList.push({
      type: "text",
      author: `user1`,
      data: { text: "暂不支持上传文件功能哦" },
    });
  }
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

</script>


<style scoped>
.el-link {
  margin-right: 8px;
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
</style>