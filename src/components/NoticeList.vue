<template>
  <el-row>
    <el-col :span="12">
      <el-date-picker
        v-model="date"
        type="daterange"
        unlink-panels
        start-placeholder="起始日期"
        end-placeholder="截止日期"
        :shortcuts="shortcuts"
        style="width: 50%"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
        @change="search"
        :editable="false"
      />
    </el-col>
    <el-col :span="12">
      <el-input
        v-model="filename"
        type="text"
        placeholder="请输入文件名"
        style="width: 50%"
        :suffix-icon="Search"
        @change="search"
      />
    </el-col>
  </el-row>
  <el-table
    :data="results"
    stripe
    border
    style="width: 100%"
    :default-sort="{ prop: 'date', order: 'descending' }"
    v-if="pagination.count > 0"
    v-loading="loading"
  >
    <el-table-column prop="mysql_id" label="ID" width="85" />

    <!-- <el-table-column type="expand">
            <template #default="props">
                {{ props.row.content }}
            </template>
        </el-table-column> -->

    <el-table-column prop="name" label="Name" />
    <el-table-column prop="date" label="Date" width="180" sortable />

    <el-table-column label="Operations" prop="url" width="150">
      <template #default="scope">
        <el-link>
          <router-link target="_blank" :to="'/word/' + scope.row.mysql_id">
            <span>预览</span>
          </router-link>
          <el-icon class="el-icon--right">
            <iconview />
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

  <el-empty description="好像什么也没有诶" v-else></el-empty>

  <el-row justify="center">
    <el-pagination
      layout="prev, pager, next, jumper"
      :page-count="pagination.pageNum"
      background
      :current-page="pagination.currentPage"
      :hide-on-single-page="true"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </el-row>
</template>

<script lang="ts" setup>
import Axios from 'axios'
import { ref, reactive, onMounted } from 'vue'
import { Search, Download, View as iconview } from '@element-plus/icons-vue'
import { getHttp } from '../utils/django-http'

const loading = ref(false)
const filename = ref('')
const results = ref([])
const pagination = reactive({
  count: 0,
  perPageCount: 0,
  pageNum: 0,
  currentPage: 1
})

const http = getHttp()
const search = async () => {
  try {
    let startDate = ''
    let endDate = ''
    let name = ''
    if (date.value[0] !== undefined) {
      startDate = date.value[0].replace(/-/g, '')
    }

    if (date.value[1] !== undefined) {
      endDate = date.value[1].replace(/-/g, '')
    }

    if (filename.value.length !== 0) {
      name = filename.value
    }
    const api =
      http + 'word/' + '?name=' + name + '&start_date=' + startDate + '&end_date=' + endDate

    const response = await Axios.get(api)
    loading.value = false
    results.value = response.data.results
    if (results.value.length !== 0) {
      pagination.count = response.data.count
      pagination.perPageCount = results.value.length
      pagination.pageNum = Math.ceil(pagination.count / pagination.perPageCount)
    } else {
      pagination.count = 0
      pagination.perPageCount = 0
      pagination.pageNum = 0
    }
  } catch (error) {
    console.log(error)
  }
}

const handleCurrentChange = async (currentPage: number) => {
  pagination.currentPage = currentPage
  const api = http + 'word/?page=' + pagination.currentPage

  const response = await Axios.get(api)
  try {
    loading.value = false
    results.value = response.data.results
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  const api = http + 'word/'
  const response = await Axios.get(api)
  try {
    loading.value = false
    results.value = response.data.results
    console.log(results.value)
    pagination.count = response.data.count
    pagination.perPageCount = results.value.length
    pagination.pageNum = Math.ceil(pagination.count / pagination.perPageCount)
  } catch (error) {
    console.log(error)
  }
})
const date = ref('')

const shortcuts = [
  {
    text: '一周前',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    }
  },
  {
    text: '一个月前',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    }
  },
  {
    text: '三个月前',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    }
  }
]
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
  text-decoration: none;
  color: #000000;
}

.el-row {
  margin-bottom: 15px;
}
.el-col {
  border-radius: 4px;
}
</style>
