<template>
  <div class="login_container">
    <div class="login_box" v-loading.lock="loginLoading">
      <h2>114514</h2>
      <!-- 头像 -->
      <!-- <div class="avatar_box"> -->
      <!-- <img src="../assets/imgs/loopers.png" alt="" /> -->
      <!-- 欢迎使用 -->
      <!-- </div> -->

      <!-- 登录表单 -->
      <el-form
        label-width="0px"
        class="login_input"
        :model="loginForm"
        :rules="loginRules"
        ref="loginFormRef"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="用户名"
            prefix-icon="el-icon-user"
          >
          </el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password" style="margin-bottom: 0px">
          <el-input
            v-model="loginForm.password"
            placeholder="密码"
            prefix-icon="el-icon-lock"
            type="password"
          >
          </el-input>
          <a class="tag" @click="modify()" style="cursor: pointer"
            >忘记密码？</a
          >
        </el-form-item>

        <!-- 登录、注册按钮 -->
        <el-form-item class="buttons">
          <el-button type="primary" @click="login()">登录</el-button>
          <el-button type="info" @click="register()">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      // 登录表单
      loginForm: {
        username: "Toukou",
        password: "123456",
      },
      // 验证登录表单
      loginRules: {
        username: [
          { required: true, message: "请填写用户名", trigger: "blur" },
          {
            min: 5,
            max: 10,
            message: "长度应该在5到10个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请填写密码", trigger: "blur" },
          {
            min: 5,
            max: 10,
            message: "长度应该在5到20个字符",
            trigger: "blur",
          },
        ],
      },
      loginLoading: false,
    };
  },
  methods: {
    // 登录验证
    login() {
      // 临时调用
      this.$router.push({ path: "/sch_info" });


      this.$refs.loginFormRef.validate((valid) => {
        if (valid) {
          // 请求登录
          this.$http
            .get("user/login", {
              params: {
                username: this.loginForm.username,
                password: this.loginForm.password,
              },
            })
            .then((result) => {
              let loginOK =
                result.status == 200 && result.data.loginStatus == "success";
              let msgOption = { message: "登陆成功", type: "success" };

              if (loginOK) {
                this.$message(msgOption);
                // 保存token
                window.sessionStorage.setItem("token", result.data.token);
                // 跳转到admin页面
                this.$router.push("/login");
              } else {
                this.$message.error("用户名不存在或密码错误");
              }
            });
        } else {
          return;
        }
      });
    },
    // 跳转到注册页面
    register() {
      this.$router.push({ path: "/register" });
    },
    modify() {
      this.$router.push({ path: "/changePwd" });
    },
  },
};
</script>


<style scoped>
h2 {
  margin-top: 30px;
  text-align: center;
}

.login_container {
  position: absolute;
  /* background: linear-gradient(to bottom, #acb6e5, #86fde8); */
  background: linear-gradient(to bottom, #ece9e6, #ffffff);
  /* background-image: url("../assets/imgs/login-background.jpg"); */
  height: 100%;
  width: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  /* background-image: url("../assets/imgs/login-temp.jpg"); */
  /* background-image: linear-gradient(#e66465, #9198e5); */
  /* background: linear-gradient(to bottom, #00f5a0, #00d9f5); */
  background: linear-gradient(to bottom, #ece9e6, #ffffff);
  background-position: center;
  background-size: 120%;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 15px rgb(226, 226, 226);
}

.avatar_box {
  /* text-align: center;
  font-size: 30px;
  font-family: "Lucida Console", Monaco, monospace; */
  height: 130px;
  width: 130px;
  border: 1px solid rgb(153, 217, 247);
  border-radius: 50%;
  padding: 5px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  /* background-color: rgb(93, 252, 252); */
}

img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}

.login_input {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 100px;
  box-sizing: border-box;
}

.buttons {
  display: flex;
  justify-content: start;
  padding-left: 50px;
  margin-top: 2px;
  margin-bottom: 20px;
}

.tag {
  display: flex;
  justify-content: flex-end;
  border: 0px;
  background-color: rgb(153, 217, 247, 0);
  color: rgb(71, 71, 71);
  font-size: 13px;
  text-decoration: none;
  margin-top: -10px;
}
</style>