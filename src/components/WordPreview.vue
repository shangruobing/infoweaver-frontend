<template>
  <div ref="file"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { renderAsync } from 'docx-preview'
import service from '@/utils/request'

const route = useRoute()
const file = ref()

onMounted(async () => {
  const id = route.params.id
  try {
    const response = await service({
      method: 'GET',
      responseType: 'blob',
      url: 'word/' + id
    })
    renderAsync(response.data, file.value)
  } catch (error) {
    console.log(error)
  }
})
</script>

<style>
.docx-wrapper {
  padding: 2em !important;
}

.docx-wrapper > section {
  width: 95vw !important;
  padding: 1em !important;
}
</style>
