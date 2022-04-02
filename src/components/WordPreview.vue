<template>
    <div ref="file"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref, getCurrentInstance } from "vue";
import axios from "axios";
import { renderAsync } from "docx-preview";
import { useRoute } from "vue-router";
import getHttp from "../utils/django-http";

const route = useRoute();
let file = ref();

onMounted(async () => {
    const id = route.params.id;
    const instance = getCurrentInstance();
    const http = getHttp(instance);
    try {
        const response = await axios({
            method: "GET",
            responseType: "blob",
            url: http + "word/" + id,
        });
        renderAsync(response.data, file.value);
    } catch (error) {
        console.log(error);
    }
});
</script>

<style></style>
