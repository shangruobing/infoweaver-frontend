<template>
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
import Axios from "axios";
import { ref, reactive, onMounted } from "vue";
import { getHttp } from "../utils/django-http";

const loading = ref(false);
const results = ref([]);
const pagination = reactive({
    count: 0,
    perPageCount: 0,
    pageNum: 0,
    currentPage: 1,
});

const http = getHttp();

const handleCurrentChange = async (currentPage: number) => {
    pagination.currentPage = currentPage;
    const api = http + "word/?page=" + pagination.currentPage;

    const response = await Axios.get(api);
    try {
        loading.value = false;
        results.value = response.data["results"];
    } catch (error) {
        console.log(error);
    }
};

onMounted(async () => {
    const api = http + "upload/";
    const response = await Axios.get(api);
    try {
        loading.value = false;
        results.value = response.data["results"];
        console.log(results.value);
        pagination.count = response.data["count"];
        pagination.perPageCount = results.value.length;
        pagination.pageNum = Math.ceil(pagination.count / pagination.perPageCount);
    } catch (error) {
        console.log(error);
    }
});

const confirmEvent = () => {
    console.log("confirm!");
    //   this.students.splice(this.delInfo.index, 1);
};
const cancelEvent = () => {
    console.log("cancel!");
};
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
