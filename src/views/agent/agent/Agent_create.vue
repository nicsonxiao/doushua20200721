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
        创建机主
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
        <el-button @click="onCreateUser('ruleForm')">创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {},
      rules: {
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
  },
  methods: {
    initData(){
      this.ruleForm = {
        nickname:"",
        username: "",
        password: "",
        alipay_acc: "",
        alipay_name: "",
        mobile:""
      }
    },


    //创建机主
    onCreateUser(formName) {
      var _this = this;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          _this.$api.agent.agent.create(this.ruleForm).then(res=>{
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
          return false;
        }
      });
    }
  }
};
</script>

<style type="text/css" lang="less" scoped></style>
