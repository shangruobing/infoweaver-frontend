<template>
  <el-container>
    <el-header>
      <h3>Notice File Question & Answer</h3>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu default-active="2" :unique-opened="true">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><icon-menu /></el-icon>
              <span>文件管理</span>
            </template>
            <el-menu-item index="1-1" @click="Show('noticeList')">
              查看文件
            </el-menu-item>
            <el-menu-item index="1-2" @click="Show('neo4j')">
              文件查询
            </el-menu-item>
            <el-menu-item index="1-3">TODO1</el-menu-item>
            <el-menu-item index="1-4">TODO2</el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="2">
            <template #title>
              <el-icon><location /></el-icon>
              <span>XX管理</span>
            </template>
            <el-menu-item index="2-1"> TODO1 </el-menu-item>
            <el-menu-item index="2-2"> TODO2 </el-menu-item>
            <el-menu-item index="2-3"> TODO3</el-menu-item>
            <el-menu-item index="2-4"> TODO4</el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="3">
            <template #title>
              <el-icon>
                <setting></setting>
              </el-icon>
              <span>XX功能</span>
            </template>
            <el-menu-item index="3-1">TODO1</el-menu-item>
            <el-menu-item index="3-2">TODO2</el-menu-item>
            <el-menu-item index="3-3">TODO3</el-menu-item>
            <el-menu-item index="3-4">TODO4</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <component :is="showComponent"></component>
          <router-view></router-view>
          <my-robt></my-robt>
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </el-container>
</template>


<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { Location, Message, Menu, Setting } from "@element-plus/icons";
import { ElEmpty } from "element-plus";
import NoticeList from "./NoticeList.vue";
import Neo4j from "./Neo4j.vue";
import MyRobt from "./myChat.vue";

export default defineComponent({
  name: "Content",
  components: {
    Message,
    Location,
    Setting,
    "icon-menu": Menu,
    noticeList: NoticeList,
    neo4j: Neo4j,
    empty: ElEmpty,
    MyRobt
  },
  setup() {
    let showComponent = ref("empty");

    const Show = (name: string) => {
      showComponent.value = name;
    };
    return { showComponent, Show };
  },
});
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #409eff;
  color: var(--el-text-color-primary);
  /* line-height: 60px; */
}
h3 {
  color: white;
}
.el-aside {
  color: var(--el-text-color-primary);
}
</style>
