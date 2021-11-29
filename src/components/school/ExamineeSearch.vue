<template>
  <div>
    <el-card>
      <!-- 条件筛选区域 -->
      <!-- 第一行 -->
      <el-row :gutter="20" style="margin-top: 0px">
        <el-col :span="6">
          <el-input placeholder="例：张三" v-model="conditions.name">
            <template slot="prepend">考生姓名：</template>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-input
            placeholder="例：20-60"
            v-model="conditions.ageSec"
            oninput="value=value.replace(/[^\d-]/g,'')"
            :disabled="this.conditions.name != ''"
          >
            <template slot="prepend">年龄区间：</template>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-input
            placeholder="例：60-100"
            v-model="conditions.writeScoreSec"
            oninput="value=value.replace(/[^\d-]/g,'')"
            :disabled="this.conditions.name != ''"
          >
            <template slot="prepend">笔试成绩区间：</template>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-input
            placeholder="例：60-100"
            v-model="conditions.interviewScoreSec"
            oninput="value=value.replace(/[^\d-]/g,'')"
            :disabled="this.conditions.name != ''"
          >
            <template slot="prepend">面试成绩区间：</template>
          </el-input>
        </el-col>
      </el-row>

      <!-- 第二行 -->
      <el-row :gutter="20" style="margin-top: 15px; margin-bottom: 15px">
        <el-col :span="10">
          <el-input
            placeholder="例：60-100"
            v-model="conditions.performanceSec"
            oninput="value=value.replace(/[^\d-]/g,'')"
            :disabled="this.conditions.name != ''"
          >
            <template slot="prepend">综合成绩区间：</template>
          </el-input>
        </el-col>
        <el-col :span="7">
          <el-date-picker
            v-model="conditions.writeDateSec"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="笔试开始日期"
            end-placeholder="笔试结束日期"
            :picker-options="pickerOptions"
            format="yyyy / MM / dd"
            value-format="yyyy-MM-dd"
            :disabled="this.conditions.name != ''"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="7">
          <el-date-picker
            v-model="conditions.interviewDateSec"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="面试开始日期"
            end-placeholder="面试结束日期"
            :picker-options="pickerOptions"
            format="yyyy / MM / dd"
            value-format="yyyy-MM-dd"
            :disabled="this.conditions.name != ''"
          >
          </el-date-picker>
        </el-col>
      </el-row>

      <!-- 第三行 -->
      <el-row :gutter="20" style="margin-top: 15px; margin-bottom: 15px">
        <!-- 性别 -->
        <el-col :span="4">
          <el-select v-model="sexOptVal" placeholder="男/女">
            <el-option
              v-for="sex in sexOptions"
              :key="sex.sexOptVal"
              :label="sex.label"
              :value="sex.sexOptVal"
            >
            </el-option>
            <template slot="prefix">
              <i class="el-icon-user"></i>
            </template>
          </el-select>
        </el-col>

        <!-- 入围 -->
        <el-col :span="4">
          <el-select
            v-model="validOptVal"
            placeholder="是否入围"
            :disabled="this.conditions.name != ''"
          >
            <el-option
              v-for="valid in validOptions"
              :key="valid.validOptVal"
              :label="valid.label"
              :value="valid.validOptVal"
            >
            </el-option>
            <template slot="prefix">
              <!-- <i class="el-icon-user"></i> -->
            </template>
          </el-select>
        </el-col>

        <!-- 录取 -->
        <el-col :span="4">
          <el-select
            v-model="admitOptVal"
            placeholder="是否录取"
            :disabled="this.conditions.name != ''"
          >
            <el-option
              v-for="valid in admitOptions"
              :key="valid.admitOptVal"
              :label="valid.label"
              :value="valid.admitOptVal"
            >
            </el-option>
            <template slot="prefix">
              <!-- <i class="el-icon-user"></i> -->
            </template>
          </el-select>
        </el-col>

        <el-col :span="2">
          <el-button type="primary" @click="search()">查询考生</el-button>
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
        name: "",
        ageSec: "",
        writeScoreSec: "",
        interviewScoreSec: "",
        performanceSec: "",
        writeDateSec: "",
        interviewDateSec: "",
      },
      //#endregion

      // #region 性别选择
      sexOptions: [
        {
          sexOptVal: "male",
          label: "男",
        },
        {
          sexOptVal: "female",
          label: "女",
        },
      ],
      sexOptVal: "",
      //#endregion

      // #region 入围选择
      validOptions: [
        {
          validOptVal: "valid",
          label: "入围",
        },
        {
          validOptVal: "invalid",
          label: "未入围",
        },
      ],
      validOptVal: "",
      //#endregion

      // #region 录取选择
      admitOptions: [
        {
          admitOptVal: "valid",
          label: "录取",
        },
        {
          admitOptVal: "invalid",
          label: "不予录取",
        },
      ],
      admitOptVal: "",
      //#endregion

      // #region 日期选择器的快捷键配置
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      //#endregion

      isFiltered: false,
    };
  },
  methods: {
    //#region 请求全部数据
    search() {
      let age = this.getSplit(this.conditions.ageSec);
      let writeScore = this.getSplit(this.conditions.writeScoreSec);
      let interviewScore = this.getSplit(this.conditions.interviewScoreSec);
      let performance = this.getSplit(this.conditions.performanceSec);
      let writeDate = this.getSplit(this.conditions.writeDateSec);
      let interviewDate = this.getSplit(this.conditions.interviewDateSec);

      this.$http
        .get("?", {
          params: {
            name: this.conditions.name,
            minAge: age[0],
            maxAge: age[1],

            minWriteS: writeScore[0],
            maxWriteS: writeScore[1],

            minIvS: interviewScore[0],
            maxIvS: interviewScore[1],

            minP: performance[0],
            maxP: performance[1],

            minWriteD: writeDate[0],
            maxWriteD: writeDate[1],

            minIvD: interviewDate[0],
            maxIvD: interviewDate[1],
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
    getSplit(str) {
      if (str != null) {
        return str.split("-");
      }
      return ["", ""];
    },
    //#endregion

    //#region 刷新数据
    refresh() {
      this.methods.search();
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
.el-input__prefix {
  text-align: center;
  line-height: 40px;
}
</style>