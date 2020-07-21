<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="机器ID">
        <el-input v-model="ruleForm.user_id" @change="oninputUser_id"></el-input>
      </el-form-item>
      <el-form-item label="任务ID">
        <el-input v-model="ruleForm.task_id" @change="oninputTask_id"></el-input>
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
      <el-table-column label="流水号" width="180">
        <template slot-scope="scope">{{scope.row.create_time * 100000 + scope.row.id * 1}}</template>
      </el-table-column>
      <el-table-column prop="task_id" label="任务ID">
        <template slot-scope="scope"><el-link :href="'/admin/account/balancelogs?id='+scope.row.user_id +'&task_id=' + scope.row.task_id" type="primary">{{scope.row.task_id}}</el-link></template>
      </el-table-column>
      <el-table-column prop="change" label="变动金额">
        <template slot-scope="scope">{{(scope.row.change / 10000).toFixed(2)}}</template>
      </el-table-column>
      <el-table-column prop="balance" label="变动后金额">
        <template slot-scope="scope">{{(scope.row.balance / 10000).toFixed(2)}}</template>
      </el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        user_id: '',
        task_id: '',
        date: ''
      },
      rules: {
        user_id: [{ required: true, message: '请选择机主', trigger: 'change' }],
        date: [{ required: true, message: '请选择日期', trigger: 'change' }]
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      tableData: [],
      page: 1,
      page_size: 50
    }
  },

  mounted() {
    if (this.$route.query.id) {
      this.ruleForm.user_id = this.$route.query.id;
      this.ruleForm.date = this.initWeek();
    }
    if(this.$route.query.task_id){
        this.ruleForm.task_id = this.$route.query.task_id;
    }
    var dataObj = this.initData();
    this.getBalancelogs(dataObj);
  },

  methods: {
    //默认最近一个星期
    initWeek() {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },

    //初始化请求参数
    initData() {
      var dataObj = {
        user_id: this.ruleForm.user_id ? this.ruleForm.user_id : '',
        task_id: this.ruleForm.task_id ? this.ruleForm.task_id : '',
        begin_date: (this.ruleForm.date[0] / 1000).toFixed(0),
        end_date: (this.ruleForm.date[1] / 1000).toFixed(0),
        page: this.page,
        page_size: this.page_size
      }
      return dataObj
    },

    //机器id输入框
    oninputUser_id(e) {
      this.ruleForm.user_id = e.trim()
    },

    //任务id输入框
    oninputTask_id(e) {
      this.ruleForm.task_id = e.trim()
    },

    //查询
    onlookUp(data) {
      let _this = this
      _this.$refs[data].validate(valid => {
        if (valid) {
          var dataObj = _this.initData()
          _this.getBalancelogs(dataObj)
        } else {
          return false
        }
      })
    },

    //获取详情
    async getBalancelogs(dataObj) {
      let res = await this.$api.agent.account.balancelogs(dataObj)
      if (res.code === 0) {
        this.tableData = res.data
      }
    },


    //点击任务号跳转
    onChangeTaskId(taskId){
        console.log(taskId)
        this.ruleForm.task_id = taskId;
        var dataObj = this.initData();
        this.getBalancelogs(dataObj);
    }
  }
}
</script>