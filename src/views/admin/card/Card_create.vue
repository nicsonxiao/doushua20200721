<template>
  <div class="main">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="卡选择" prop="card">
            <el-select
              v-model="ruleForm.card"
              placeholder="请选择卡"
            >
              <el-option
                v-for="item in cardList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
      </el-form-item>
      
      <el-form-item label="单价" prop="price">
        <el-input v-model="ruleForm.price" placeholder="请输入"></el-input
          >
      </el-form-item>
      <el-form-item label="数量" prop="count">
        <el-input v-model="ruleForm.count" placeholder="1"></el-input>
      </el-form-item>
      <el-form-item label="合计">
        <el-input v-model="total" placeholder="0" disabled></el-input>
      </el-form-item>
      <el-form-item label="代理" required>
        <el-col :span="21">
          <el-form-item prop="agent_id">
            <el-select
              v-model="ruleForm.agent_id"
              placeholder="请选择代理"
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
          ><el-link  icon="el-icon-edit" href="/admin/agent/create" target="_blank">新建</el-link>
          </el-col>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col :span="4" :offset="6"
            ><el-button type="primary" @click="submitForm('ruleForm')"
              >下发</el-button
            ></el-col
          >
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        price:300,
        agent_id:"",
        card:"",
        count:1
      },
      rules:{
        price:[{ required: true, message: "请输入价格", trigger: "blur" }],
        agent_id:[{ required: true, message: "请选择代理", trigger: "change" }],
        card:[ { required: true, message: "请选择卡", trigger: "change" }],
        count:[{ required: true, message: "请输入数量", trigger: "blur" }]
      },
      cardList:[
        {
          name:"日卡",
          value:1
        },
        {
          name:"月卡",
          value:2
        },
        {
          name:"季卡",
          value:3
        },
      ],
      agentArr:[]
    };
  },

  computed:{
    total:function(){
      return this.ruleForm.price * 1 * this.ruleForm.count}
  },

  mounted(){
    this.getAgentList();
    if(this.$route.query.agent_id){
      this.ruleForm.agent_id = +this.$route.query.agent_id;
    }
  },

  methods: {

    //下发
    submitForm(formName) {
      let _this = this;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          let dataObj = {
            agent_id : this.ruleForm.agent_id,
            total : this.total,
            card : this.ruleForm.card,
            count : this.ruleForm.count
          }
          _this.$api.admin.card.topup(dataObj).then(res=>{
            // console.log(res);
            if(res.code==0){
              this.$message({
                message: '下发成功',
                type: 'success'
              });

            }else{
              this.$message({
                  message: res.msg,
                  type: 'warning'
              })
            }
          })
        } else {
          return false;
        }
      });
    },
    
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
  }
};
</script>

<style lang="less" scoped>
/deep/.el-select{
  width: 100%;
}
</style>
