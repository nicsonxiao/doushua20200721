<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
      label-width="100px"
      label-position="left"
    >
      <el-form-item>
         查看 / 修改 账号
      </el-form-item>

      <el-form-item label="身份">
        {{ ruleForm.user_type == 4 ? '机主':'代理'}}
      </el-form-item>
      <el-form-item label="id" prop="id">
        {{ ruleForm.id }}
      </el-form-item>
      <el-form-item label="账号" prop="user_login">
        {{ ruleForm.user_login }}
      </el-form-item>
      <el-form-item v-if="ruleForm.user_type == 4" label="代理" prop="agent_id">
        <el-select v-model="ruleForm.agent_id" placeholder="请选择代理">
          <!-- <el-option label="请选择代理" :value="0"></el-option> -->
          <el-option
            v-for="(item, index) in agentArr"
            :key="index"
            :label="item.id + ' ' + item.nickname"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="名字" prop="nickname">
        <el-input
          type="text"
          placeholder="名字"
          v-model="ruleForm.nickname"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input
          type="text"
          v-model="ruleForm.mobile"
          placeholder="手机号"
        ></el-input>
      </el-form-item>
      <el-form-item label="支付宝账号" prop="alipay_acc">
        <el-input
          v-model="ruleForm.alipay_acc"
          placeholder="支付宝账号"
        ></el-input>
      </el-form-item>
      <el-form-item label="支付宝名字" prop="alipay_name">
        <el-input
          v-model="ruleForm.alipay_name"
          placeholder="支付宝绑定名字"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSaveupdate('ruleForm')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        id: 0,
        user_login:"",
        user_type: "",
        agent_id: "",
        nickname: "",
        username: "",
        mobile:"",
        password: "",
        alipay_acc: "",
        alipay_name: ""
      },
      rules: {
        nickname: [{ required: true, message: "请输入名字", trigger: "blur" }],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        alipay_acc: [
          { required: true, message: "请输入支付宝账号", trigger: "blur" }
        ],
        alipay_name: [
          { required: true, message: "请选择支付宝名字", trigger: "blur" }
        ]
      },
      tableData: [],
      agentArr: []
    };
  },
  mounted() {
    // this.initData();
    this.ruleForm.id = this.$route.query.id;
    this.$api.admin.agent.read({ id: this.ruleForm.id }).then(res => {
      // console.log(res);
      if (res.code == 0) {
        this.ruleForm.nickname = res.data.nickname;
        this.ruleForm.username = res.data.mobile;
        this.ruleForm.mobile = res.data.mobile;
        this.ruleForm.user_login = res.data.user_login;
        this.ruleForm.alipay_acc = res.data.alipay_acc;
        this.ruleForm.alipay_name = res.data.alipay_name;
        this.ruleForm.user_type = res.data.user_type;
        if (this.ruleForm.user_type === 4) {
          this.getAgentList();
          this.ruleForm.agent_id = res.data.agent_id;
        }
      }
    });
  },
  methods: {
    //加载代理项
    getAgentList() {
      let dataObj = {
        page: 1,
        page_size: 1000
      };
      this.$api.admin.agent.list(dataObj).then(res => {
        // console.log(res);
        if (res.code === 0) {
          let agentArr = [];
          for (let item of res.data) {
            item.create_timeStr = item.create_time.formatDate("yMd");
            item.balanceStr = (item.balance / 10000).toFixed(2);
            agentArr.push(item);
            this.agentArr = agentArr;
          }
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    },
    onSaveupdate(formName) {
      var _this = this;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          let dataObj = {
            id:this.ruleForm.id,
            nickname: this.ruleForm.nickname,
            mobile: this.ruleForm.mobile,
            alipay_acc: this.ruleForm.alipay_acc,
            alipay_name: this.ruleForm.alipay_name,
            agent_id: this.ruleForm.agent_id
          };
          _this.$api.admin.agent.update(dataObj).then(res => {
            // console.log(res);
                if(res.code===0){
                  _this.$message({
                      message: "恭喜你，修改成功!",
                      type: "success"
                  });
                }else{
                  _this.$message({
                      message: res.msg,
                      type: "warning"
            });
                }
          });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style type="text/css" lang="less" scoped></style>
