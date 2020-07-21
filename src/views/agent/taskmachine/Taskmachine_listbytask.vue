<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      label-position="left"
    >
      <el-form-item label="任务ID" prop="task_id">
        <el-col :span="20">
          <el-input v-model="ruleForm.task_id" @change="oninputTask_id">
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button @click="onlookUp('ruleForm')">查询</el-button>
        </el-col>
      </el-form-item>
      <template v-if="TaskDetailObj">
        <el-row>
          <el-col :span="8">
            <el-form-item label="昵称">
              {{ TaskDetailObj.nickname }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="下单时间">
              {{ TaskDetailObj.create_time.formatDate("yMdhms", "-") }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="任务类型">
              {{typedata[TaskDetailObj.type].value}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="抖音id">
              {{ TaskDetailObj.dy_id }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="视频id">
              {{ TaskDetailObj.video_id }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="视频网址">
              <el-input readonly :value="TaskDetailObj.url"><el-button slot="append" @click="onJump">前往查看</el-button></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row>
          <el-col :span="8">
            <el-form-item label="任务数量">
              {{ TaskDetailObj.count }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="接单次数">
              {{ TaskDetailObj.get_times }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="已完成">
              {{ TaskDetailObj.done }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="成功率">
              {{(TaskDetailObj.done / TaskDetailObj.get_times*100).toFixed(2)}}%
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="完成进度">
              {{(TaskDetailObj.done / TaskDetailObj.count*100).toFixed(2)}}%
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态">
              {{TaskDetailObj.done > TaskDetailObj.count ?'已':'未'}}完成
            </el-form-item>
          </el-col>
        </el-row>
      </template>
    </el-form>

    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :default-sort="{ prop: 'id', order: 'descending' }"
      stripe
    >
      <el-table-column type="index" label="序号" width="180"> </el-table-column>
      <el-table-column prop="machine_id" label="机器ID" sortable width="180">
        <template slot-scope="scope"
          ><el-link
            type="primary"
            :href="
              '/agent/taskmachine/listbymachine?id=' +
                scope.row.machine_id
            "
            target="_blank"
            >{{ scope.row.machine_id }}</el-link
          ></template
        ></el-table-column
      >
      <el-table-column prop="type" label="任务">
        <template slot-scope="scope">
          {{typedata[scope.row.type].value}}
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
        task_id: ""
      },
      rules: {
        task_id: [
          { required: true, message: "请输入任务ID", trigger: "change" }
        ]
      },
      page: 1,
      page_size: 50,
      pageSizes: [50, 100, 150, 200],
      tableData: [],
      TaskDetailObj: null,
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
      },
      typedata:{
        1:{
          value:"关注"
        },
        2:{
          value:"点赞"
        }
      }
    };
  },
  mounted() {
    if (this.$route.query.tu_id) {
      this.ruleForm.task_id = this.$route.query.tu_id;
      this.getTuDetail(this.ruleForm.task_id);
      let dataObj = this.initData();
      this.getlistbytask(dataObj);
    }
  },
  methods: {
    //初始化请求参数
    initData() {
      var dataObj = {
        task_id: this.ruleForm.task_id,
        page: this.page,
        page_size: this.page_size
      };
      return dataObj;
    },

    //根据id获取单条任务详情
    getTuDetail(id) {
      this.$api.agent.taskuser.read({ id }).then(res => {
        // console.log(res);
        if (res.code === 0) {
          this.TaskDetailObj = res.data;
        }
      });
    },

    //id输入框
    oninputTask_id(e) {
      this.ruleForm.task_id = e.trim();
    },

    //查询
    onlookUp(data) {
      let _this = this;
      _this.$refs[data].validate(valid => {
        if (valid) {
          this.page = 1;
          var dataObj = this.initData();
          _this.getlistbytask(dataObj);
          _this.getTuDetail(this.ruleForm.task_id);
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    //获取数据
    getlistbytask(data) {
      this.$api.agent.taskmachine.listbytask(data).then(res => {
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
      this.getlistbytask(dataObj);
    },
    //当前页码变化
    handleCurrentChange(e) {
      this.page = e;
      var dataObj = this.initData();
      this.getlistbytask(dataObj);
    },

    //跳转事件
    onJump(){
        window.open(this.TaskDetailObj.url, "_blank");
    }
  }
};
</script>
