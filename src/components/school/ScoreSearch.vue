<template>
  <div>
    <el-card>
      <!-- 条件筛选区域 -->
      <el-row :gutter="20" style="margin-top: 0; margin-bottom: 15px;">
        <el-col :span="9">
          <el-input
            placeholder="（可选项）例：60"
            v-model="conditions.minPrice"
            oninput="value=value.replace(/[^\d]/g,'')"
          >
            <template slot="prepend">最低成绩：</template>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-input
            placeholder="（可选项）例：100"
            v-model="conditions.maxPrice"
            oninput="value=value.replace(/[^\d]/g,'')"
          >
            <template slot="prepend">最高成绩：</template>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="searchAll()">筛选数据</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="searchValid()">查询入围</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="refresh()">刷新数据</el-button>
        </el-col>
      </el-row>

      <!-- 表格区域 -->
      <el-table
        :data="
          table.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        style="width: 100%; padding: 0px"
        ref="filterTableRef"
      >
        <el-table-column prop="examName" label="考生姓名" width="140" sortable>
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
        <el-table-column prop="writeDate" label="笔试时间" width="200" sortable>
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

      <el-pagination
        background
        layout="total, prev, pager, next"
        :page-size="pageSize"
        :total="dataCount"
        :current-page="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
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

      // #region 筛选条件
      conditions: {
        minScore: "",
        masScore: "",
      },
      //#endregion

      isFiltered: false,
    };
  },
  methods: {
    //#region 请求全部数据
    searchAll() {
      this.$http
        .get("?", {
          params: {
            minScore: "0",
            maxScore: "100",
          },
        })
        .then((result) => {
          // 响应消息
          console.log(result);
          let successMsg = { message: "查询成功！", type: "success" };
          let msg = result.data.msg;
          if (msg === "success") {
            // 将数据，数据数量赋值给表格，待定返回数据类型
            this.table = result.data;
            this.dataCount = result.data;
            this.currentPage = 1;
            this.$message(successMsg);
            this.isFiltered = false;
          } else {
            this.$message.error("查询失败！");
          }
        });
    },
    //#endregion

    //#region 请求入围数据
    searchValid() {
      this.$http
        .get("?", {
          //#region 请求参数
          params: {
            minScore: "60",
            maxScore: "100",
          },
          //#endregion
        })
        .then((result) => {
          // 响应消息
          console.log(result);
          let successMsg = { message: "查询成功！", type: "success" };
          let msg = result.data.msg;
          if (msg === "success") {
            // 将数据，数据数量赋值给表格
            this.table = result.data;
            this.dataCount = result.data;
            this.currentPage = 1;
            this.$message(successMsg);
            this.isFiltered = true;
          } else {
            this.$message.error("查询失败！");
          }
        });
    },
    //#endregion

    //#region 刷新数据
    refresh() {
      if (this.isFiltered) {
        this.methods.searchValid();
      } else {
        this.methods.searchAll();
      }
    },
    //#endregion

    //#region 处理点击前后分页的事件
    prevClick(page) {
      console.log(page);
    },
    nextClick(page) {
      console.log(page);
    },
    //#endregion

    //#region 处理页面容量与现页面的变化事件
    handleSizeChange(value) {
      this.pageSize = value;
      this.currentPage = 1;
    },
    handleCurrentChange(value) {
      this.currentPage = value;
    },
    //#endregion

    //#region 生命周期函数
    beforeMount() {
      console.log("mounted");
      this.$http
        .get("?", {
          params: {
            msg: "请求全部数据",
          },
        })
        .then((result) => {
          this.table = result.data;
          this.dataCount = result.data;
          this.currentPage = 1;
          this.$message({ message: "初始化成功！", type: "success" });
        });
    },
    //#endregion
  },
};
</script>


<style>
.el-card__body {
  padding: 10px;
}
</style>