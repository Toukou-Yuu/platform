<template>
  <div>
    <el-card>
      <el-row>
        <el-col>
          <h3 style="margin-bottom: 10px">账号信息</h3>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top: 0px">
        <el-col :span="6">
          <el-input v-model="accInfo.nickname" :disabled="hasAAccess == false">
            <template slot="prepend">昵称：</template>
          </el-input>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top: 15px">
        <el-col :span="7">
          <el-input v-model="accInfo.username" :disabled="hasAAccess == false">
            <template slot="prepend">用户名：</template>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-input
            placeholder="****************"
            type="password"
            :disabled="true"
          >
            <template slot="prepend">密码：</template>
          </el-input>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top: 25px">
        <el-col :span="3" style="margin-right: -15px" ref="changeAccRef">
          <el-button @click="changeAcc()">{{ confirmAcc }}</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="danger" @click="changePwd()">修改密码</el-button>
        </el-col>
      </el-row>

      <hr style="margin-top: 30px; border-bottom: none" />

      <el-row>
        <el-col>
          <h3 style="margin-bottom: 10px; margin-top: 35px">考生信息</h3>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top: 0px">
        <el-col :span="5">
          <el-input
            v-model="personalInfo.realName"
            :disabled="hasPAccess == false"
          >
            <template slot="prepend">真实姓名：</template>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-input
            v-model="personalInfo.age"
            oninput="value=value.replace(/[^\d-]/g,'')"
            :disabled="hasPAccess == false"
          >
            <template slot="prepend">年龄：</template>
          </el-input>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top: 15px">
        <el-col :span="4">
          <el-select
            v-model="sexVal"
            placeholder="性别"
            :disabled="hasPAccess == false"
          >
            <el-option
              v-for="sex in sexOpt"
              :key="sex.sexVal"
              :label="sex.sexLab"
              :value="sex.sexVal"
            >
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="4">
          <div class="block">
            <el-date-picker
              v-model="this.personalInfo.birth"
              type="date"
              placeholder="出生日期"
              :disabled="hasPAccess == false"
            ></el-date-picker>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top: 15px">
        <el-col :span="6">
          <el-input
            v-model="personalInfo.email"
            :disabled="hasPAccess == false"
          >
            <template slot="prepend">邮箱：</template>
          </el-input>
        </el-col>

        <el-col :span="6">
          <el-input
            v-model="personalInfo.phone"
            :disabled="hasPAccess == false"
          >
            <template slot="prepend">手机号：</template>
          </el-input>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top: 15px">
        <el-col :span="13">
          <el-input
            v-model="personalInfo.address"
            :disabled="hasPAccess == false"
          >
            <template slot="prepend">住址：</template>
          </el-input>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top: 25px; margin-bottom: -5px">
        <el-col :span="3" style="margin-right: -15px" ref="changeAccRef">
          <el-button @click="changePerson()">{{ confirmPerson }}</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accInfo: {
        username: "Yuu@qq.com",
        nickname: "NanamiYuu",
      },
      personalInfo: {
        realName: "gyx",
        age: "72",
        birth: "1949-10-1",
        sex: "",
        email: "Yuu@qq.com",
        phone: "1145141919",
        address: "千景塔",
      },

      sexOpt: [
        {
          sexVal: "male",
          sexLab: "男",
        },
        {
          sexVal: "female",
          sexLab: "女",
        },
      ],
      sexVal: "",

      confirmAcc: "修改账号信息",
      confirmPerson: "修改个人信息",

      hasPAccess: false,
      hasAAccess: false,
    };
  },
  methods: {
    getData() {
      this.$http
        .get("?", {
          params: {},
        })
        .then((result) => {
          // 响应消息
          console.log(result);
          let msg = result.data.msg;
          if (msg === "success") {
            // 将数据，数据数量赋值给表格，待定返回数据类型
            this.info.name = result.data.name;
            this.currentPage = 1;
            this.isFiltered = false;
          } else {
            this.$message.error("加载出错！");
          }
        });
    },

    changeAcc() {
      this.hasAAccess = !this.hasAAccess;
      this.confirmAcc =
        this.confirmAcc == "修改账号信息" ? "确认账号信息" : "修改账号信息";
      if (this.confirmAcc == "修改账号信息") {
        this.$message({
          message: "修改成功",
          type: "success",
        });
      }
    },
    changePwd() {
      this.$router.push({ path: "/changePwd" });
    },

    changePerson() {
      this.hasPAccess = !this.hasPAccess;
      this.confirmPerson =
        this.confirmPerson == "修改个人信息" ? "确认个人信息" : "修改个人信息";
      if (this.confirmPerson == "修改个人信息") {
        this.$message({
          message: "修改成功",
          type: "success",
        });
      }
    },
  },
};
</script>

<style scope>
</style>