<template>
  <div>
    <el-row>
      <el-col>
        <el-input
          v-model="question"
          type="text"
          placeholder="请输入要查询的信息"
          style="width: 30%"
          :suffix-icon="Search"
          @change="search"
          v-loading.fullscreen.lock="loading"
        />
      </el-col>
    </el-row>

    <el-table
      :data="results"
      stripe
      border
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
      hide-on-single-page
      v-if="pagination.count > 0"
      v-loading="loading"
    >
      <el-table-column prop="mysql_id" label="ID" width="85" />
      <el-table-column prop="date" label="Upload Time" width="180" sortable />
      <el-table-column prop="name" label="Name" />

      <el-table-column label="Operations" prop="url" width="150">
        <template #default="scope">
          <el-link>
            <router-link target="_blank" :to="'/word/' + scope.row.mysql_id">
              <span>预览</span>
            </router-link>
            <el-icon class="el-icon--right">
              <icon-view />
            </el-icon>
          </el-link>
          <el-link :href="scope.row.url">
            <span>下载</span>
            <el-icon class="el-icon--right">
              <download />
            </el-icon>
          </el-link>
        </template>
      </el-table-column>
    </el-table>

    <el-empty description="好像什么也没有诶 快输入一些信息啦" :image-size="250" v-else />

    <el-row justify="center">
      <el-pagination
        layout="prev, pager, next"
        :page-count="pagination.count"
        background
        :current-page="pagination.currentPage"
        :hide-on-single-page="true"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { Download, Search, View as IconView } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import service from '@/utils/request'
import calculatePageNum from '@/utils/pagination'

const question = ref('')
const loading = ref(false)
const results = ref([])
const pagination = reactive({
  count: 0,
  currentPage: 1
})

const search = async () => {
  loading.value = true
  const data = {
    question: question.value
  }

  const api = 'neo4j/'
  try {
    const response = await service.post(api, data)
    results.value = response.data.results
    pagination.count = calculatePageNum(response.data.count, response.data.results.length)
    loading.value = false

    if (pagination.count === 0) {
      ElMessage({
        showClose: true,
        message: '什么也没有找到',
        type: 'warning',
        center: true
      })
    }
  } catch (error) {
    console.log(error)
    loading.value = false
  }
}
const handleCurrentChange = async (currentPage: number) => {
  const data = {
    question: question.value
  }
  pagination.currentPage = currentPage
  const api = 'neo4j/?page=' + pagination.currentPage
  try {
    const response = await service.post(api, data)
    loading.value = false
    results.value = response.data.results
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped>
.el-pagination {
  text-align: center;
}

.el-link {
  margin-right: 8px;
}

.el-link .el-icon--right.el-icon {
  vertical-align: text-bottom;
}

.router-link-active {
  text-decoration: none;
}

a {
  color: #000;
  text-decoration: none;
}

.el-row {
  margin-bottom: 15px;
}

.el-col {
  border-radius: 4px;
}
</style>
