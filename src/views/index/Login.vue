<template>
<div class="login">
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
    @submit.native.prevent
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        v-model="ruleForm.password"
        placeholder="密码"
        @keyup.enter.native="onLogin('ruleForm')"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onLogin('ruleForm')">登录</el-button>
    </el-form-item>
  </el-form>
</div>
  
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  // created(){
  //   var _this = this;
  //   document.onkeydown = function() {
  //   var key = window.event.keyCode;
  //   if (key == 13) {
  //   _this.handleEnterLogin();
  //   }
  //   }
  // },
  methods: {
    //登录请求
    login(){
      this.$api.admin.user.login(this.ruleForm).then(res => {
        if (res.code === 0) {
          this.$message({
            message:"登录成功",
            type:"success"
          })
          // console.log(res.data);
          this.$router.push({
            path: res.data.url
          });
        }else{
          this.$message({
            message:res.msg,
            type:"warning"
          })
        }
      });
    },

    onLogin(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          // console.log(valid);
          this.login()
        }
      });
    },



    //回车登录
    // handleEnterLogin(){
    //   document.onkeydown = e =>{
    //       let body = document.getElementsByTagName('body')[0]
    //       // console.log(body);
    //       if (e.keyCode === 13  && e.target.baseURI.match(/inputbook/) && e.target === body ) {
    //           console.log('enter')
    //           // this.onLogin(ruleForm);
    //           if(this.ruleForm.username && this.ruleForm.password){
    //             this.login();
    //           }
    //       }
    //   }
    // }
  }
};
</script>
<style lang="less" scoped>
</style>
