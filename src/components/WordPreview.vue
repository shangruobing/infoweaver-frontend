<template>
  <div ref="file"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import axios from "axios";
import { renderAsync } from "docx-preview";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "WordPreview",
  setup() {
    const route = useRoute();
    let file = ref();

    onMounted(async () => {
      const id = route.params.id;
      console.log("http://127.0.0.1:8000/api/word/" + id);
      try {
        const response = await axios({
          method: "GET",
          responseType: "blob", // 设置响应文件格式
          url: "http://127.0.0.1:8000/api/word/" + id,
        });
        renderAsync(response.data, file.value); // 渲染到页面预览
      } catch (error) {
        console.log(error);
      }
    });

    return {
      file,
    };
  },
});
</script>


<style>
</style>
