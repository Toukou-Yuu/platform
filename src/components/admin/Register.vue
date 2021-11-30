<template>
  <div class="register_container">
    <div class="register_form_container">
      <div class="title">注册</div>
      <el-form
        ref="registerFormRef"
        :model="registerForm"
        :rules="registerRules"
        label-width="95px"
        class="register_form"
        label-position="left"
        status-icon
      >
        <el-form-item label="邮箱：" prop="email">
          <el-input
            v-model="registerForm.email"
            placeholder="xxxxxx@xx.com"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input
            v-model="registerForm.password"
            placeholder="长度在5-10位之间"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="checkPass">
          <el-input
            v-model="registerForm.checkPass"
            placeholder="确认密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="真实姓名：" prop="realname">
          <el-input
            v-model="registerForm.realname"
            placeholder="张三"
          ></el-input>
        </el-form-item>
        <el-form-item label="昵称：" prop="nickname">
          <el-input
            v-model="registerForm.nickname"
            placeholder="昵称"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="sex">
          <el-radio-group v-model="registerForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="身份：" prop="identity">
          <el-radio-group v-model="registerForm.identity">
            <el-radio label="教师"></el-radio>
            <el-radio label="学生"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="联系方式：" prop="phone">
          <el-input
            v-model="registerForm.phone"
            placeholder="1145141919"
          ></el-input>
        </el-form-item>
        <el-form-item class="buttons">
          <el-button type="primary" @click="register">注册</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    let valifyPass = (rule, value, callback) => {
      if (value === "" || value !== this.registerForm.password) {
        callback(new Error("两次密码输入不一致！"));
      } else {
        console.log(rule);
        callback();
      }
    };

    return {
      registerForm: {
        email: "",
        password: "",
        checkPass: "",
        realname: "",
        nickname: "",
        sex: "",
        identity: "",
        phone: "",
      },

      registerRules: {
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        identity: [{ required: true, message: "请选择身份", trigger: "blur" }],
        realname: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 10,
            message: "长度在 5 到 10 个字符",
            trigger: "blur",
          },
        ],
        checkPass: [{ validator: valifyPass, trigger: "blur", required: true }],
      },
    };
  },
  methods: {
    // 注册，预检查必要信息
    register() {
      this.$refs.registerFormRef.validate((valid) => {
        if (valid) {
          // 将数据请求到服务器中
          this.$http
            .post("todo", {
              params: {
                email: this.registerForm.email,
                password: this.registerForm.password,
              },
            })
            .then((result) => {
              if (result.msg === "success") {
                this.$message({
                  message: "注册成功！",
                  type: "success",
                });
                // 跳转到后台页面
                this.$router.push("/admin");
                // 再将剩余信息单独请求到个人信息中
                this.$http.post("todo", {
                  params: {
                    sex: this.registerForm.sex,
                    email: this.registerForm.email,
                    phone: this.registerForm.phone,
                  },
                });
              }
            });
        } else {
          this.$message.error("缺少必要的信息！");
        }
      });
    },
    // 重置表单
    reset() {
      this.$refs.registerFormRef.resetFields();
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.register_container {
  height: 100%;
  background-color: rgb(243, 243, 243);
}

.register_form_container {
  width: 600px;
  /* height: 350px; */
  height: 660px;
  background-position: center;
  background-color: white;
  background-size: 120%;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 15px rgb(184, 184, 184);
}

.register_form {
  position: absolute;
  top: 70px;
  /* bottom: 0; */
  width: 100%;
  padding: 0 100px;
  box-sizing: border-box;
}

.title {
  position: absolute;
  width: 100%;
  top: 20px;
  text-align: center;
  font-size: 25px;
}

.buttons {
  display: flex;
  justify-content: flex-start;
  margin-top: 40px;
  padding-left: 30px;
}
</style>