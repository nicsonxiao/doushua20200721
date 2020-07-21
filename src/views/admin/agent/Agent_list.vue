<template>
  <div>
    <div class="dailyTitle">代理列表</div>
    <el-table :data="tableData" border style="width: 100%" stripe>
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
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <!-- <el-button
            @click="onlookAgentId(scope.row.id)"
            type="text"
            size="small"
            >查看</el-button
          > -->
          
          <el-link type="primary" :href="'/admin/agent/read?id='+scope.row.id" target="_blank">查看</el-link>
          <el-link type="primary" :href="'/admin/agent/accounts?id='+scope.row.id" target="_blank">查看机主</el-link>
          <!-- <el-button
            @click="onlookUserWithId(scope.row.id)"
            type="text"
            size="small"
            >查看机主</el-button
          > -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      page: 0,
      page_size: 0
    };
  },
  mounted() {
    this.getAgentList();
  },
  methods: {
    //获取代理列表
    getAgentList() {
      let dataObj = {
        page:this.page,
        page_size:this.page_size
      };
      this.$api.admin.agent.list(dataObj).then(res => {
        // console.log(res);
        if (res.code === 0) {
          this.tableData = res.data;
        }
      });
    },

    //根据代理id查看信息
    // onlookAgentId(id) {
    //   let routeUrl = this.$router.resolve({
    //     path: "/admin/agent/read",
    //     query: { id }
    //   });
    //   window.open(routeUrl.href, "_blank");
    // },

    // //根据代理id查看机主
    // onlookUserWithId(id) {
    //   let routeUrl = this.$router.resolve({
    //     path: "/admin/agent/accounts",
    //     query: { id }
    //   });
    //   window.open(routeUrl.href, "_blank");
    // }
  }
};
</script>

<style lang="less" scoped>
</style>
