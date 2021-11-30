<template>
  <el-container class="global-container">
    <!-- 头部区域 -->
    <el-header class="header" style="background-color: #f1f2f6">
      <div>
        <span>招聘管理系统（学校）</span>
      </div>
      <div class="head_div">
        <el-avatar :src="this.avaUrl" class="avatar"></el-avatar>
        <el-button type="normal" @click="logout()" class="logout"
          >退出登录</el-button
        >
      </div>
    </el-header>

    <el-container>
      <!-- 侧边导航栏区域 -->
      <el-aside
        :width="isCollapse ? '64px' : '200px'"
        class="aside"
        style="background-color: #313138"
      >
        <div
          class="collapse-style"
          @click="collapse()"
          style="background-color: #313138"
        >
          &lt;&gt;
        </div>

        <el-menu
          background-color="#313138"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="activedPath"
          router
        >
          <el-menu-item index="recruitPlanSet">
            <i class="el-icon-edit-outline"></i>
            <span slot="title" class="aside-group-font">招聘计划设定</span>
          </el-menu-item>

          <el-submenu index="functions" ref="submenuR">
            <template slot="title">
              <i class="el-icon-search"></i>
              <span class="aside-group-font">查询</span>
            </template>

            <el-menu-item
              index="validScoreSearch"
              class="aside-item-font"
              ref="validR"
            >
              <i class="el-icon-search"></i>
              入围成绩查询
            </el-menu-item>

            <el-menu-item index="examineeSearch" class="aside-item-font">
              <i class="el-icon-search"></i>
              考生信息查询
            </el-menu-item>
          </el-submenu>

          <el-menu-item index="interviewScoreEntry">
            <i class="el-icon-coin"></i>
            <span slot="title" class="aside-group-font">面试成绩录入</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 主体区域 -->
      <el-main>
        <router-view></router-view>
        <el-footer class="sch-footer"
          ><div class="sch-footer-div">
            &copy;Copyright Team By Yuu&Hu
          </div></el-footer
        >
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      width: "",
      isCollapse: false,
      iscollapseTransition: false,
      // 被激活的地址
      activedPath: "",
      avaUrl: "https://avatars.githubusercontent.com/u/64688619?v=4",
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
      if (this.isCollapse) {
        this.$refs.submenuR.style.width = "60px";
        this.$refs.validR.style.width = "60px";
      } else {
        this.$refs.submenuR.style.width = "200px";
        this.$refs.validR.style.width = "200px";
      }
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

/* .el-menu-item {
  width: 200px;
} */

.el-submenu__title {
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
  /* background-color: aqua; */
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
  background-color: #313138;
  font-size: 14px;
  line-height: 26px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  /* 鼠标焦点 */
  cursor: pointer;
}

.logout {
  margin-left: 15px !important;
}

.sch-footer {
  text-align: center;
  line-height: 80px;
}

.scj-footer-div {
  width: 100%;
  height: 100%;
  font-weight: 100;
}

.head_div{
  display: flex;
}
</style>