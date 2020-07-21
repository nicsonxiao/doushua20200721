<template>
  <div>
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item>发卡记录</el-form-item>
      <el-form-item label="收卡人ID">
        <el-input
          v-model="ruleForm.user_id"
          placeholder="请输入收卡人ID"
        ></el-input>
      </el-form-item>
      <el-form-item label="操作人ID">
        <el-input v-model="ruleForm.editor_id" placeholder="请输入操作人ID">
        </el-input>
      </el-form-item>

      <el-form-item label="卡类">
        <el-select v-model="ruleForm.card_type" placeholder="请选择卡类">
          <el-option
            v-for="item in cardList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
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
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="序号" width="180"></el-table-column>
      <el-table-column prop="user_id" label="id" width="180"></el-table-column>
      <el-table-column prop="card_type" label="卡类型">
        <template slot-scope="scope">{{cardList[scope.row.card_type].name }}</template>
      </el-table-column>
      <el-table-column prop="change" label="变更数量"> </el-table-column>
      <el-table-column prop="balance" label="余额"> </el-table-column>
      <el-table-column label="发卡时间">
        <template slot-scope="scope">
          {{ scope.row.create_time.formatDate("yMdhms", "-") }}
        </template>
      </el-table-column>
      <el-table-column prop="editor_id" label="操作人"> </el-table-column>
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
        user_id: "",
        editor_id: "",
        date: "",
        card_type: 0
      },
      tableData: [],
      cardList: [
        {
          name: "全部",
          value: 0
        },
        {
          name: "日卡",
          value: 1
        },
        {
          name: "月卡",
          value: 2
        },
        {
          name: "季卡",
          value: 3
        }
      ],
      
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      page: 1,
      page_size: 50,
      pageSizes: [50, 60, 70, 80],
    };
  },
  methods: {
    //初始化请求参数
    initData() {
      var dataObj = {
        user_id: this.ruleForm.user_id == "" ? 0 : this.ruleForm.user_id,
        editor_id: this.ruleForm.editor_id == "" ? 0 : this.ruleForm.editor_id,
        card_type: this.ruleForm.card_type == "" ? 0 : this.ruleForm.card_type,
        begin_date:
          this.ruleForm.date === ""
            ? 0
            : (this.ruleForm.date[0] / 1000).toFixed(0),
        end_date:
          this.ruleForm.date === ""
            ? 0
            : (this.ruleForm.date[1] / 1000).toFixed(0),
        page: this.page,
        page_size: this.page_size
      };
      return dataObj;
    },

    //获取数据
    async getLogs(data) {
      let res = await this.$api.admin.card.logs(data);
      // console.log(res);
      if (res.code === 0) {
        this.tableData = res.data;
      }
    },

    //查询
    onlookUp(formName) {
      let _this = this;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          let dataObj = _this.initData();
          _this.getLogs(dataObj);
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },


    //页数变化
    handleSizeChange(e) {
        this.page_size = e;
        let dataObj = this.initData();
        this.getLogs(dataObj);
    },
    //当前页码变化
    handleCurrentChange(e) {
        this.page = e;
        let dataObj = this.initData();
        this.getLogs(dataObj);
    }
  }
};
</script>
