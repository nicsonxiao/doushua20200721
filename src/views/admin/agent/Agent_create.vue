<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
      label-width="100px"
    >
      <el-form-item>
        创建代理 / 机主
      </el-form-item>
      <el-form-item label="代理" prop="agent_id">
        <el-select v-model="ruleForm.agent_id" placeholder="请选择代理">
          <el-option label="创建代理" :value="0"></el-option>
          <el-option
            v-for="item in agentArr"
            :key="item.id"
            :label="item.id + ' ' +item.nickname"
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
      <el-form-item label="账号" prop="username">
          <el-input
              type="text"
              v-model="ruleForm.username"
              placeholder="账号"
            ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号">
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
        <el-button @click="submitForm('ruleForm')">创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    // var checkNO = (rule,value,callback) =>{
    //   if()
    // }
    return {
      ruleForm: {},
      rules: {
        agent_id:[{ required: true, message: "请选择代理", trigger: "change" }],
        nickname: [{ required: true, message: "请输入名字", trigger: "blur" }],
        username: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        alipay_acc: [
          { required: true, message: "请输入支付宝账号", trigger: "blur" }
        ],
        alipay_name: [{ required: true, message: "请选择支付宝名字", trigger: "blur" }]
      },
      tableData: [],
      agentArr:[]
    };
  },
  mounted(){
    this.initData();
    this.getAgentList();
  },
  methods: {
    initData(){
      this.ruleForm = {
        agent_id:0,
        nickname:"",
        username: "",
        password: "",
        alipay_acc: "",
        alipay_name: "",
        mobile:""
      }
    },

    //加载代理项
    getAgentList() {
      let dataObj = {
        page: 1,
        page_size: 1000
      }
      this.$api.admin.agent.list(dataObj).then(res => {
        // console.log(res)
        if (res.code === 0) {
          let agentArr = []
          for (let item of res.data) {
            item.create_timeStr = item.create_time.formatDate('yMd')
            item.balanceStr = (item.balance / 10000).toFixed(2)
            agentArr.push(item)
            this.agentArr = agentArr
          }
        }else{
          this.$message({
            message:res.msg,
            type:"error"
          })
        }
      })
    },
    submitForm(formName) {
      var _this = this;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          _this.$api.admin.agent.create(this.ruleForm).then(res=>{
            if(res.code===0){
              _this.$message({
                  message: "恭喜你，创建成功!",
                  type: "success"
              });
              this.initData();
            }else{
              _this.$message({
                  message: res.msg,
                  type: "warning"
        });
            }
          })
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
