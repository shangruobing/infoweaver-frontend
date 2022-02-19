<template>
  <h1>这是测试页面</h1>

  <el-button @click="changeComponent">点击动态更改组件</el-button>
  <el-input
        type="text"
        placeholder="请输入要查询的信息"
        style="width: 30%"
      />
  <component :is="name" content=""></component>
</template>


<script lang="ts">
import { defineComponent, ref } from "vue";
import myComponent1 from "./myComponent1.vue";
import myComponent2 from "./myComponent2.vue";
export default defineComponent({
  components: {
    com1: myComponent1,
    com2: myComponent2,
  },
  setup() {
    let name = ref("com1");
    const changeComponent = () => {
      name.value === "com1" ? (name.value = "com2") : (name.value = "com1");
    };

    return { name, changeComponent };
  },
});
</script>
