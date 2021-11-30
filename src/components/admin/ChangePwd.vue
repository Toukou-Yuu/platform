<template>
  <div class="changePwdForm">
    <el-header class="return">
      <el-button type="normal" @click="returnNormal()">返回</el-button>
    </el-header>
    <div class="form_container">
      <div class="title">修改密码</div>
      <el-form
        ref="changePwdRef"
        :model="changePwdForm"
        :rules="changePwdRules"
        label-width="95px"
        class="changePwd-form"
        label-position="left"
        status-icon
      >
        <el-form-item label="邮箱：" prop="email">
          <el-input
            v-model="changePwdForm.email"
            placeholder="xxxxxx@xx.com"
          ></el-input>
        </el-form-item>
        <el-form-item label="原密码：" prop="formerPwd">
          <el-input
            v-model="changePwdForm.formerPwd"
            placeholder="长度在5-10位之间"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="newPwd">
          <el-input
            v-model="changePwdForm.newPwd"
            placeholder="长度在5-10位之间"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="checkPass">
          <el-input
            v-model="changePwdForm.checkPass"
            placeholder="确认密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item class="buttonG">
          <el-button type="primary" @click="change()">修改密码</el-button>
          <el-button type="info" @click="reset()">重置信息</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    let varifyPass = (rule, value, callback) => {
      if (value === "" || value !== this.changePwdForm.newPwd) {
        callback(new Error("两次密码输入不一致"));
      } else {
        callback();
      }
    };

    let varifyEmail = (rule, value, callback) => {
      let regex =
        /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/;
      if (!regex.test(value)) {
        callback(new Error("邮箱不符合格式"));
      } else {
        callback();
      }
    };

    return {
      changePwdForm: {
        email: "",
        formerPwd: "",
        newPwd: "",
        checkPass: "",
      },

      changePwdRules: {
        email: [
          {
            validator: varifyEmail,
            required: true,
            trigger: "blur",
          },
        ],
        formerPwd: [
          { required: true, message: "请输入原密码", trigger: "blur" },
        ],
        newPwd: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          {
            min: 5,
            max: 10,
            message: "长度在 5 到 10 个字符",
            trigger: "blur",
          },
        ],
        checkPass: [{ validator: varifyPass, trigger: "blur", required: true }],
      },
    };
  },
  methods: {
    // 预检查必要信息
    change() {
      this.$router.push("/login");
      this.$refs.changePwdRef.validate((valid) => {
        if (valid) {
          // 将数据请求到服务器中
          this.$http
            .post("todo", {
              params: {
                email: this.changePwdForm.email,
                former: this.changePwdForm.formerPwd,
                new: this.changePwdForm.newPwd,
                check: this.changePwdForm.checkPass,
              },
            })
            .then((result) => {
              if (result.msg === "success") {
                this.$message({
                  message: "修改密码成功！",
                  type: "success",
                });
                // 跳转到后台页面
                this.$router.push("/login");
              }
            });
        } else {
          this.$message.error("缺少必要的信息！");
        }
      });
    },
    // 重置表单
    reset() {
      this.$refs.changePwdRef.resetFields();
    },
    // 返回修改前页面
    returnNormal() {},
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.changePwdForm {
  height: 100%;
  background-color: rgb(243, 243, 243);
}

.form_container {
  width: 500px;
  /* height: 350px; */
  height: 400px;
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

.changePwd-form {
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

.buttonG {
  display: flex;
  justify-content: flex-start;
  margin-top: 40px;
  padding-left: 0px;
  margin-left: -45px !important;
}

.return {
  display: flex;
  align-items: center;
}
</style>