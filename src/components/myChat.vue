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
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, isReactive, reactive, ref, watchEffect } from "vue";
import Axios from "axios";

export default defineComponent({
  name: "myChat",
  setup() {
    //通讯录
    let participants = reactive([
      {
        id: "user1",
        name: "Ruobing",
        imageUrl:
          "https://portrait.gitee.com/uploads/avatars/user/3474/10422230_shangruobing_1644648546.png!avatar60",
      },
      // {
      //   id: "user2",
      //   name: "Support",
      //   imageUrl: "https://avatars3.githubusercontent.com/u/37018832?s=200&v=4",
      // },
    ]);

    const titleImageUrl = ref(
     "https://portrait.gitee.com/uploads/avatars/user/3474/10422230_shangruobing_1644648546.png!avatar60"
    );

    let messageList = reactive([
      { type: "text", author: `me`, data: { text: `Say yes!` } },
      { type: "text", author: `user1`, data: { text: `No.` } },
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
        text: "#222222",
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
        console.log("进入了if");
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

    const search = async (question: string) => {
      const data = {
        question: question,
      };
      const api = "http://127.0.0.1:8000/api/neo4j/";
      try {
        const response = await Axios.post(api, data);
        const result = response.data.results[0].name;
        console.log("response", result);

        return result;
      } catch (error) {
        console.log(error);
        return "我不知道呀";
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
            text: result,
          },
        });
      } catch (error) {
        console.log(error);
        messageList.push({
          type: "text",
          author: `user1`,
          data: {
            text: "我不知道呀",
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
    };
  },
});
</script>