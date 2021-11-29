<template>
  <el-container>
    <el-header>
      <div class="head">成绩查询、志愿填写、基本信息维护等功能</div>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<style scoped>
.head {
  /* position: absolute; */
  background-color: antiquewhite;
  height: 40px;
  /* width: 100%;  */
}
</style>