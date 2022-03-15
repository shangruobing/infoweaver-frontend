<template>
  <p>{{ http }}</p>
</template>

<script setup lang="ts">
import { getCurrentInstance } from "vue";
import getHttp from "../utils/getHttp";
const instance = getCurrentInstance();
const http = getHttp(instance);

</script>
