<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="机器ID" prop="machine_id">
        <el-input v-model="ruleForm.machine_id" @change="oninputMachine_id">
        </el-input>
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

    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :default-sort="{ prop: 'id', order: 'descending' }"
      stripe
    >
      <el-table-column type="index" label="序号" width="180"></el-table-column>

      <el-table-column
        prop="tu_id"
        label="任务ID"
        sortable
        width="180"
      >
      <template slot-scope="scope"
          ><el-link type="primary" :href="'/admin/taskmachine/listbytask?tu_id='+scope.row.tu_id" target="_blank">{{
            scope.row.tu_id
          }}</el-link></template
        ></el-table-column>
      <el-table-column prop="type" label="任务">
        <template slot-scope="scope">{{
          scope.row.type === 1 ? "关注" : "点赞"
        }}</template>
      </el-table-column>
      <el-table-column prop="create_time" label="接单时间">
        <template slot-scope="scope">{{
          scope.row.create_time.formatDate("yMdhms", "-")
        }}</template>
      </el-table-column>
      <el-table-column prop="update_time" label="完成时间">
        <template slot-scope="scope">
          {{scope.row.update_time > scope.row.create_time?scope.row.update_time.formatDate("yMdhms", "-"):""}}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <div :style="'color:' + statusObj[scope.row.status].color">
            {{ statusObj[scope.row.status].value }}
          </div>
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
        machine_id: "",
        date: ""
      },
      rules: {
        machine_id: [
          { required: true, message: "请输入机器ID", trigger: "change" }
        ],
        date: [{ required: true, message: "请选择日期", trigger: "change" }]
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
      tableData: [],
      // 状态0已接单1完成2正常失败3异常失败
      statusObj: {
        0: {
          color: "",
          value: "已接单"
        },
        1: {
          color: "#0080008f",
          value: "完成"
        },
        2: {
          color: "#f19864",
          value: "正常失败"
        },
        3: {
          color: "red",
          value: "异常失败"
        }
      }
    };
  },
  mounted() {
    // this.ruleForm.machine_id = this.$route.query.machine_id;
    if(this.$route.query.id){
        this.ruleForm.machine_id = this.$route.query.id;
        this.ruleForm.date = this.initWeek();
        var dataObj = this.initData();
        this.getlistbymachine(dataObj);
    }
  },
  methods: {
      //默认最近一周
      initWeek(){
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
         return [start, end];
      },

    //初始化请求参数
    initData() {
      var dataObj = {
        machine_id: this.ruleForm.machine_id,
        begin_date: (this.ruleForm.date[0] / 1000).toFixed(0),
        end_date: (this.ruleForm.date[1] / 1000).toFixed(0),
        page: this.page,
        page_size: this.page_size
      };
      return dataObj;
    },

    //id输入框
    oninputMachine_id(e) {
      this.ruleForm.machine_id = e.trim();
    },

    //查询
    onlookUp(data) {
      let _this = this;
      _this.$refs[data].validate(valid => {
        if (valid) {
          this.page = 1;
          var dataObj = this.initData();
          _this.getlistbymachine(dataObj);
        } else {
        //   console.log("error submit!!");
          return false;
        }
      });
    },
    //获取数据
    getlistbymachine(data) {
      this.$api.admin.taskmachine.listbymachine(data).then(res => {
        // console.log(res);
        if (res.code === 0) {
          this.tableData = res.data;
        }
      });
    },
    //页数变化
    handleSizeChange(e) {
      this.page_size = e;

      var dataObj = this.initData();
      this.getlistbymachine(dataObj);
    },
    //当前页码变化
    handleCurrentChange(e) {
      this.page = e;
      var dataObj = this.initData();
      this.getlistbymachine(dataObj);
    }
  }
};
</script>
