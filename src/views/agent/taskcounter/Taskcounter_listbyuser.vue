<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="机主" prop="user_id">
        <el-select v-model="ruleForm.user_id" placeholder="请选择机主">
          <el-option
            v-for="item in userArr"
            :key="item.id"
            :label="item.id + ' ' + item.nickname"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
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

    <el-table
      :data="tableData"
      max-height="500"
      border
      style="width: 100%"
      stripe
    >
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
        user_id: "",
        date: ""
      },
      rules: {
        user_id: [{ required: true, message: "请选择机主", trigger: "change" }],
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
      tableData: [],
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

    //查询
    onlookUp(data) {
      let _this = this;
      _this.$refs[data].validate(valid => {
        if (valid) {
          var dataObj = {
            user_id: _this.ruleForm.user_id,
            date: _this.ruleForm.date
          };
          _this.$api.agent.taskcounter.listbyuser(dataObj).then(res => {
            // console.log(res);
            if (res.code === 0) {
              _this.tableData = res.data;
            }
          });
        } else {
          return false;
        }
      });
    },

    //查看机器ID
    onlookMachine(id) {
      // console.log(id);
      let routeUrl = this.$router.resolve({
        path: "/agent/taskcounter/listbymachine",
        query: { id }
      });
      window.open(routeUrl.href, "_blank");
    }
  }
};
</script>
