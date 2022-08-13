<template>
  <div>
    <el-form :inline="true" :model="form">
      <el-form-item label="问题">
        <el-input v-model="form.question" placeholder="请输入问题" />
      </el-form-item>

      <el-form-item label="答案">
        <el-input v-model="form.answer" placeholder="请输入答案" />
      </el-form-item>

      <el-form-item>
        <el-button @click="addCorpus">添加</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="results" stripe border style="width: 100%" v-if="pagination.count > 0">
      <el-table-column prop="Question" label="Question" width="350" />
      <el-table-column prop="Answer" label="Answer" />

      <el-table-column label="Operations" width="150">
        <template #default="scope">
          <el-popconfirm
            confirm-button-text="Yes"
            cancel-button-text="No"
            icon-color="red"
            title="Are you sure to delete this?"
            @cancel="cancelEvent"
            @confirm="confirmEvent"
          >
            <template #reference>
              <el-button
                type="danger"
                size="small"
                v-show="!scope.row.show"
                @click.prevent="scope.row.show = false"
                >删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-empty description="好像什么也没有诶" v-else></el-empty>

    <el-row justify="center">
      <el-pagination
        layout="prev, pager, next, jumper"
        :page-count="pagination.count"
        background
        :current-page="pagination.currentPage"
        :hide-on-single-page="true"
        @current-change="handleCurrentChange"
      />
    </el-row>
    <chat-robot />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import service from '@/utils/request'
import calculatePageNum from '@/utils/pagination'

import Notification from '@/utils/notification'
import ChatRobot from '@/components/ChatRobot.vue'
const form = reactive({
  question: '',
  answer: ''
})

const loading = ref(false)
const results = ref([])
const pagination = reactive({
  count: 0,
  currentPage: 1
})

const handleCurrentChange = async (currentPage: number) => {
  pagination.currentPage = currentPage
  const api = 'corpus/?page=' + pagination.currentPage

  const response = await service.get(api)
  try {
    loading.value = false
    results.value = response.data.results
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await search()
})

const search = async () => {
  const api = 'corpus/'
  const response = await service.get(api)
  try {
    loading.value = false
    results.value = response.data.results
    pagination.count = calculatePageNum(response.data.count, response.data.results.length)
  } catch (error) {
    console.log(error)
  }
}
const addCorpus = async () => {
  const api = 'corpus/'
  const data = { question: form.question, answer: form.answer }
  const response = await service.post(api, data)
  Notification({ text: '添加成功！' })
  console.log(response)
}

const confirmEvent = () => {
  console.log('confirm!')
}
const cancelEvent = () => {
  console.log('cancel!')
}
</script>

<style scoped>
.el-row {
  margin-bottom: 15px;
}
.el-col {
  border-radius: 4px;
}
</style>
