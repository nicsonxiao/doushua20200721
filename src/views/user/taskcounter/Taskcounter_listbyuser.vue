<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="日期" prop="date">
        <el-date-picker
          v-model="ruleForm.date"
          type="date"
          value-format="yyyyMMdd"
          placeholder="选择日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
        <el-button @click="onlookUp('ruleForm')">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 100%" stripe>
      <el-table-column
        prop="machine_id"
        label="ID"
        width="180"
      ></el-table-column>
      <el-table-column prop="att" label="关注" width="180"></el-table-column>
      <el-table-column prop="pra" label="点赞" width="180"></el-table-column>
      <el-table-column prop="err1" label="正常失败" width="180">
      </el-table-column>
      <el-table-column prop="err2" label="异常失败" width="180">
      </el-table-column>
      <el-table-column label="首次任务" width="180">
        <template slot-scope="scope">
          {{ scope.row.create_time.formatDate("hms") }}
        </template>
      </el-table-column>
      <el-table-column label="最后执行时间" width="180">
        <template slot-scope="scope">
          {{ scope.row.update_time.formatDate("hms") }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            @click="onlookMachine(scope.row.machine_id)"
            type="text"
            size="small"
            >查看</el-button
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
      ruleForm: {
        date: ""
      },
      rules: {
        date: [{ required: true, message: "请选择日期", trigger: "change" }]
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      tableData: []
    };
  },

  mounted() {
    this.ruleForm.date = Date.now().formatDate("yMd","");
    this.getListbyuser({ date: this.ruleForm.date });
  },
  methods: {
    //查询
    onlookUp(data) {
      let _this = this;
      _this.$refs[data].validate(valid => {
        if (valid) {
          var dataObj = {
            date: _this.ruleForm.date
          };
          _this.getListbyuser(dataObj);
        } else {
          return false;
        }
      });
    },

    //获取日志
    async getListbyuser(dataObj) {
      let res = await this.$api.user.taskcounter.listbyuser(dataObj);
      if (res.code === 0) {
        this.tableData = res.data;
      }
    },

    //查看机器ID
    onlookMachine(id) {
      // console.log(id);
      let routeUrl = this.$router.resolve({
        path: "/user/taskcounter/listbymachine",
        query: { id }
      });
      window.open(routeUrl.href, "_blank");
    }
  }
};
</script>
