<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item>机器列表</el-form-item>
      <el-form-item label="代理" prop="agent_id">
        <el-select
          v-model="ruleForm.agent_id"
          placeholder="请选择代理"
          @change="onChangAgent"
        >
          <el-option
            v-for="item in agentArr"
            :key="item.id"
            :label="item.id + ' ' + item.nickname"
            :value="item.id"
          ></el-option>
          <!-- <el-option label="801" value="801"></el-option>
          <el-option label="802" value="802"></el-option>-->
        </el-select>
      </el-form-item>
      <el-form-item label="机主" prop="user_id">
        <el-select v-model="ruleForm.user_id" placeholder="请选择机主">
          <el-option
            v-for="item in userArr"
            :key="item.id"
            :label="item.id + ' ' + item.nickname"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间段">
        <el-date-picker
          v-model="ruleForm.create_time"
          type="daterange"
          align="right"
          unlink-panels
          start-placeholder="创建开始日期"
          end-placeholder="创建结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="更新时间段">
        <el-date-picker
          v-model="ruleForm.update_time"
          type="daterange"
          align="right"
          unlink-panels
          start-placeholder="更新开始日期"
          end-placeholder="更新结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
        <el-button @click="lookUp('ruleForm')">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 100%" stripe>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="agent_id" label="机主"></el-table-column>
      <el-table-column prop="user_login" label="账号"></el-table-column>
      <el-table-column prop="balanceStr" label="余额">
        <template slot-scope="scope">
          {{ (scope.row.balance / 10000).toFixed(2) }}
        </template>
      </el-table-column>
      
      <el-table-column label="累计金额">
        <template slot-scope="scope">
          {{ (scope.row.total_balance / 10000).toFixed(2) }}
        </template>
      </el-table-column>

       <el-table-column prop="total_taskdone" label="完成任务数">
      </el-table-column>

      <el-table-column prop="total_task" label="总任务数">
      </el-table-column>

      
      <el-table-column label="成功率">
        <template slot-scope="scope">
          <span v-if="scope.row.total_task">{{ (scope.row.total_taskdone / scope.row.total_task).toFixed(2)}}%</span>
        </template>
      </el-table-column>

      <el-table-column label="有效时间">
        <template slot-scope="scope">
          {{
            scope.row.expire ? scope.row.expire.formatDate("yMdhms", "-") : ""
          }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{
            scope.row.create_time
              ? scope.row.create_time.formatDate("yMdhms", "-")
              : ""
          }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间">
        <template slot-scope="scope">
          {{
            scope.row.update_time
              ? scope.row.update_time.formatDate("yMdhms", "-")
              : ""
          }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-link type="primary"  :href="'/admin/taskmachine/listbymachine?id='+scope.row.id" target="_blank">查看接单</el-link>
          <el-link type="primary" :href="'/admin/taskcounter/listbymachine?id='+scope.row.id" target="_blank">查看日志</el-link>
          <el-link type="primary" :href="'/admin/account/balancelogs?id='+scope.row.id" target="_blank">查看流水</el-link>
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
        agent_id: "",
        // user_type: 3,
        create_time: "",
        update_time: ""
      },
      rules: {
        user_id: [{ required: true, message: "请选择机主", trigger: "change" }],
        agent_id: [{ required: true, message: "请选择代理", trigger: "change" }]
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
      tableData: [],
      page_size: 10,
      page: 1,
      pageSizes: [10, 20, 30, 40],
      create_time_begin: 0,
      create_time_end: 0,
      update_time_begin: 0,
      update_time_end: 0,
      agentArr: [],
      userArr: []
    };
  },
  mounted() {
    this.getAgentList();
    if(this.$route.query.id){
      this.$api.admin.agent.read({id:this.$route.query.id}).then(res=>{
        // console.log(res);
        if(res.code===0){
          this.ruleForm.agent_id = res.data.agent_id;
          this.onChangAgent(this.ruleForm.agent_id);
          this.ruleForm.user_id = +this.$route.query.id;
          let listData = this.initData();
          this.getList(listData); 
        }
      })
    }
  },
  methods: {
    //查询按钮
    lookUp(data) {
      var _this = this;
      // console.log(data);
      _this.$refs[data].validate(valid => {
        if (valid) {
          // console.log(valid);
          if (
            this.ruleForm.create_time &&
            this.ruleForm.create_time.length !== 0
          ) {
            this.create_time_begin =
              this.ruleForm.create_time[0].getTime() / 1000;
            this.create_time_end =
              this.ruleForm.create_time[1].getTime() / 1000;
          }
          if (
            this.ruleForm.update_time &&
            this.ruleForm.update_time.length !== 0
          ) {
            this.update_time_begin =
              this.ruleForm.update_time[0].getTime() / 1000;
            this.update_time_end =
              this.ruleForm.update_time[1].getTime() / 1000;
          }
          let listData = this.initData();
          this.getList(listData);
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },

    //加载代理项
    getAgentList() {
      let dataObj = {
        page: 1,
        page_size: 1000
      };
      this.$api.admin.agent.list(dataObj).then(res => {
        // console.log(res);
        if (res.code === 0) {
          this.agentArr = res.data;
        }
      });
    },

    //获取当前页码的表格数据
    getList(data) {
      this.$api.admin.machine.list(data).then(res => {
        if (res.code == 0) {
          this.tableData = res.data;
        }
      });
    },

    //初始化请求参数
    initData() {
      let listData = {
        user_id: this.ruleForm.user_id,
        agent_id: this.ruleForm.agent_id,
        // user_type: this.ruleForm.user_type,
        create_time_begin: this.create_time_begin
          ? this.create_time_begin.toFixed(0)
          : 0,
        create_time_end: this.create_time_end
          ? this.create_time_end.toFixed(0)
          : 0,
        update_time_begin: this.update_time_begin
          ? this.update_time_begin.toFixed(0)
          : 0,
        update_time_end: this.update_time_end
          ? this.update_time_end.toFixed(0)
          : 0,
        page: this.page,
        page_size: this.page_size
      };
      return listData;
    },

    onChangAgent(e) {
      let acountsObj = {
        agent_id: e,
        page: 1,
        page_size: 1000
      };
      this.$api.admin.agent.accounts(acountsObj).then(res => {
        if (res.code === 0) {
          this.userArr = res.data;
          if(this.$route.query.id){
            this.ruleForm.user_id = +this.$route.query.id;
          }else{
            this.ruleForm.user_id = "";
          }
        }
      });
    },

    //页数变化
    handleSizeChange(e) {
      if (this.ruleForm.agent_id) {
        this.page_size = e;
        let listData = this.initData();
        this.getList(listData);
      }
    },
    //当前页码变化
    handleCurrentChange(e) {
      if (this.ruleForm.agent_id) {
        this.page = e;
        let listData = this.initData();
        this.getList(listData);
      }
    }
  }
};
</script>
