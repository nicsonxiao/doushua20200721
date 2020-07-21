<template>
  <div>
      <!-- <h3>机主列表</h3> -->
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item>机主列表</el-form-item>
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
        <el-button @click="lookUp('ruleForm')">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" max-height="500" border style="width: 100%" stripe>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="user_login" label="登录账号"></el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称"
      ></el-table-column>
      <el-table-column prop="mobile" label="手机号" >
      </el-table-column>
      <el-table-column prop="alipay_acc" label="支付宝" >
      </el-table-column>
      <el-table-column prop="alipay_name" label="支付宝名称">
      </el-table-column>
      <el-table-column label="余额">
        <template slot-scope="scope">
          {{(scope.row.balance / 10000).toFixed(2)}}
          <el-link type="success">提现</el-link>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="180">
        <template slot-scope="scope">{{scope.row.create_time.formatDate("yMdhms","-")}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
            <el-link type="primary" :href="'/admin/agent/read?id='+scope.row.id" target="_blank">编辑资料</el-link>
            <el-link type="primary" :href="'/admin/machine/list?id='+scope.row.id" target="_blank">查看机器</el-link>
          <!-- <el-button
            type="text"
            size="small"
            @click="onlookWithUserId(scope.row.id)"
            >查看机器</el-button
          > -->
          <!-- <el-button
            type="text"
            size="small"
            @click="onlookUserWithId(scope.row.id)"
            >查看任务</el-button
          > -->
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
      tableData: [],
      page_size: 10,
      page: 1,
      pageSizes: [10, 20, 30, 40],
      agentArr: []
    };
  },
  mounted() {
    this.getAgentList();
    if(this.$route.query.id){
      this.ruleForm.agent_id = this.$route.query.id;
    this.getAccountListWithId(this.ruleForm.agent_id);
    }

  },
  methods: {
    //查询按钮
    lookUp(data) {
      var _this = this;
      _this.$refs[data].validate(valid => {
        if (valid) {
          let acountsObj = this.initData();
          this.getAccountList(acountsObj);
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
        if (res.code === 0) {
          this.agentArr = res.data;
        }
      });
    },

    //切换代理id
    onChangAgent(e) {
        // console.log('onChangAgent', e);
      this.ruleForm.agent_id = e;
    },

    //初始化请求参数
    initData() {
      let acountsObj = {
        agent_id: +this.ruleForm.agent_id,
        page: this.page,
        page_size: this.page_size
      };
      return acountsObj;
    },

    //根据代理id获取机主信息
    getAccountListWithId(id) {
      this.ruleForm.agent_id = +id;
      let acountsObj = this.initData();
      this.getAccountList(acountsObj);
    },

    //根据当前参数获取信息
    getAccountList(data) {
      this.$api.admin.agent.accounts(data).then(res => {
        if (res.code === 0) {
          this.tableData = res.data;
        }
      });
    },

    //根据机主id查看信息
    onlookWithUserId(id) {
      let routeUrl = this.$router.resolve({
        path: "/admin/agent/read",
        query: { id }
      });
      window.open(routeUrl.href, "_blank");
    },

    //页数变化
    handleSizeChange(e) {
      if (this.ruleForm.agent_id) {
        this.page_size = e;
        let acountsObj = this.initData();
        this.getAccountList(acountsObj);
      }
    },
    //当前页码变化
    handleCurrentChange(e) {
      if (this.ruleForm.agent_id) {
        this.page = e;
        let acountsObj = this.initData();
        this.getAccountList(acountsObj);
      }
    }
  }
};
</script>
