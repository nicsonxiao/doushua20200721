<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item>
        添加订单
      </el-form-item>
      <el-form-item label="APP">
        <el-select v-model="APP" placeholder="请选择APP">
          <el-option label="抖音" value="douyin"></el-option>
          <el-option label="小红书" value="xiaohongshu"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任务" prop="task_id">
        <el-select
          v-model="ruleForm.task_id"
          placeholder="请选择任务"
          @change="onchangTask"
        >
        <el-option v-for="item in tasklist" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="单价">
        {{tasklist[ruleForm.task_id].price / 10000}}元 / {{tasklist[ruleForm.task_id].count}}次
      </el-form-item>
      <el-form-item label="下单数量" prop="count">
        <el-input
          type="number"
          placeholder="1000"
          v-model="ruleForm.count"
        ></el-input>
      </el-form-item>
      <el-form-item label="总价"> {{ total }}元 </el-form-item>
      <!-- <el-form-item label="下单用户ID">
        <el-input placeholder="8013546" v-model="ruleForm.userID"></el-input>
      </el-form-item> -->
      <el-form-item label="备注">
        <el-input
          type="textarea"
          v-model="ruleForm.remarks"
          placeholder="请输入备注"
          resize="none"
          autosize
        ></el-input>
      </el-form-item>
      <el-form-item label="链接内容" prop="shareText">
        <el-input
          v-model="ruleForm.shareText"
          @change="getMediaId"
          type="textarea"
          autosize
          resize="none"
          placeholder="请输入从抖音复制的链接内容"
        >
        </el-input>
      </el-form-item>
      <template v-if="ruleForm.url != ''">
        <el-form-item label="视频链接">
          {{ ruleForm.url }}
        </el-form-item>
        <el-form-item label="抖音ID">
          {{ ruleForm.uid }}
        </el-form-item>
        <el-form-item label="抖音昵称">
          {{ ruleForm.nickname }}
        </el-form-item>
        <el-form-item label="视频ID">
          {{ ruleForm.video_id }}
        </el-form-item>
      </template>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        task_id: 10001,
        count: 1,
        price: 40000,
        url: "",
        video_id: "",
        uid: "",
        nickname: "",
        shareText: "",
        remarks: ""
      },
      rules: {
        task_id: [{ required: true, message: "请选择任务", trigger: "change" }],
        count: [{ required: true, message: "请选择单价", trigger: "blur" }],
        // shareText: [
        //   {
        //     required: true,
        //     message: "请输入抖音复制的链接内容",
        //     trigger: "blur"
        //   }
        // ]
      },
      tasklist: {
        10000: {
        },
        10001: {
        }
      },
      APP: "douyin"
    };
  },
  mounted() {
    this.getTaskList();
  },
  computed: {
    total: function() {
      return ((this.ruleForm.price /10000 * this.ruleForm.count) / 1000).toFixed(2);
    }
  },
  methods: {
    initData() {
      this.ruleForm.task_id = 10001;
      this.ruleForm.count = 1000;
      this.ruleForm.price = 40;
      this.ruleForm.url = "";
      this.ruleForm.video_id = "";
      this.ruleForm.uid = "";
      this.ruleForm.nickname = "";
      this.ruleForm.shareText = "";
      this.ruleForm.remarks = "";
      this.ruleForm.userID = "";
      this.APP = "douyin";
    },

    async getTaskList(){
      let res = await this.$api.admin.task.list();
      console.log(res);
      if(res.code == 0){
        for(let item of res.data){
          this.tasklist[item.id] = item;
        }
      }
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          if(!this.ruleForm.video_id || !this.ruleForm.uid || !this.ruleForm.nickname || !this.ruleForm.url){
            this.$message({
              message: "请输入抖音复制的链接内容",
              type: "warning"
            })
          }else{
            this.$api.agent.taskuser.create(this.ruleForm).then(res=>{
              // console.log(res);
              if(res.code===0){
                this.initData();
                this.$message({
                    message: "订单已提交",
                    type: "success"
                  });
              }
            });
          }
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      // this.$refs[formName].resetFields();
      this.initData();
    },
    async getMediaId() {
      var regexp = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g,
        arr = this.ruleForm.shareText.match(regexp);

      if (
        arr == null ||
        arr.length == 0 ||
        this.ruleForm.shareText == "" ||
        this.ruleForm.shareText.indexOf("v.douyin.com") == -1
      ) {
        this.$message.error("请填写正确的作品链接");
        this.ruleForm.shareText = "";
        return;
      }

      var url = arr[0],
        data = await this.$api.agent.method.getmediaid({ url });

      this.ruleForm.shareText = "";
      if (data.code == 0) {
        this.ruleForm.url = data.data.url;
        this.ruleForm.video_id = data.data.media_id;
        this.ruleForm.uid = data.data.uid;
        this.ruleForm.nickname = data.data.nickname;
      } else {
        this.ruleForm.url = "";
        this.ruleForm.video_id = "";
        this.$message.error(data.msg);
      }
    },
    onchangTask(e) {
      this.ruleForm.price = this.tasklist[e].price;
    }
  }
};
</script>

<style type="text/css" lang="less" scoped></style>
