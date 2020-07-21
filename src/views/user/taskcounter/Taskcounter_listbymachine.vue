<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="机器ID" prop="machine_id">
        <el-input v-model="ruleForm.machine_id" @change="oninputMachine_id"></el-input>
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
          value-format="yyyyMMdd"
        ></el-date-picker>
        <el-button @click="onlookUp('ruleForm')">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 100%" stripe>
      <el-table-column prop="machine_id" label="ID"></el-table-column>
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column prop="att" label="关注"></el-table-column>
      <el-table-column prop="pra" label="点赞"></el-table-column>
      <!-- <el-table-column prop="num" label="播放数"></el-table-column> -->
      <el-table-column prop="err1" label="正常失败"></el-table-column>
      <el-table-column prop="err2" label="异常失败"></el-table-column>
      <el-table-column label="首次任务">
        <template slot-scope="scope">{{scope.row.create_time.formatDate("yMdhms")}}</template>
      </el-table-column>
      <el-table-column label="最后执行时间">
        <template slot-scope="scope">{{scope.row.update_time.formatDate("yMdhms")}}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        machine_id: '',
        date: ''
      },
      rules: {
        machine_id: [
          { required: true, message: '请选择代理', trigger: 'change' }
        ],
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
      tableData: []
    }
  },
  mounted() {
    // this.ruleForm.machine_id = this.$route.query.id;
    if (this.$route.query.id) {
      this.ruleForm.machine_id = this.$route.query.id
      this.ruleForm.date = this.initWeek()
      var dataObj = this.initData()
      this.getlistbymachine(dataObj)
    }
  },
  methods: {
    //默认最近一个月
    initWeek() {
      let end = new Date()
      let start = new Date()
      end = (end.getTime() / 1000).formatDate('yMd', '')
      start = ((start.getTime() - 3600 * 1000 * 24 * 30) / 1000).formatDate(
        'yMd',
        ''
      )
      return [start, end]
    },

    //getDate
    // getDate(e){
    //   console.log(e)
    // },

    //初始化请求参数
    initData() {
      var dataObj = {
        machine_id: this.ruleForm.machine_id,
        begin_date: this.ruleForm.date[0],
        end_date: this.ruleForm.date[1]
      }
      return dataObj
    },

    //id输入框
    oninputMachine_id(e) {
      this.ruleForm.machine_id = e.trim()
    },

    //查询
    onlookUp(data) {
      let _this = this
      _this.$refs[data].validate(valid => {
        if (valid) {
          var dataObj = _this.initData()
          _this.getlistbymachine(dataObj)
          //   machine_id: this.ruleForm.machine_id,
          //   begin_date: this.ruleForm.date[0],
          //   end_date:this.ruleForm.date[1]
          // };
        } else {
          return false
        }
      })
    },

    //获取详情
    getlistbymachine(dataObj) {
      this.$api.user.taskcounter.listbymachine(dataObj).then(res => {
        if (res.code === 0) {
          this.tableData = res.data
        }
      })
    }
  }
}
</script>
