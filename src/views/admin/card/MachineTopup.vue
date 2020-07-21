<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="批量充值">
        <el-form
          :model="rulePiliang"
          :rules="rules"
          ref="rulePiliang"
          label-width="80px"
          class="demo-ruleForm"
        >
          <el-form-item>
            批量充值
          </el-form-item>
          <el-form-item label="前缀" prop="pre">
            <el-input
              type="text"
              placeholder="账号前缀"
              v-model="rulePiliang.pre"
            ></el-input>
          </el-form-item>
          <el-form-item label="序号" required>
            <el-col :span="11">
              <el-form-item prop="NoStart"
                ><el-input
                  type="number"
                  v-model="rulePiliang.NoStart"
                  placeholder="开始号"
                ></el-input> </el-form-item
            ></el-col>
            <el-col :span="2"><div style="text-align: center;">~</div></el-col>
            <el-col :span="11">
              <el-form-item prop="NoEnd">
                <el-input
                  type="number"
                  v-model="rulePiliang.NoEnd"
                  placeholder="结束号"
                ></el-input></el-form-item
            ></el-col>
          </el-form-item>
          <el-form-item label="充值类型" prop="card">
            <el-select
              v-model="rulePiliang.card"
              placeholder="请选择充值类型"
              key="card-input"
            >
              <el-option
                v-for="item in cardList"
                :key="item.name"
                :label="item.name + ' ( 剩余 ' + item.count + ' 张 )'"
                :value="item.card_type"
                :disabled="item.count===0"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="machineTopup('rulePiliang')">充值</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="ID充值">
        <el-form
          :model="ruleID"
          :rules="rulesID"
          ref="ruleID"
          label-width="80px"
          class="demo-ruleForm"
        >
          <el-form-item>
            ID充值
          </el-form-item>
          <el-form-item label="ID号" prop="machine_id">
            <el-input v-model="ruleID.machine_id" placeholder="ID号"></el-input>
          </el-form-item>
          <el-form-item label="充值类型" prop="card">
            <el-select
              v-model="ruleID.card"
              placeholder="请选择充值类型"
              key="ID-input"
            >
              <el-option
                v-for="item in cardList"
                :key="item.name"
                :label="item.name + ' ( 剩余 ' + item.count + ' 张 )'"
                :value="item.card_type"
                :disabled="item.count===0"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="machineTopup('ruleID')">充值</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="账号充值">
        <el-form
          :model="ruleUser"
          :rules="rulesUser"
          ref="ruleUser"
          label-width="80px"
          class="demo-ruleForm"
        >
          <el-form-item>
            账号充值
          </el-form-item>
          <el-form-item label="账号" prop="username">
            <el-input v-model="ruleUser.username" placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item label="充值类型" prop="card">
            <el-select v-model="ruleUser.card" placeholder="请选择充值类型">
              <el-option
                v-for="item in cardList"
                :key="item.name"
                :label="item.name + ' ( 剩余 ' + item.count + ' 张 )'"
                :value="item.card_type"
                :disabled="item.count===0"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="machineTopup('ruleUser')">充值</el-button>
          </el-form-item>
        </el-form></el-tab-pane
      >
    </el-tabs>

    <el-table
      :data="tableArr"
      max-height="500"
      border
      style="width: 100%"
      stripe
    >
      <el-table-column type="index" label="序号" width="180"></el-table-column>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="user_login" label="账号"></el-table-column>
      <el-table-column label="充值类型">
        <template slot-scope="scope">
          {{ scope.row.card_type && cardList[scope.row.card_type].name }}
        </template>
      </el-table-column>
      <el-table-column label="有效期">
        <template slot-scope="scope">
          {{ scope.row.expire && scope.row.expire.formatDate("yMdhms", "-") }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column label="充值时间">
        <template slot-scope="scope">
          {{ scope.row.create_time.formatDate("yMdhms", "-") }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rulePiliang: {},
      ruleID: {},
      ruleUser: {},
      rules: {
        pre: [{ required: true, message: "请输入前缀", trigger: "blur" }],
        NoStart: [{ required: true, message: "请输入开始号", trigger: "blur" }],
        NoEnd: [{ required: true, message: "请输入结束号", trigger: "blur" }],
        card: [{ required: true, message: "请选择充值类型", trigger: "change" }]
      },
      rulesUser: {
        card: [
          { required: true, message: "请选择充值类型", trigger: "change" }
        ],
        username: [{ required: true, message: "请输入账号", trigger: "blur" }]
      },
      rulesID: {
        card: [
          { required: true, message: "请选择充值类型", trigger: "change" }
        ],
        machine_id: [{ required: true, message: "请输入ID号", trigger: "blur" }]
      },
      cardList: {
        1: {
          name: "日卡",
          card_type: 1,
          count: 0
        },
        2: {
          name: "月卡",
          card_type: 2,
          count: 0
        },
        3: {
          name: "季卡",
          card_type: 3,
          count: 0
        }
      },
      tableArr: []
    };
  },

  mounted() {
    this.getlistbyagent();
  },

  methods: {
    machineTopup(formName) {
      var _this = this;

      // _this.tableArr = [];
      _this.$refs[formName].validate(async valid => {
        if (valid) {
          if (formName === "rulePiliang") {
            if (_this.rulePiliang.NoEnd >= _this.rulePiliang.NoStart) {
              for (
                let i = _this.rulePiliang.NoStart;
                i <= _this.rulePiliang.NoEnd;
                i++
              ) {
                if (_this.cardList[_this.rulePiliang.card].count == 0) {
                  _this.$message({
                    message: "卡片余额不足",
                    type: "error"
                  });
                  break;
                }
                let username = _this.rulePiliang.pre.toString() + i;
                _this.MachineTopupUser(username, _this.rulePiliang.card);
              }
            }
          } else if (formName === "ruleID") {
            if (_this.cardList[_this.ruleID.card].count == 0) {
              _this.$message({
                message: "卡片余额不足",
                type: "error"
              });
              return;
            }
            _this.MachineTopup(_this.ruleID.machine_id, _this.ruleID.card);
          } else if (formName === "ruleUser") {
            
            _this.MachineTopupUser(
              _this.ruleUser.username,
              _this.ruleUser.card
            );
          } else {
            return false;
          }
        }
      });
    },


    checkCount(card){
      if (this.cardList[card].count == 0) {
        this.$message({
          message: "卡片余额不足",
          type: "error"
        });
        return false;
      }
      return true;
    },

    //ID充值
    async MachineTopup(id, card) {
      let _this = this,
        now = Date.now() / 1000,
        resMachineTopup = await _this.$api.admin.card.machineTopup({
          machine_id: id,
          card
        });
      if (resMachineTopup.code === 0) {
        _this.showSuccessData(resMachineTopup.data);
      } else {
        _this.tableArr.push({
          id,
          status: resMachineTopup.msg,
          create_time: now.toFixed(0)
        });
      }
    },

    //账号充值
    async MachineTopupUser(user_login, card) {
      let now = Date.now() / 1000,
        res = await this.$api.admin.agent.search({
          keyword: user_login
        });
      if (res.code === 0) {
        let resMachineTopup = await this.$api.admin.card.machineTopup({
          machine_id: res.data.id,
          card
        });
        if (resMachineTopup.code === 0) {
          this.showSuccessData(resMachineTopup.data);
        } else {
          this.tableArr.push({
            user_login: user_login,
            status: resMachineTopup.msg,
            create_time: now.toFixed(0)
          });
        }
      }else{
        this.tableArr.push({
            user_login: user_login,
            status: res.msg,
            create_time: now.toFixed(0)
          });
      }
    },

    //加载卡片数量
    async getlistbyagent() {
      let res = await this.$api.admin.card.listbyagent();
      //  console.log(res);
      if (res.code === 0 && res.data.length > 0) {
        for (let item of res.data) {
          this.cardList[item.card_type].count = item.count;
        }
      }
    },
    //充值成功该显示的内容
    showSuccessData(data) {
      let resData = {},
        now = new Date();
      resData.id = data.machine.id;
      resData.user_login = data.machine.user_login;
      resData.card_type = data.card.card_type;
      resData.expire = data.machine.expire;
      resData.status = "充值成功";
      resData.create_time = (now / 1000).toFixed(0);

      this.tableArr.push(resData);
      this.cardList[data.card.card_type].count = data.card.count;
    }
  }
};
</script>

<style type="text/css" lang="less" scoped>
/deep/.el-select {
  width: 100%;
}
</style>
