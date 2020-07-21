<template>
  <div>
    <!-- <h3>机主列表</h3> -->
    <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item>机主列表</el-form-item>
    </el-form>

    <el-table
      :data="userArr"
      max-height="500"
      border
      style="width: 100%"
      stripe
    >
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="user_login" label="登录账号"></el-table-column>
      <el-table-column prop="nickname" label="昵称"></el-table-column>
      <el-table-column prop="mobile" label="手机号"> </el-table-column>
      <el-table-column prop="alipay_acc" label="支付宝"> </el-table-column>
      <el-table-column prop="alipay_name" label="支付宝名称"> </el-table-column>
      <el-table-column label="余额">
        <template slot-scope="scope">
          {{ (scope.row.balance / 10000).toFixed(2) }}
          <el-link type="success">提现</el-link>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="180">
        <template slot-scope="scope">{{
          scope.row.create_time.formatDate("yMdhms", "-")
        }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-link
            type="primary"
            :href="'/agent/agent/read?id=' + scope.row.id"
            target="_blank"
            >编辑资料</el-link
          >
          <el-link
            type="primary"
            :href="'/agent/machine/list?id=' + scope.row.id"
            target="_blank"
            >查看机器</el-link
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userArr: []
    };
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    //加载机主项
    async getUserList() {
      let dataObj = {
        page: 1,
        page_size: 1000
      };
      let res = await this.$api.agent.agent.accounts(dataObj);
      if (res.code === 0) {
        this.userArr = res.data;
      }
    },

    //根据机主id查看信息
    onlookWithUserId(id) {
      let routeUrl = this.$router.resolve({
        path: "/agent/agent/read",
        query: { id }
      });
      window.open(routeUrl.href, "_blank");
    }

    //页数变化
    // handleSizeChange(e) {
    //   if (this.ruleForm.agent_id) {
    //     this.page_size = e;
    //     let acountsObj = this.initData();
    //     this.getAccountList(acountsObj);
    //   }
    // },
    //当前页码变化
    // handleCurrentChange(e) {
    //   if (this.ruleForm.agent_id) {
    //     this.page = e;
    //     let acountsObj = this.initData();
    //     this.getAccountList(acountsObj);
    //   }
    // }
  }
};
</script>
