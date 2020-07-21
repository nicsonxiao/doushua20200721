<template>
  <div>
    <div class="dailyTitle">任务列表</div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      stripe
    >
      <el-table-column prop="machine_id" label="机器ID" >
        <template slot-scope="scope"
          ><el-link type="primary"  :href="'/admin/taskmachine/listbymachine?id='+scope.row.machine_id" target="_blank">{{
            scope.row.machine_id
          }}</el-link></template
        ></el-table-column
      >

      <el-table-column
        prop="tu_id"
        label="任务ID"
        
      >
      <template slot-scope="scope"
          ><el-link type="primary" :href="'/admin/taskmachine/listbytask?tu_id='+scope.row.tu_id" target="_blank">{{
            scope.row.tu_id
          }}</el-link></template
        ></el-table-column>
      <el-table-column prop="type" label="任务" >
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
      <el-table-column prop="create_time" label="接单时间" >
        <template slot-scope="scope">{{
          scope.row.create_time.formatDate("yMdhms", "-")
        }}</template>
      </el-table-column>
      <el-table-column prop="update_time" label="完成时间" >
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
    this.list();
  },
  methods: {
    //获取所有机器做任务情况
    list() {
      this.$api.admin.taskmachine
        .list({
          page: this.page,
          page_size: this.page_size
        })
        .then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.tableData = res.data;
          }
        });
    },
    //页数变化
    handleSizeChange(e) {
      this.page_size = e;
      this.list({
        page: this.page,
        page_size: this.page_size
      });
    },
    //当前页码变化
    handleCurrentChange(e) {
      this.page = e;
      this.list({
        page: this.page,
        page_size: this.page_size
      });
    }
  }
};
</script>

<style lang="less" scoped>
.dailyTitle {
  line-height: 40px;
  font-size: 14px;
  margin-left: 100px;
  margin-bottom: 22px;
}
</style>
