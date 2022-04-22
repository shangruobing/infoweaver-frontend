<template>
    <el-container>
        <el-header>
            <el-row align="middle" justify="end" style="width: 100%">
                <el-col :span="2">
                    <img src="../assets/黑横.svg" width="160" height="60" />
                </el-col>
                <el-col :span="10"> </el-col>
                <el-col :span="12">
                    <el-row align="middle" justify="end" style="width: 100%">
                        <el-input placeholder="Search" :prefix-icon="Search" style="width: 200px" />
                        <el-menu
                            mode="horizontal"
                            active-text-color="#000000"
                            background-color="f0f2f4"
                            style="width: 370px"
                            :ellipsis="false"
                        >
                            <el-menu-item index="1" class="header-menu-item">指南</el-menu-item>
                            <el-menu-item index="2" class="header-menu-item">资源</el-menu-item>
                            <el-menu-item index="3" class="header-menu-item">登录</el-menu-item>
                            <el-menu-item index="4" class="header-menu-item">注册</el-menu-item>
                            <el-menu-item index="5" class="header-menu-item">
                                <el-dropdown>
                                    <el-avatar
                                        src="https://portrait.gitee.com/uploads/avatars/user/3474/10422230_shangruobing_1644648546.png!avatar200"
                                    />
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item>个人中心</el-dropdown-item>
                                            <el-dropdown-item @click="router.push('/content/')">
                                                进入管理端
                                            </el-dropdown-item>
                                            <el-dropdown-item>帮助</el-dropdown-item>
                                            <el-dropdown-item disabled>禁用设置</el-dropdown-item>
                                            <el-dropdown-item divided>退出登录</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </el-menu-item>
                        </el-menu>
                    </el-row>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-row :gutter="20">
                <el-col :span="9" style="text-align: center">
                    <h1 style="font-size: 30px">欢迎来到织信科技问答系统</h1>
                    <h2>自研智能问答系统</h2>
                    <h3>致力于研发简洁、高效的问答机器人</h3>
                    <h4>点击右下角体验机器人</h4>
                    <h4>为我们打分！<el-rate v-model="rate" @click="thanks" /></h4>
                    <!-- <el-button round @click="router.push('/content/')" type="plain"> 进入管理端! </el-button> -->
                </el-col>

                <el-col :span="15">
                    <!-- <el-carousel indicator-position="outside" style="text-align: center width: 80%"> -->
                    <el-carousel indicator-position="outside" style="text-align: center">
                        <el-carousel-item>
                            <img src="../assets/模拟用户数据.svg" width="400" height="350" />
                        </el-carousel-item>
                        <el-carousel-item>
                            <img src="../assets/检索站点.svg" width="400" height="350" />
                        </el-carousel-item>
                        <el-carousel-item>
                            <img src="../assets/检测数据.svg" width="400" height="350" />
                        </el-carousel-item>
                    </el-carousel>
                </el-col>
            </el-row>
            <el-divider />
            <el-row :gutter="20">
                <el-col :span="10" style="text-align: right">
                    <img src="../assets/云端管理.svg" width="400" height="250" alt="InfoWeaver" />
                    <br />
                </el-col>
                <el-col :span="14" style="text-align: left">
                    <el-card class="box-card">
                        <div class="text item">高可靠</div>
                        <span class="content">使用了数万条人工语料与常规语料进行训练</span>
                        <div class="text item">FAQ问答</div>
                        <span class="content">通过简单的QA问答对，精准理解用户意图，快速回复用户问题</span>
                        <div class="text item">自然语言处理</div>
                        <span class="content">运用自然语言处理技术自动回复文档中的知识，低成本构建文档问答体系</span>
                    </el-card>
                </el-col>
            </el-row>
            <el-divider />
            <el-row :gutter="20">
                <el-col :span="2"></el-col>

                <el-col :span="10" style="text-align: left">
                    <el-timeline class="timeline-card">
                        <el-timeline-item timestamp="2021/5/1" placement="top" color="#409EFF">
                            <el-card>
                                <h4>团队建立</h4>
                                <p>建立项目团队，进行了工作分配</p>
                            </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2022/2/1" placement="top" color="#409EFF">
                            <el-card>
                                <h4>团队成果</h4>
                                <p>创建了一个具有基本功能的问答系统</p>
                            </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="至今" placement="top">
                            <el-card>
                                <h4>产品优化</h4>
                                <p>对问答系统继续进行功能拓展</p>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>
                </el-col>
                <el-col :span="12" style="text-align: left">
                    <img src="../assets/政府工作.svg" width="500" height="400" />
                </el-col>
            </el-row>

            <my-robot />
        </el-main>
    </el-container>
</template>

<script lang="ts" setup>
import { h, ref } from "vue";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";
import { Search } from "@element-plus/icons-vue";
import MyRobot from "./ChatRobot.vue";

const router = useRouter();
const rate = ref(null);

const thanks = () => {
    ElNotification({
        title: "谢谢评分😜",
        message: h("i", { style: "color: teal" }, "我们会继续努力的！"),
        position: "top-left",
    });
};
</script>

<style lang="scss" scoped>
.el-main {
    background-color: #f2f4f5;
    padding-bottom: 0px;
}

.el-header {
    padding-right: 0;
    z-index: 1000;
    background-color: #fff;
}

.header-menu-item {
    width: 70px;
    height: 53px;
    border: none;
}

:deep(.el-menu--horizontal > .el-menu-item.is-active) {
    height: 53px;
    border: none;
}

:deep(.el-menu--horizontal) {
    text-align: right;
    width: 500px;
    border: none;
}

.my-collapse {
    background-color: #f2f4f5;
}

.text {
    font-size: 18px;
    font-weight: bold;
}

.item {
    padding: 18px 0;
}

.box-card {
    width: 600px;
    padding-left: 20px;
    margin-left: 50px;
}

.content {
    padding-left: 20px;
}

.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

.timeline-card {
    width: 70%;
    height: 50%;
    :deep(.el-card__body) {
        padding: 10px;
    }
    h4 {
        margin-top: 9px;
        margin-bottom: 9px;
        margin-left: 9px;
        font-size: medium;
    }
    p {
        margin-top: 9px;
        margin-left: 18px;
    }
}

:deep(.el-card__body) {
    padding-top: 10px;
}
</style>
