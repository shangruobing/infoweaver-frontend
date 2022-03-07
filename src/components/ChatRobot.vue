<template>
  <div>
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
      :disableUserListToggle="false"
      :messageStyling="messageStyling"
      @onType="handleOnType"
      @edit="editMessage"
    >
      <template v-slot:text-message-body="{ message }">
        <div align="left" v-if="message.data.meta">
          <el-link>
            <router-link target="_blank" :to="message.data.meta">
              {{ message.data.text }}
            </router-link>
          </el-link>
        </div>

        <div align="left" v-else>
          {{ message.data.text }}
        </div>
      </template>
    </beautiful-chat>
  </div>
</template>

<script lang="ts">
import { defineComponent, isReactive, reactive, ref, watchEffect } from "vue";
import Axios from "axios";

export default defineComponent({
  name: "myChat",
  setup() {
    let participants = reactive([
      {
        id: "user1",
        name: "Ruobing",
        imageUrl:
          "https://portrait.gitee.com/uploads/avatars/user/3474/10422230_shangruobing_1644648546.png!avatar60",
      },
    ]);

    const titleImageUrl = ref(
      "https://portrait.gitee.com/uploads/avatars/user/3474/10422230_shangruobing_1644648546.png!avatar60"
    );

    let messageList = reactive([
      {
        type: "text",
        author: `me`,
        data: { text: `Say yes!` },
      },
      {
        type: "text",
        author: `user1`,
        data: {
          text: "No.",
          meta: "",
        },
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
    let message = reactive({ text: "Welcome" });
    const search = async (question: string) => {
      const data = {
        question: question,
      };
      const api = "http://127.0.0.1:8000/api/neo4j/";
      try {
        const response = await Axios.post(api, data);
        const result: Array<string> = [
          response.data.results[0].name,
          response.data.results[0].mysql_id,
        ];
        console.log("response", response);
        console.log("result", result);
        return result;
      } catch (error) {
        console.log(error);
        throw new Error("error");
      }
    };
    const onMessageWasSent = async (message: any) => {
      // called when the user sends a message

      messageList.push(message);
      try {
        const result = await search(message.data.text);

        messageList.push({
          type: "text",
          author: `user1`,
          data: {
            text: "已经为您找到如下文件,点击文件名即可预览",
          },
        });
        messageList.push({
          type: "text",
          author: `user1`,
          data: {
            text: result[0],
            meta: "/word/" + result[1],
          },
        });
      } catch (error) {
        console.log(error);
        messageList.push({
          type: "text",
          author: `user1`,
          data: {
            text: "对不起，这个问题我不知道",
          },
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
      console.log("Emit typing event");
    };

    const editMessage = (message: any) => {
      //   const m = messageList.find((m) => m.id === message.id);
      //   m.isEdited = true;
      //   m.data.text = message.data.text;
      console.log("editMessage", message);
    };

    return {
      participants,
      titleImageUrl,
      onMessageWasSent,
      messageList,
      newMessagesCount,
      isChatOpen,
      closeChat,
      openChat,
      showTypingIndicator,
      colors,
      alwaysScrollToBottom,
      messageStyling,
      handleOnType,
      editMessage,
      message,
    };
  },
});
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