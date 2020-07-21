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
        查看 / 修改 机主信息
      </el-form-item>

      <el-form-item label="身份">
        {{ ruleForm.user_type == 4 ? "机主" : "代理" }}
      </el-form-item>
      <el-form-item label="id" prop="id">
        {{ ruleForm.id }}
      </el-form-item>
      <el-form-item label="账号" prop="user_login">
        {{ ruleForm.user_login }}
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
        user_login: "",
        user_type: "",
        nickname: "",
        username: "",
        mobile: "",
        password: "",
        alipay_acc: "",
        alipay_name: ""
      },
      rules: {
        nickname: [{ required: true, message: "请输入名字", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        alipay_acc: [
          { required: true, message: "请输入支付宝账号", trigger: "blur" }
        ],
        alipay_name: [
          { required: true, message: "请选择支付宝名字", trigger: "blur" }
        ]
      },
      tableData: []
    };
  },
  async mounted() {
    // this.initData();
    this.ruleForm.id = this.$route.query.id;
    let res = await this.$api.agent.agent.read({ id: this.ruleForm.id });
    if (res.code == 0) {
      this.ruleForm.nickname = res.data.nickname;
      this.ruleForm.username = res.data.mobile;
      this.ruleForm.mobile = res.data.mobile;
      this.ruleForm.user_login = res.data.user_login;
      this.ruleForm.alipay_acc = res.data.alipay_acc;
      this.ruleForm.alipay_name = res.data.alipay_name;
      this.ruleForm.user_type = res.data.user_type;
    }
  },
  methods: {
    onSaveupdate(formName) {
      var _this = this;
      _this.$refs[formName].validate(async valid => {
        if (valid) {
          let dataObj = {
            id: _this.ruleForm.id,
            nickname: _this.ruleForm.nickname,
            mobile: _this.ruleForm.mobile,
            alipay_acc: _this.ruleForm.alipay_acc,
            alipay_name: _this.ruleForm.alipay_name,
            agent_id: _this.ruleForm.agent_id
          };
          let res = await _this.$api.agent.agent.update(dataObj);
          if (res.code === 0) {
            _this.$message({
              message: "恭喜你，修改成功!",
              type: "success"
            });
          } else {
            _this.$message({
              message: res.msg,
              type: "warning"
            });
          }
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
