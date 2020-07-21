<template>
<el-form
      :model="cardList"
      class="demo-ruleForm"
      label-width="100px"
      label-position="left"
    >
      <el-form-item>
         查看 卡数量
      </el-form-item>

      <el-form-item label="ID">
        {{ cardList.user_id }}
      </el-form-item>
      <el-form-item label="日卡" >
        {{ cardList.cards[1] }} 张
      </el-form-item>
      <el-form-item label="月卡">
        {{ cardList.cards[2] }} 张
      </el-form-item>
      <el-form-item label="季卡">
        {{ cardList.cards[3] }} 张
      </el-form-item>
    </el-form>
</template>

<script>
export default {
  data() {
    return {
      agentsArr: [],
      cardList: {
        user_id:"",
        cards:{
          1:0,
          2:0,
          3:0
        }
      },
    };
  },
  async mounted(){
    await this.getlistbyagent();
  },
  methods: {

    //加载卡片数量
    async getlistbyagent() {
      let res = await this.$api.agent.card.listbyagent();
      //  console.log(res);
      if (res.code === 0 && res.data.length > 0) {
        for (let item of res.data) {
          this.cardList.cards[item.card_type] = item.count;
          this.cardList.user_id = item.user_id;
        }
      }
    }
  }
};
</script>
