<template>
  <div>
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="抖音ID" prop="status">
        <el-input v-model="ruleForm.dy_id" placeholder="抖音ID"> </el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择类型">
          <el-option label="点赞" value="2"></el-option>
          <el-option label="关注" value="1"></el-option>
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
      <el-table-column prop="id" label="任务ID"> </el-table-column>
      <el-table-column label="抖音ID" width="160">
        <template slot-scope="scope">
          <el-link
            type="primary"
            :href="'/admin/taskuser/list?dy_id=' + scope.row.dy_id"
            target="_blank"
            >{{ scope.row.dy_id }}</el-link
          >
        </template>
      </el-table-column>
      <el-table-column prop="nickname" label="抖音昵称"> </el-table-column>
      <el-table-column prop="price" label="费用">
        <template slot-scope="scope"> {{ scope.row.price / 10000 }}元</template>
      </el-table-column>
      <el-table-column label="任务类型">
        <template slot-scope="scope">
          {{ typedata[scope.row.type].value }}
        </template>
      </el-table-column>
      <el-table-column prop="count" label="任务数量"></el-table-column>
      <el-table-column prop="get_times" label="接单次数"> </el-table-column>
      <el-table-column prop="done" label="已完成"> </el-table-column>
      <el-table-column label="成功率">
        <template slot-scope="scope">
          {{
            ((scope.row.done / scope.row.get_times) * 100).toFixed(2)
          }}%</template
        >
      </el-table-column>
      <el-table-column prop="done" label="完成进度">
        <template slot-scope="scope">
          {{ ((scope.row.done / scope.row.count) * 100).toFixed(2) }}%</template
        >
      </el-table-column>
      
      <el-table-column prop="order_id" label="订单号"></el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.paystatus===0" :style="'color:'+paystatusData[scope.row.paystatus].color">{{paystatusData[scope.row.paystatus].value}}</span>
          <span v-else-if="scope.row.paystatus===2" :style="'color:'+paystatusData[scope.row.paystatus].color">{{paystatusData[scope.row.paystatus].value}}</span>
 
          <span v-else>{{ scope.row.done > scope.row.count ? "已" : "未" }}完成</span>
        </template>
      </el-table-column>
      
      <el-table-column label="支付方式">
        <template slot-scope="scope">
          <span v-if="scope.row.pay!==0">{{payMethods[scope.row.pay]}}</span>
        </template>
      </el-table-column>

      
      <el-table-column prop="trade_no" label="支付平台订单号"></el-table-column>

      <el-table-column label="下单时间" width="160">
        <template slot-scope="scope">
          {{ scope.row.create_time.formatDate("yMdhms", "-") }}</template
        >
      </el-table-column>
      <el-table-column label="最近接单时间" width="160">
        <template slot-scope="scope">
          {{ scope.row.update_time.formatDate("yMdhms", "-") }}</template
        >
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-link
            :href="'/admin/taskmachine/listbytask?tu_id=' + scope.row.id"
            target="_blank"
            type="primary"
            >接单情况</el-link
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
        dy_id: "",
        date: "",
        type: ""
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
      typedata: {
        1: {
          value: "关注"
        },
        2: {
          value: "点赞"
        }
      },
      payMethods:{
        1:"微信",
        2:"支付宝",
        3:"QQ钱包",
        4:"财付通"
      },
      paystatusData:{
        0:{
          value:"未支付",
          color:'red'
          },
        1:{
          value:"已支付",
          color:""
          },
        2:{
          value:"支付异常",
          color:""
          },
        3:{
          value:"无需支付",
          color:""
        }
      },
    };
  },
  mounted() {
    if (this.$route.query.dy_id) {
      this.ruleForm.dy_id = this.$route.query.dy_id;
    }
    let dataObj = this.initData();
    this.getlistbylist(dataObj);
  },
  methods: {
    //初始化请求参数
    initData() {
      var dataObj = {
        dy_id: this.ruleForm.dy_id == "" ? 0 : this.ruleForm.dy_id,
        begin_date: this.ruleForm.date
          ? (this.ruleForm.date[0] / 1000).toFixed(0)
          : 0,
        end_date: this.ruleForm.date
          ? (this.ruleForm.date[1] / 1000).toFixed(0)
          : 0,
        type: this.ruleForm.type == "" ? 0 : this.ruleForm.type,
        page: this.page,
        page_size: this.page_size
      };
      return dataObj;
    },

    //获取数据
    async getlistbylist(data) {
      let res = await this.$api.admin.taskuser.list(data);
      if (res.code === 0) {
        this.$message({
          message: "查询成功",
          type: "success"
        });
        this.tableData = res.data;
      }
    },

    //查询
    onlookUp(data) {
      let _this = this;
      _this.$refs[data].validate(valid => {
        if (valid) {
          var dataObj = this.initData();
          _this.getlistbylist(dataObj);
        } else {
          return false;
        }
      });
    },
    oninputdy_id(e) {
      this.ruleForm.dy_id = e.trim();
      if (e === "") {
        this.ruleForm.dy_id = 0;
      }
    },

    //页数变化
    handleSizeChange(e) {
      this.page_size = e;
      var dataObj = this.initData();
      this.getlistbylist(dataObj);
    },
    //当前页码变化
    handleCurrentChange(e) {
      this.page = e;
      var dataObj = this.initData();
      this.getlistbylist(dataObj);
    }
  }
};
</script>
