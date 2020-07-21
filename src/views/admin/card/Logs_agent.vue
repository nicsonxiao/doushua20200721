<template>
  <div>
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item>代理充值记录</el-form-item>
      <el-form-item label="代理">
        <el-select
          :value="ruleForm.agent_id"
          placeholder="请选择代理"
          @change="onChangAgent"
        >
          <!-- <el-option label="请选择代理" :value="0"></el-option> -->
          <el-option
            v-for="item in agentArr"
            :key="item.id"
            :label="item.id + ' ' + item.nickname"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-button @click="onlookUp('ruleForm')">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="序号" width="180"></el-table-column>
      <el-table-column prop="user_id" label="id" width="180"></el-table-column>
      <el-table-column prop="card_type" label="卡类型">
        <template slot-scope="scope">{{card_type[scope.row.card_type] }}</template>
      </el-table-column>
      <el-table-column prop="change" label="变更数量"> </el-table-column>
      <el-table-column prop="balance" label="余额"> </el-table-column>
      <el-table-column label="发卡时间">
        <template slot-scope="scope">
          {{ scope.row.create_time.formatDate("yMdhms", "-") }}
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
        agent_id: ""
      },
      agentArr: [],
      tableData: [],
      page: 0,
      page_size: 10,
      pageSizes: [10, 20, 30, 40],
      card_type:{
        1:"日卡",
        2:"月卡",
        3:"季卡"
      }
    };
  },
  async mounted() {
    await this.getAgentList();

    if(this.$route.query.agent_id){
      this.ruleForm.agent_id = this.$route.query.agent_id;
      this.getLogsListWithId(this.ruleForm.agent_id);
    }
  },
  methods: {
    //获取代理列表
    async getAgentList() {
      let dataObj = {
        page: 1,
        page_size: 1000
      };
      let res = await this.$api.admin.agent.list(dataObj);
      if (res.code === 0) {
        this.agentArr = res.data;
      }
    },

    //根据代理id获取机主信息
    getLogsListWithId(id) {
      this.ruleForm.agent_id = +id;
      let logsObj = this.initData();
      this.getLogsList(logsObj);
    },

    onlookUp(data) {
      var _this = this;
      _this.$refs[data].validate(valid => {
        if (valid) {
          let logsObj = _this.initData();
          _this.getLogsList(logsObj);
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },

    //初始化请求参数
    initData() {
      let logsObj = {
        editor_id: +this.ruleForm.agent_id,
        page: this.page,
        page_size: this.page_size
      };
      return logsObj;
    },

    //根据当前参数获取信息
    async getLogsList(data) {
      let res = await this.$api.admin.card.logs(data);
      if (res.code === 0) {
        this.tableData = res.data;
      }
    },

    //切换代理id
    onChangAgent(e) {
      // console.log("onChangAgent", e);
      this.ruleForm.agent_id = e;
    },

    //页数变化
    handleSizeChange(e) {
        this.page_size = e;
        let logsObj = this.initData();
        this.getLogsList(logsObj);
    },
    //当前页码变化
    handleCurrentChange(e) {
        this.page = e;
        let logsObj = this.initData();
        this.getLogsList(logsObj);
    }
  }
};
</script>
