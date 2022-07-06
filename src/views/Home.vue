<template>
  <el-scrollbar>
    <el-container>
      <el-header>
        <el-row align="middle" justify="space-between" style="width: 100%">
          <el-col :span="12" style="text-align: left; height: 53px">
            <el-popover :width="150" popper-style="text-align: center; padding: 10px;">
              <template #reference>
                <img src="@/assets/infoweaver/黑横.svg" width="160" height="60"
              /></template>
              <template #default><p>编织信息 共赢未来🎉</p></template>
            </el-popover>
          </el-col>

          <el-col :span="12" style="text-align: right; height: 53px">
            <el-row align="middle" justify="end" style="width: 100%">
              <el-input
                placeholder="Search"
                :prefix-icon="Search"
                style="width: 30%; padding-right: 10px"
                class="hidden-sm-and-down"
              />
              <el-menu
                mode="horizontal"
                active-text-color="#000000"
                background-color="f0f2f4"
                style="width: 360px"
                :ellipsis="false"
                router
              >
                <el-menu-item class="header-menu-item">指南</el-menu-item>
                <el-menu-item class="header-menu-item">资源</el-menu-item>
                <el-menu-item index="login" class="header-menu-item">登录</el-menu-item>
                <el-menu-item index="register" class="header-menu-item">注册 </el-menu-item>
                <el-menu-item index="" class="header-menu-item">
                  <personal-center isHome />
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
          </el-col>

          <el-col :span="15">
            <a href="https://gitee.com/shangruobing/nfqa-front-end-development" id="fork">
              <img src="@/assets/home/forkme.svg" alt="Fork me on Gitee" />
            </a>
            <el-carousel indicator-position="outside" style="text-align: center">
              <el-carousel-item>
                <img src="@/assets/material/模拟用户数据.svg" width="400" height="350" />
              </el-carousel-item>
              <el-carousel-item>
                <img src="@/assets/material/检索站点.svg" width="400" height="350" />
              </el-carousel-item>
              <el-carousel-item>
                <img src="@/assets/material/检测数据.svg" width="400" height="350" />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
        <el-divider />
        <el-row :gutter="20">
          <el-col :span="10" style="text-align: right">
            <img src="@/assets/material/云端管理.svg" width="400" height="250" alt="InfoWeaver" />
          </el-col>
          <el-col :span="14" style="text-align: left">
            <el-card class="box-card">
              <div class="text item">高可靠</div>
              <span class="content">使用了数万条人工语料与常规语料进行训练</span>
              <div class="text item">FAQ问答</div>
              <span class="content">通过简单的QA问答对，精准理解用户意图，快速回复用户问题</span>
              <div class="text item">自然语言处理</div>
              <span class="content">
                运用自然语言处理技术自动回复文档中的知识，低成本构建文档问答体系
              </span>
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
                  <p>建立项目团队，进行准备工作</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2022/2/1" placement="top" color="#409EFF">
                <el-card>
                  <h4>系统开发</h4>
                  <p>正式开发系统，建立系统框架</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="至今" placement="top" color="#0bbd87">
                <el-card>
                  <h4>产品优化</h4>
                  <p>进一步完善拓展功能</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </el-col>
          <el-col :span="12" style="text-align: left">
            <img src="@/assets/material/政府工作.svg" width="500" height="400" />
          </el-col>
        </el-row>

        <el-divider />

        <el-row :gutter="20">
          <el-col :span="12" style="text-align: right">
            <img src="@/assets/material/模拟用户数据.svg" width="450" height="250" />
          </el-col>
          <el-col :span="12" style="text-align: left">
            <h2>参与开源贡献</h2>
            <ul class="color-ul">
              <li><span>体验产品，反馈问题，帮助改进</span></li>
              <li><span>加入项目，创造精彩🎉</span></li>
              <li><span>一起讨论</span></li>
              <li>
                <span>
                  联系我们
                  <el-link href="mailto:shangruobing29@163.com">
                    <el-icon><message /></el-icon>
                  </el-link>
                </span>
              </li>
            </ul>
          </el-col>
        </el-row>

        <el-divider style="margin-bottom: 10px" />

        <el-link
          target="_blank"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=53011402000584"
          style="margin-right: 20px"
          :underline="false"
        >
          <img src="@/assets/home/beian.png" />
          滇公网安备 53011402000584号
        </el-link>

        <el-link href="https://beian.miit.gov.cn/" target="_blank" :underline="false">
          滇ICP备2022003697号-1
        </el-link>
        <p style="font-size: 14px; color: #606266">All Rights Reserved Ruobing Shang 版权所有</p>
        <my-robot />
      </el-main>
    </el-container>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue'
import { ElNotification } from 'element-plus'
import { Search, Message } from '@element-plus/icons-vue'
import MyRobot from '@/components/ChatRobot.vue'
import PersonalCenter from '@/components/PersonalCenter.vue'
import 'element-plus/theme-chalk/display.css'

const rate = ref(null)

const thanks = () => {
  ElNotification({
    title: '谢谢评分😜',
    message: h('i', { style: 'color: teal' }, '我们会继续努力的！'),
    position: 'top-left'
  })
}
</script>

<style lang="scss" scoped>
.el-main {
  padding-top: 70px;
  background-color: #f2f4f5;
  padding-bottom: 0px;
  padding-right: 20px;
}

.el-header {
  position: fixed;
  width: 100vw;
  padding-left: 15px;
  padding-right: 0;
  z-index: 1000;
  background-color: #fff;
  box-shadow: 0 7px 5px -5px #f2f4f5;
  border-bottom: 3px solid #f0f2f4;
  height: 60px;
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

.color-ul {
  li {
    color: #409eff;
    padding-bottom: 20px;
    span {
      color: #303131;
    }
  }
}

#fork {
  position: absolute;
  right: 10px;
  top: 0px;
  z-index: 300;
}
</style>
