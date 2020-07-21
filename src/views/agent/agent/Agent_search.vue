<template>
    <div v-if="searchData">
        <el-form
      :model="searchData"
      class="demo-ruleForm"
      label-width="100px"
      label-position="left"
    >
      <el-form-item>
         查看 账号
      </el-form-item>

      <el-form-item label="身份">
        {{ typedata[searchData.user_type] }}
      </el-form-item>
      <el-form-item label="id" prop="id">
        {{ searchData.id }}
      </el-form-item>
      <el-form-item label="账号" prop="user_login">
        {{ searchData.user_login }}
      </el-form-item>
      <el-form-item label="账号" prop="agent_id">
        {{ searchData.agent_id }}
      </el-form-item>
      <!-- <el-form-item v-if="searchData.user_type == 4" label="代理" prop="agent_id">
        <el-select v-model="searchData.agent_id" placeholder="请选择代理">
          <el-option
            v-for="(item, index) in agentArr"
            :key="index"
            :label="item.id + ' ' + item.nickname"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item> -->

      <el-form-item label="名字" prop="nickname">
        {{searchData.nickname}}
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        {{searchData.mobile}}
      </el-form-item>
      <el-form-item label="支付宝账号" prop="alipay_acc">
        {{searchData.alipay_acc}}
      </el-form-item>
      <el-form-item label="支付宝名字" prop="alipay_name">
        {{searchData.alipay_name}}
      </el-form-item>
      <el-form-item v-if="searchData.user_type===3">
        <el-button type="primary" @click="onSearchOrderDetails()">查看接单情况</el-button>
        <el-button type="primary" @click="onSearchOrderLogs()">查看接单日志</el-button>
      </el-form-item>
    </el-form>
    </div>
    
    <div v-else>查无此内容</div>
</template>

<script>
export default {
    data(){
        return{
            searchData:{},
            // 1:admin;2:代理3机器4机主5普通用户
            typedata:{
                1:"管理员",
                2:"代理",
                3:"机器",
                4:"机主",
                5:"普通用户",
            }
        }
    },

    mounted(){
        if(this.$route.query.keyword){
            // this.searchID = this.$route.query.keyword;
            this.$api.agent.agent.search({keyword:this.$route.query.keyword}).then(res=>{
                // console.log(res);
                if(res.code==0){
                    this.searchData = res.data;
                }
            })
        }
    },

    methods:{

        //查看接单情况
        onSearchOrderDetails(){
            if(this.$route.query.keyword){
                let routeUrl = this.$router.resolve({
                path: "/agent/taskmachine/listbymachine",
                query: { machine_id:this.searchData.id }
            });
            window.open(routeUrl.href, "_blank");
            }
        },


        //查看接单日志
        onSearchOrderLogs(){
            if(this.$route.query.keyword){
                let routeUrl = this.$router.resolve({
                path: "/agent/taskcounter/listbymachine",
                query: { machine_id:this.searchData.id }
            });
            window.open(routeUrl.href, "_blank");
            }
        }
    }
}
</script>