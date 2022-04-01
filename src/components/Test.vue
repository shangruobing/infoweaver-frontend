<template>
  <p>{{store.state.hasHistory}}</p>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
const store = useStore();
</script>
