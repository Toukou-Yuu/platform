<template>
  <el-container class="global-container">
    <!-- 头部区域 -->
    <el-header class="header">
      <div>
        <span>招聘管理系统（教育局）</span>
      </div>
      <el-button type="info" @click="logout()">退出登录</el-button>
    </el-header>

    <el-container>
      <!-- 侧边导航栏区域 -->
      <el-aside :width="isCollapse ? '64px' : '200px'" class="aside">
        <div class="collapse-style" @click="collapse()">&lt;&gt;</div>

        <el-menu
          background-color="rgb(113, 184, 255)"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="activedPath"
          router
        >
          <el-menu-item index="recruitArticlePage">
            <i class="el-icon-edit"></i>
            <span slot="title" class="aside-group-font">招聘主题发布</span>
          </el-menu-item>
          <el-menu-item index="recruitPlanCheck">
            <i class="el-icon-document-checked"></i>
            <span slot="title" class="aside-group-font">招聘计划审核</span>
          </el-menu-item>
          <el-menu-item index="wirttenScoresEntry">
            <i class="el-icon-coin"></i>
            <span slot="title" class="aside-group-font">笔试成绩录入</span>
          </el-menu-item>
          <el-menu-item index="validScoreSet">
            <i class="el-icon-edit-outline"></i>
            <span slot="title" class="aside-group-font">入围成绩设定</span>
          </el-menu-item>
          <el-menu-item index="examineeSearch">
            <i class="el-icon-search"></i>
            <span slot="title" class="aside-group-font">考生信息查询</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      
      <!-- 主体区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      iscollapseTransition: false,
      // 被激活的地址
      activedPath: "",
    };
  },
  methods: {
    // 退出登录
    logout() {
      this.$router.push("/login");
      this.$message({
        message: "已退出登录！",
        type: "warning",
      });
    },
    // 合并菜单
    collapse() {
      this.isCollapse = !this.isCollapse;
    },
    // 连接激活状态
    setNavState(path) {
      window.sessionStorage.setItem("activePath", path);
      // 切换不同路径时，保存不同的path
      this.activedPath = path;
    },
    // 当实例对象创建完成时获取激活状态
    created() {
      window.sessionStorage.getItem("activePath");
    },
  },
};
</script>



<style>
* {
  padding: 0;
  margin: 0;
}
.el-aside {
  box-shadow: 0 0 5px rgb(189, 189, 189);
}

.el-header {
  box-shadow: 0 0 5px rgb(189, 189, 189);
}

.el-menu {
  border-right-width: 0px;
}

.el-menu-item {
  width: 200px;
}

.global-container {
  height: 100%;
  width: 100%;
}

/* 顶部区域 */
.header {
  background-color: rgb(183, 220, 255);
  display: flex;
  /* 均匀排列每个元素；首个元素放置于起点，末尾元素放置于终点 */
  justify-content: space-between;

  /* 让按钮居中显示 */
  align-items: center;

  /* 字体 */
  padding-left: 40px;
  color: rgb(109, 116, 130);
  font-size: 20px;
}

/* 侧边栏区域 */
.aside {
  background-color: rgb(113, 184, 255);
}

/* 主体区域 */
.main {
  background-color: rgb(255, 255, 255);
}

/* 侧边栏 */
.aside-group-font {
  color: rgb(255, 255, 255);
  font-size: 17px;
  font-weight: bold;
}

/* 侧边栏每个导航信息 */
.aside-item-font {
  color: rgb(185, 185, 185);
  font-size: 15px;
  font-weight: bold;
}

.collapse-style {
  background-color: #66a4e2;
  font-size: 14px;
  line-height: 26px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  /* 鼠标焦点 */
  cursor: pointer;
}
</style>