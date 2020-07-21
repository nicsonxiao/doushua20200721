<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item>任务列表</el-form-item>
      <el-form-item label="机主" prop="user_id">
        <el-select v-model="ruleForm.user_id" placeholder="请选择机主">
          <el-option
            v-for="item in userArr"
            :key="item.id"
            :label="item.id + ' ' + item.nickname"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-button @click="lookUp('ruleForm')">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%" stripe>
      <el-table-column prop="machine_id" label="机器ID">
        <template slot-scope="scope"
          ><el-link
            type="primary"
            :href="
              '/agent/taskmachine/listbymachine?machine_id=' +
                scope.row.machine_id
            "
            target="_blank"
            >{{ scope.row.machine_id }}</el-link
          ></template
        ></el-table-column
      >

      <el-table-column prop="tu_id" label="任务ID">
        <template slot-scope="scope"
          ><el-link
            type="primary"
            :href="'/agent/taskmachine/listbytask?tu_id=' + scope.row.tu_id"
            target="_blank"
            >{{ scope.row.tu_id }}</el-link
          ></template
        ></el-table-column
      >
      <el-table-column prop="type" label="任务">
        <template slot-scope="scope">{{
          scope.row.type === 1 ? "关注" : "点赞"
        }}</template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <div :style="'color:' + statusObj[scope.row.status].color">
            {{ statusObj[scope.row.status].value }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="接单时间">
        <template slot-scope="scope">{{
          scope.row.create_time.formatDate("yMdhms", "-")
        }}</template>
      </el-table-column>
      <el-table-column prop="update_time" label="完成时间">
        <template slot-scope="scope">{{
          scope.row.update_time.formatDate("yMdhms", "-")
        }}</template>
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
      ruleForm: {},
      rules: {
        user_id: [{ required: true, message: "请选择机主", trigger: "change" }]
      },
      userArr: [],
      page: 1,
      page_size: 10,
      pageSizes: [10, 20, 30, 40],
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
    this.getUserList();
  },
  methods: {
    //加载机主项
    getUserList() {
      let dataObj = {
        page: 1,
        page_size: 1000
      };
      this.$api.agent.agent.accounts(dataObj).then(res => {
        if (res.code === 0) {
          this.userArr = res.data;
        }
      });
    },

    //查询按钮
    lookUp(data) {
      var _this = this;
      _this.$refs[data].validate(valid => {
        if (valid) {
          let requestData = this.initData();
          this.getTasklist(requestData);
        } else {
          return false;
        }
      });
    },

    //初始化请求参数
    initData() {
      let requestData = {
        user_id: this.ruleForm.user_id,
        page: this.page,
        page_size: this.page_size
      };
      return requestData;
    },

    //获取所有机器做任务情况
    async getTasklist(requestData) {
      let res = await this.$api.agent.taskmachine.list(requestData);

      if (res.code === 0) {
        this.tableData = res.data;
      }
    },
    //页数变化
    handleSizeChange(e) {
      this.page_size = e;
      let requestData = this.initData();
      this.getTasklist(requestData);
    },
    //当前页码变化
    handleCurrentChange(e) {
      this.page = e;
      let requestData = this.initData();
      this.getTasklist(requestData);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
