<template>
  <div>
    <el-form
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      label-position="left"
    >
      <h3>
        个人信息
      </h3>
      <template v-if="UserInfo">
        <el-row>
          <el-col :span="12">
            <el-form-item label="id">
              {{ UserInfo.id }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账号">
              {{ UserInfo.user_login }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="昵称">
              {{ UserInfo.nickname }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账号余额">
              {{ (UserInfo.balance / 10000).toFixed(2) }}元
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="支付宝账号">
              {{ UserInfo.alipay_acc }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="支付宝名称">
              {{ UserInfo.alipay_name }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="最后登录时间">
              {{ UserInfo.last_login_time.formatDate("yMdhms") }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="最近登录的ip">
              {{ UserInfo.last_login_ip }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="个人主页">
              <el-link type="primary" :href="UserInfo.user_url" target="_blank">{{ UserInfo.user_url }}</el-link> 
            </el-form-item>
          </el-col>
        </el-row>
        <h3>提现申请</h3>
        <el-row>
          <el-col :span="12">
            <el-form-item label="本次提现金额">
              {{ (withdrawInfo.amount / 10000).toFixed(2) }}元
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请时间">
              {{ withdrawInfo.create_time.formatDate("yMdhms", "-") }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="状态">
              {{ statusList[withdrawInfo.status].name }}
            </el-form-item>
          </el-col>
          <el-col v-if="withdrawInfo.payer_id" :span="12">
            <el-form-item label="已支付时间">
              {{
                withdrawInfo.payer_id
                  ? withdrawInfo.update_time.formatDate("yMdhms", "-")
                  : ""
              }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col v-if="withdrawInfo.payer_id" :span="12">
            <el-form-item label="处理人">
              {{ withdrawInfo.payer_id ? withdrawInfo.payer_id : "" }}
            </el-form-item>
          </el-col>
          <el-button
            type="primary"
            v-if="withdrawInfo.status == 1"
            @click="onSureWithdraw"
            >确认提现</el-button
          >
        </el-row>
      </template>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      UserInfo: {
        last_login_time:0
      },
      withdrawInfo: {
        create_time: 0,
        update_time: 0,
        status: 0
      },
      statusList: {
        0: {
          name: "全部",
          value: 0
        },
        1: {
          name: "申请",
          value: 1
        },
        2: {
          name: "已支付",
          value: 2
        },
        3: {
          name: "拒绝",
          value: 3
        }
      }
    };
  },

  mounted() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
      this.getWithdraw(this.id);
    }
  },

  methods: {
    //读取提现数据
    async getWithdraw(id) {
      let res = await this.$api.admin.withdraw.read({ id });
      // console.log(res);
      if (res.code == 0) {
        let user_id = res.data.user_id;
        this.withdrawInfo = res.data;
        this.getUserInfo(user_id);
      }
    },

    //获取提现用户信息
    async getUserInfo(id) {
      let res = await this.$api.admin.agent.read({ id });
      if (res.code == 0) {
        this.UserInfo = res.data;
      }
    },

    //确认提现
    async onSureWithdraw() {
      let dataObj = {
        id: this.id,
        status: 2
      };
      let res = await this.$api.admin.withdraw.update(dataObj);
      if (res.code == 0) {
        this.$message({
          message: "提现成功",
          type: "success"
        });
        this.withdrawInfo.status = res.data.status;
        this.withdrawInfo.update_time = res.data.update_time;
      } else {
        this.$message({
          message: res.msg,
          type: "error"
        });
      }
    }
  }
};
</script>
