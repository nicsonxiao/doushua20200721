<template>
  <div>
    <el-form
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item>卡充值记录</el-form-item>
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
      tableData: [],
      page: 0,
      page_size: 1000,
      pageSizes: [10, 20, 30, 40],
      card_type:{
        1:"日卡",
        2:"月卡",
        3:"季卡"
      }
    };
  },
  async mounted() {
    let logsObj = this.initData();
    this.getLogsList(logsObj);
  },
  methods: {

    //初始化请求参数
    initData() {
      let logsObj = {
        page: this.page,
        page_size: this.page_size
      };
      return logsObj;
    },

    //根据当前参数获取信息
    async getLogsList(data) {
      let res = await this.$api.agent.card.logsbyagent(data);
      if (res.code === 0) {
        this.tableData = res.data;
      }
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
