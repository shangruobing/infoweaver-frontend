<template>
  <el-row>
    <el-col>
      请输入要查询的信息
      <el-input
        v-model="question"
        type="text"
        placeholder="请输入要查询的信息"
        style="width: 30%"
        :suffix-icon="Search"
      />

      <el-button @click="search" type="primary" round>搜索</el-button>
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
    <el-table-column prop="date" label="Upload Time" width="250" sortable />
    <el-table-column prop="name" label="Name" width="650" />

    <el-table-column label="Operations" prop="url" width="150">
      <template #default="scope">
        <el-link>
          <router-link target="_blank" :to="'/word/' + scope.row.mysql_id">
            预览
          </router-link>
          <el-icon class="el-icon--right"><icon-view /></el-icon>
        </el-link>
        <el-link :href="scope.row.url">
          下载
          <el-icon class="el-icon--right"><download /></el-icon>
        </el-link>
      </template>
    </el-table-column>
  </el-table>

  <el-empty description="好像什么也没有诶 快输入一些信息啦" v-else></el-empty>

  <el-row justify="center">
    <el-pagination
      layout="prev, pager, next"
      :page-count="pagination.pageNum"
      background
      :current-page="pagination.currentPage"
      :hide-on-single-page="true"
      @current-change="handleCurrentChange"
    >
    </el-pagination
  ></el-row>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import Axios from "axios";
import { Search } from "@element-plus/icons-vue";
export default defineComponent({
  name: "neo4j",
  setup() {
    const question = ref(" ");
    const loading = ref(true);
    const results = ref([]);
    const pagination = reactive({
      count: 0,
      perPageCount: 0,
      pageNum: 0,
      currentPage: 1,
    });

    const search = () => {
      const data = {
        question: question.value,
      };
      const api = "http://127.0.0.1:8000/api/neo4j/";
      Axios.post(api, data)
        .then((response) => {
          console.log(response);
          loading.value = false;
          results.value = response.data["results"];

          pagination.count = response.data["count"];
          // console.log(pagination.count);
          pagination.perPageCount = results.value.length;
          // console.log(pagination.perPageCount);
          pagination.pageNum = Math.ceil(
            pagination.count / pagination.perPageCount
          );
          // console.log(pagination.pageNum);

          if (pagination.count === 0) {
            alert("什么也没有找到");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const handleCurrentChange = (currentPage: number) => {
      const data = {
        question: question.value,
      };
      pagination.currentPage = currentPage;
      const api = "http://127.0.0.1:8000/api/neo4j/";
      const api1 = api + "?page=" + pagination.currentPage;

      Axios.post(api1, data)
        .then((response) => {
          loading.value = false;
          results.value = response.data["results"];
        })
        .catch((error) => {
          console.log(error);
        });
    };

    onMounted(() => {
      console.log("这是查询页面");
    });

    return {
      question,
      // answer,
      results,
      search,
      Search,
      loading,
      pagination,
      handleCurrentChange,
    };
  },
});
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
</style>