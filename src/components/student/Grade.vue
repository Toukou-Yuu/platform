<template>
  <div class="grade_search">
    <el-card>
      <el-row :gutter="20" style="margin-top: 0px">
        <el-col :span="10">
          <el-input
            placeholder="例：1145141919"
            v-model="conditions.phone"
            :disabled="conditions.email != ''"
            oninput="value=value.replace(/[^\d]/g,'')"
          >
            <template slot="prepend">手机号：</template>
          </el-input>
        </el-col>
        <el-col :span="10">
          <el-input
            placeholder="例：Yuu@qq.com"
            v-model="conditions.email"
            :disabled="conditions.phone != ''"
          >
            <template slot="prepend">邮箱：</template>
          </el-input>
        </el-col>

        <el-col :span="2">
          <el-button type="primary" @click="search()"> 查询 </el-button>
        </el-col>
      </el-row>

      <el-row style="margin-top: 15px">
        <el-table
          :data="
            table.slice((currentPage - 1) * pageSize, currentPage * pageSize)
          "
          style="width: 100%; padding: 0px"
          ref="filterTableRef"
        >
          <el-table-column
            prop="examName"
            label="考生姓名"
            width="140"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="writeScore"
            label="笔试成绩"
            width="140"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="interviewScore"
            label="面试成绩"
            width="140"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="performance"
            label="综合成绩"
            width="135"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="writeDate"
            label="笔试时间"
            width="200"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="interviewDate"
            label="面试时间"
            width="200"
            sortable
          >
          </el-table-column>
          <el-table-column prop="isValid" label="是否入围" width="135" sortable>
          </el-table-column>
          <el-table-column prop="isAdmit" label="是否录取" width="135" sortable>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // #region 表格属性
      table: [],
      dataCount: 0,
      pageSize: 9,
      currentPage: 1,
      codeFilter: [],
      //#endregion

      conditions: {
        phone: "",
        email: "",
      },
    };
  },
  methods: {
    search() {
      let regex =
        /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/;
      if (!regex.test(this.conditions.email)) {
        this.$message({
          message: "邮箱格式不正确，请重新输入",
          type: "error",
        });
        return;
      }
    },
  },
};
</script>

<style scoped>
</style>