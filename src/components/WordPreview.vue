<template>
  <div ref="file"></div>
</template>

<script lang="ts" setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { renderAsync } from 'docx-preview'

import { getHttp } from '../utils/django-http'

const route = useRoute()
const file = ref()

onMounted(async () => {
  const id = route.params.id
  const http = getHttp()
  try {
    const response = await axios({
      method: 'GET',
      responseType: 'blob',
      url: http + 'word/' + id
    })
    renderAsync(response.data, file.value)
  } catch (error) {
    console.log(error)
  }
})
</script>

<style></style>
