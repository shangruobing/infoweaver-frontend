<template>
  <div>
    <el-table
      :data="results"
      stripe
      border
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
      v-if="pagination.count > 0"
      v-loading="loading"
    >
      <el-table-column prop="id" label="ID" />

      <el-table-column prop="file_name" label="Name" />
      <el-table-column prop="upload_time" label="Date" sortable width="250" />
      <el-table-column prop="username" label="User Name" />

      <el-table-column label="Operations">
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
                size="mini"
                v-show="!scope.row.show"
                @click.prevent="
                  scope.row.show = false
                  // deleteRow(scope.$index, scope.row, students);
                "
                >删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-empty description="好像什么也没有诶" :image-size="300" v-else></el-empty>

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
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'

import service from '@/utils/request'
import calculatePageNum from '@/utils/pagination'

const loading = ref(false)
const results = ref([])
const pagination = reactive({
  count: 0,
  currentPage: 1
})

const handleCurrentChange = async (currentPage: number) => {
  pagination.currentPage = currentPage
  const api = 'upload/?page=' + pagination.currentPage

  try {
    const response = await service.get(api)
    loading.value = false
    results.value = response.data.results
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  try {
    const response = await service.get('upload')
    loading.value = false
    results.value = response.data.results

    pagination.count = calculatePageNum(response.data.count, response.data.results.length)
  } catch (error) {
    console.log(error)
  }
})

const confirmEvent = () => {
  console.log('confirm!')
}
const cancelEvent = () => {
  console.log('cancel!')
}
</script>

<style scoped>
.el-pagination {
  text-align: center;
}

.el-row {
  margin-bottom: 15px;
}

.el-col {
  border-radius: 4px;
}
</style>
