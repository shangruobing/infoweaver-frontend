<template>
  <!-- <slot name="slot1">插槽1的默认内容</slot> -->

  <p>组件1</p>
  {{ props.content }}
  <!-- <slot name="slot2">插槽2的默认内容</slot> -->
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "myComponent1",
  props: {
    content: {
      type: [String, Number],
      required: false,
      default: "Component1",
    },
  },
  setup(props) {
    const xx = ref("");
    return {
      xx,
      props,
    };
  },
});
</script>