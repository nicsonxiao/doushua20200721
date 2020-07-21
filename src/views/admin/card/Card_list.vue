<template>
  <div>
    <div class="dailyTitle">卡列表</div>
    <el-table :data="agentsArr" border style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
      ></el-table-column>
      <el-table-column
        prop="nickname"
        label="代理"
      ></el-table-column>
      <el-table-column prop="cards[1]" label="日卡" ></el-table-column>
      <el-table-column prop="cards[2]" label="月卡" ></el-table-column>
      <el-table-column prop="cards[3]" label="季卡" ></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <!-- <el-button @click.native.prevent="onNotes(scope.$index, tableData)" type="text" size="small">
            记录
          </el-button> -->
          <el-link type="primary" :href="'/admin/card/logs_agent?agent_id=' + scope.row.id" target="_blank">记录</el-link>
          <el-link type="primary" :href="'/admin/card/create?agent_id=' + scope.row.id" target="_blank">发卡</el-link>
          <!-- <el-button @click.native.prevent="onNotes(scope.$index, tableData)" type="text" size="small">
            发卡
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      agentsArr: []
    };
  },
  async mounted(){
    await this.getAgentList();
    await this.getCardList();
    this.bindCard();
  },
  methods: {
    async getCardList(){
      let res = await this.$api.admin.card.list();
      
      
      if (res.code === 0) {
        this.cards = res.data;
      
      }
    },

    //加载代理项
    async getAgentList() {
      let dataObj = {
        page: 1,
        page_size: 1000
      },  res = await this.$api.admin.agent.list(dataObj);
      
      
      if (res.code === 0) {
          var list = {};
          for(var item of res.data){
            item.cards = {
              1:0,
              2:0,
              3:0
            };
            list[item.id] = item;
          }
          this.agents = list;
          this.agentsArr = res.data;
          
          // console.log(this.agentsArr);
      }
    },

    bindCard(){
      for(var item of this.cards){
        this.agents[item.user_id] && (this.agents[item.user_id].cards[item.card_type] = item.count);
      }

      // console.log(this.agents);
    },

    // onNotes(index, rows) {
        // console.log(index);
        // console.log(rows);
    // }
  }
};
</script>
