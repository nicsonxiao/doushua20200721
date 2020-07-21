<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item>
        创建机器账号
      </el-form-item>
      <el-form-item label="批量 / 单个">
        <el-radio-group v-model="createMethod">
          <el-radio-button label="批量"></el-radio-button>
          <el-radio-button label="单个"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="createMethod === '批量'" label="前缀" prop="pre">
        <el-input
          type="text"
          placeholder="账号前缀"
          v-model="ruleForm.pre"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="createMethod === '批量'" label="序号" required>
        <el-col :span="11">
          <el-form-item prop="NoStart"
            ><el-input
              type="number"
              v-model="ruleForm.NoStart"
              placeholder="开始号"
            ></el-input> </el-form-item
        ></el-col>
        <el-col :span="2"><div style="text-align: center;">~</div></el-col>
        <el-col :span="11">
          <el-form-item prop="NoEnd">
            <el-input
              type="number"
              v-model="ruleForm.NoEnd"
              placeholder="结束号"
            ></el-input></el-form-item
        ></el-col>
      </el-form-item>

      <el-form-item v-else label="账号">
        <el-input v-model="ruleForm.username" placeholder="输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          placeholder="输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="代理" required>
        <el-col :span="21">
          <el-form-item prop="agent_id">
            <el-select
              v-model="ruleForm.agent_id"
              placeholder="请选择代理"
              @change="onChangAgent"
            >
              <el-option
                v-for="item in agentArr"
                :key="item.id"
                :label="item.id + ' ' + item.nickname"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3"
          ><el-link
            icon="el-icon-edit"
            href="/admin/agent/create"
            target="_blank"
            >新建</el-link
          >
          <!-- <el-button @click="onCreateAgent">新建</el-button> -->
        </el-col>
      </el-form-item>
      <el-form-item label="机主" required>
        <el-col :span="21">
          <el-form-item prop="user_id">
            <el-select v-model="ruleForm.user_id" placeholder="请选择机主">
              <!-- <el-option :key="0" label="请选择机主" :value="0"></el-option> -->
              <el-option
                v-for="item in userArr"
                :key="item.id"
                :label="item.id + ' ' + item.nickname"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3"
          ><el-link
            icon="el-icon-edit"
            href="/admin/agent/create"
            target="_blank"
            >新建</el-link
          ></el-col
        >
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm('ruleForm')">创建</el-button>
        <el-button @click="onClear('ruleForm')">清空</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      max-height="500"
      border
      style="width: 100%"
      stripe
    >
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="user_login" label="账号"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="create_time" label="时间"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        pre: "",
        NoStart: "",
        NoEnd: "",
        password: "",
        agent_id: "",
        user_id: "",
        username: ""
      },
      rules: {
        // pre: [{ required: true, message: "请输入前缀", trigger: "blur" }],
        // NoStart: [{ required: true, message: "请输入开始号", trigger: "blur" }],
        // NoEnd: [{ required: true, message: "请输入结束号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        agent_id: [
          { required: true, message: "请选择代理", trigger: "change" }
        ],
        user_id: [{ required: true, message: "请选择机主", trigger: "change" }]
      },
      tableData: [],
      agentArr: [],
      userArr: [],
      createMethod: "批量"
    };
  },
  mounted() {
    this.getAgentList();
  },
  methods: {
    //加载代理项
    getAgentList() {
      let dataObj = {
        page: 1,
        page_size: 1000
      };
      this.$api.admin.agent.list(dataObj).then(res => {
        if (res.code === 0) {
          this.agentArr = res.data;
        }
      });
    },

    submitForm(formName) {
      var _this = this;
      _this.$refs[formName].validate(async valid => {
        if (valid) {
          if (_this.createMethod === "批量") {
            if(_this.ruleForm.pre == ""){
              _this.$message({
                message:"前缀不能为空",
                type:"error"
              })
              return;
            }

            if(!(/^[a-z || A-Z || 0-9]\w+$/).test(_this.ruleForm.pre)){
              _this.$message({
                message:"账号只能由英文字母和数字组成",
                type:"error"
              })
              return;
            }

            if( _this.ruleForm.NoEnd=="" || _this.ruleForm.NoStart==""){
              _this.$message({
                message:"序号不能为空",
                type:"error"
              })
              return;
            }
            if (_this.ruleForm.NoEnd >= _this.ruleForm.NoStart) {
              var password = _this.ruleForm.password,
                user_id = _this.ruleForm.user_id,
                agent_id = _this.ruleForm.agent_id,
                machineArr = [];

              if (_this.ruleForm.user_id == 0) {
                _this.$message({
                  message: "请选择机主",
                  type: "error"
                });
                return;
              }
              for (
                let i = _this.ruleForm.NoStart;
                i <= _this.ruleForm.NoEnd;
                i++
              ) {
                let username = _this.ruleForm.pre.toString() + i;
                let result = await _this.createMachine({
                  username,
                  password,
                  user_id,
                  agent_id
                });
                machineArr.push(result);
                _this.tableData = machineArr;
              }
              _this.ruleForm.password = "";
            }
          } else if (_this.createMethod === "单个") {
            _this.tableData = [];
            let dataObj = {
              username: _this.ruleForm.username,
              password: _this.ruleForm.password,
              user_id: _this.ruleForm.user_id,
              agent_id: _this.ruleForm.agent_id
            };

            if(!(/^[a-z || A-Z || 0-9]\w+$/).test(dataObj.username)){
              _this.$message({
                message:"账号只能由英文字母和数字组成",
                type:"error"
              })
              return;
            }

            let result = await _this.createMachine(dataObj);
            _this.tableData.push(result);
            _this.ruleForm.username = "";
            _this.ruleForm.password = "";
          }
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },

    async createMachine(dataObj) {
      // { username, password, user_id, agent_id }
      let res = await this.$api.admin.machine.create(dataObj);
      switch (res.code) {
        case 0:
          return this.formTime(res.data);
        // machineArr.push(result);
        // this.tableData = machineArr;
        // break;
        case 10003:
          var log_time = new Date(),
            now = log_time / 1000;
          return {
            user_login: dataObj.username,
            status: "已存在",
            create_time: now.formatDate()
          };
        // break;
      }
    },

    onClear(formName) {
      this.$refs[formName].resetFields();
    },

    formTime(item) {
      let log_date = new Date(),
        now = log_date / 1000;
      item.create_time = now.formatDate("yMdhms", "-");
      item.status = "注册成功";
      // console.log(item);
      return item;
    },

    onChangAgent(e) {
      let acountsObj = {
        agent_id: e,
        page: 1,
        page_size: 1000
      };

      this.$api.admin.agent.accounts(acountsObj).then(res => {
        if (res.code === 0) {
          this.userArr = res.data;
          this.ruleForm.user_id = "";
        }
      });
    }
  }
};
</script>

<style type="text/css" lang="less" scoped>
/deep/.el-select {
  width: 100%;
}
</style>
