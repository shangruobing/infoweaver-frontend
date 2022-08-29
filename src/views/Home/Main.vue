<template>
  <el-scrollbar>
    <div class="main-pan">
      <el-row class="two-pan">
        <el-col class="left-pan">
          <h1 style="font-size: 1.5em">欢迎来到织信科技问答系统</h1>
          <h2>自研智能问答系统</h2>
          <h3>致力于研发简洁、高效的问答机器人</h3>
          <h4>点击右下角体验机器人</h4>
          <h4>
            为我们打分！
            <el-rate v-model="rate" @click="thanks" />
          </h4>
        </el-col>

        <el-col class="right-pan">
          <el-carousel indicator-position="outside" style="text-align: center">
            <a href="https://gitee.com/shangruobing/nfqa-front-end-development" id="fork">
              <img src="@/assets/home/forkme.svg" alt="Fork me on Gitee" />
            </a>
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

      <el-row class="two-pan">
        <el-col class="left-pan">
          <img src="@/assets/material/云端管理.svg" width="400" height="300" />
        </el-col>
        <el-col style="text-align: left" class="right-pan">
          <el-card class="box-card">
            <div class="card-title">高可靠</div>
            <span class="content">使用了数万条人工语料与常规语料进行训练</span>
            <div class="card-title">FAQ问答</div>
            <span class="content">通过简单的QA问答对，精准理解用户意图，快速回复用户问题</span>
            <div class="card-title">自然语言处理</div>
            <span class="content">
              运用自然语言处理技术自动回复文档中的知识，低成本构建文档问答体系
            </span>
          </el-card>
        </el-col>
      </el-row>
      <el-divider />

      <el-row class="two-pan">
        <el-col class="left-pan timeline">
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
        <el-col class="right-pan">
          <img src="@/assets/material/政府工作.svg" width="400" height="350" class="hidden" />
        </el-col>
      </el-row>

      <el-divider />

      <el-row class="two-pan">
        <el-col class="left-pan">
          <img src="@/assets/material/模拟用户数据.svg" width="300" height="270" />
        </el-col>
        <el-col class="right-pan feature-list">
          <h2>参与开源贡献</h2>
          <ul class="color-ul">
            <li><span>体验产品，反馈问题，帮助改进</span></li>
            <li><span>加入项目，创造精彩🎉</span></li>
            <li><span>一起讨论</span></li>
            <li>
              <span>
                联系我们
                <el-link href="mailto:shangruobing29@163.com" title="author-email">
                  <el-icon>
                    <message />
                  </el-icon>
                </el-link>
              </span>
            </li>
          </ul>
        </el-col>
      </el-row>
      <chat-robot />
      <el-divider style="margin-bottom: 10px" />
      <footer-pan />
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Message } from '@element-plus/icons-vue'
import ChatRobot from '@/components/ChatRobot.vue'
import 'element-plus/theme-chalk/display.css'
import FooterPan from './Footer.vue'
import Notification from '@/utils/notification'

const rate = ref(null)

const thanks = () => {
  Notification({
    title: '谢谢评分😜',
    text: '我们会继续努力的',
    position: 'top-left'
  })
}
</script>

<style lang="scss" scoped>
.main-pan {
  padding-bottom: 1em;
  margin: 0;
  margin-top: 1em;
  text-align: center;
  background-color: #f2f4f5;
}

.el-carousel__item h3 {
  margin: 0;
  font-size: 18px;
  line-height: 300px;
  color: #475669;
  text-align: center;
  opacity: 0.75;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

#fork {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 300;
}

.box-card {
  width: 90%;
  margin: auto;

  // margin-left: 3em;

  .card-title {
    padding: 1em 0;
    font-size: 1.1em;
    font-weight: bold;
  }

  .content {
    padding-left: 1.2em;
  }
}

.timeline-card {
  width: 70%;

  // margin-left: 4em;
  height: 50%;
  min-width: 200px;
  padding: 0;
  text-align: left;

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

.feature-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.color-ul {
  text-align: left;

  li {
    padding-bottom: 1em;
    color: #409eff;

    span {
      color: #303131;
    }
  }
}

img {
  max-width: 100%;
  max-height: 100%;
}

.hidden {
  display: none;
}

.timeline {
  display: flex;
  justify-content: center;
}

@media (min-width: 450px) {
  .el-carousel {
    margin-right: 2em;
  }

  .hidden {
    display: inline;
  }

  .two-pan {
    .right-pan {
      flex: 1;
      text-align: left;
    }

    .left-pan {
      flex: 1;
    }
  }

  .timeline-card {
    width: 50%;
    margin-left: 1em;
  }

  .feature-list {
    display: initial;

    .color-ul {
      // margin-left: 3em;
      margin-left: 0;
      text-align: left;

      li {
        padding-bottom: 1em;
        color: #409eff;

        span {
          color: #303131;
        }
      }
    }
  }
}

.el-row {
  justify-content: space-between;
  align-items: center;
}
</style>
