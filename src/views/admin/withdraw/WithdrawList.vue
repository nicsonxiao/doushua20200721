<template>
  <div>
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户ID">
        <el-input
          v-model="ruleForm.user_id"
          placeholder="用户ID"
          @input="oninputUser_id"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="状态" prop="type">
        <el-select v-model="ruleForm.status" placeholder="请选择查询状态">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间段" prop="date">
        <el-date-picker
          v-model="ruleForm.date"
          type="daterange"
          align="right"
          unlink-panels
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          :picker-options="pickerOptions"
          value-format="timestamp"
        ></el-date-picker>
        <el-button @click="onlookUp('ruleForm')">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%" stripe>
      <el-table-column type="index" label="序号" width="150"> </el-table-column>
      <el-table-column prop="user_id" label="用户ID"></el-table-column>
      <el-table-column label="提现金额">
        <template slot-scope="scope">
          {{ (scope.row.amount / 10000).toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column label="申请时间">
        <template slot-scope="scope">
          {{ scope.row.create_time.formatDate("yMdhms", "-") }}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{ statusList[scope.row.status].name }}
        </template>
      </el-table-column>
      <el-table-column label="处理人">
        <template slot-scope="scope">
          {{ scope.row.payer_id ? scope.row.payer_id : "" }}
        </template>
      </el-table-column>
      <el-table-column label="已支付时间">
        <template slot-scope="scope">
          {{
            scope.row.payer_id
              ? scope.row.update_time.formatDate("yMdhms", "-")
              : ""
          }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-link
            v-if="scope.row.status === 1"
            type="primary"
            :href="'/admin/withdraw/read?id=' + scope.row.id"
            target="_blank"
            >提现</el-link
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-sizes="pageSizes"
      :page-size="page_size"
      layout="sizes, prev, pager, next"
      :total="1000"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        user_id: "",
        date: "",
        status: 1
      },
      rules: {},
      statusList: {
        0: {
          name: "全部",
          value: 0
        },
        1: {
          name: "申请",
          value: 1
        },
        2: {
          name: "已支付",
          value: 2
        },
        3: {
          name: "拒绝",
          value: 3
        }
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      page: 1,
      page_size: 50,
      pageSizes: [50, 100, 150, 200],
      tableData: []
    };
  },

  mounted() {
    let dataObj = this.initData();
    this.getWithdrawList(dataObj);
  },

  methods: {
    //初始化请求参数
    initData() {
      var dataObj = {
        user_id: this.ruleForm.user_id == "" ? 0 : this.ruleForm.user_id,
        begin_date:
          this.ruleForm.date === ""
            ? 0
            : (this.ruleForm.date[0] / 1000).toFixed(0),
        end_date:
          this.ruleForm.date === ""
            ? 0
            : (this.ruleForm.date[1] / 1000).toFixed(0),
        status: this.ruleForm.status == "" ? 0 : this.ruleForm.status,
        page: this.page,
        page_size: this.page_size
      };
      return dataObj;
    },

    //获取数据
    async getWithdrawList(data) {
      let res = await this.$api.admin.withdraw.list(data);
      // console.log(res);
      if (res.code === 0) {
        this.tableData = res.data;
      }
    },

    //查询
    onlookUp(data) {
      let _this = this;
      _this.$refs[data].validate(valid => {
        if (valid) {
          var dataObj = this.initData();
          _this.getWithdrawList(dataObj);
        } else {
          return false;
        }
      });
    },

    oninputUser_id(e) {
      this.ruleForm.user_id = e.trim();
      if (e === "" && this.ruleForm.user_id == "") {
        this.ruleForm.user_id = "";
      }
    },

    //页数变化
    handleSizeChange(e) {
      this.page_size = e;
      var dataObj = this.initData();
      this.getWithdrawList(dataObj);
    },
    //当前页码变化
    handleCurrentChange(e) {
      this.page = e;
      var dataObj = this.initData();
      this.getWithdrawList(dataObj);
    }
  }
};
</script>
