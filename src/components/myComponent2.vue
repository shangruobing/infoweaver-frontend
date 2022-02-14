<template>

<p>组件2</p>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "myComponent2",
  props: {
    content:String
  },
  setup(props) {
    const xx = ref("");
    return {
     xx,props
    };
  },
});

</script>