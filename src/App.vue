<template>
  <div id="app">
    <el-container v-if="model!==''">
      <el-aside width="200px">
        <template v-if="model === 'admin'">
          <el-menu
            :default-openeds="opendIndex"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
          >
            <el-submenu index="1" :popper-class="'autoClass'">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span>账号</span>
              </template>
              <el-submenu index="1-1">
                <template slot="title">代理</template>
                <el-menu-item index="/admin/agent/list">列表</el-menu-item>
                <el-menu-item index="/admin/agent/create">新建</el-menu-item>
              </el-submenu>
              <el-submenu index="1-2">
                <template slot="title">机主</template>
                <el-menu-item index="/admin/agent/accounts">列表</el-menu-item>
                <el-menu-item index="/admin/agent/create">新建</el-menu-item>
              </el-submenu>
              <el-submenu index="1-3">
                <template slot="title">机器</template>
                <el-menu-item index="/admin/machine/list">列表</el-menu-item>
                <el-menu-item index="/admin/machine/create">新建</el-menu-item>
              </el-submenu>
            </el-submenu>

            <el-menu-item index="/admin/task/list">
                <i class="el-icon-monitor"></i>
                <span>任务管理</span>
            </el-menu-item>
            
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-shopping-bag-2"></i>
                <span>订单</span>
              </template>
              <el-submenu index="2-1">
                <template slot="title">用户订单</template>
                <el-menu-item index="/admin/taskuser/create">下单</el-menu-item>
                <el-menu-item index="/admin/taskuser/list">列表</el-menu-item>
              </el-submenu>
              <el-submenu index="2-2">
                <template slot="title">接单</template>
                <el-menu-item index="/admin/taskmachine/list">任务列表</el-menu-item>
                <el-menu-item index="/admin/taskmachine/listbytask">任务</el-menu-item>
                <el-menu-item index="/admin/taskmachine/listbymachine">机器</el-menu-item>
              </el-submenu>
              <el-submenu index="2-3">
                <template slot="title">日志</template>
                <el-menu-item index="/admin/taskcounter/listbyuser">机主</el-menu-item>
                <el-menu-item index="/admin/taskcounter/listbymachine">机器</el-menu-item>
                <!-- <el-menu-item index="/admin/taskcounter/list">列表</el-menu-item> -->
              </el-submenu>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-date"></i>
                <span>财务</span>
              </template>
              <el-menu-item index="/admin/withdraw/list">提现</el-menu-item>
            </el-submenu>

            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-folder-opened"></i>
                <span>卡管理</span>
              </template>
              <el-menu-item index="/admin/card/list">列表</el-menu-item>
              <el-menu-item index="/admin/card/create">新建</el-menu-item>
              <el-menu-item index="/admin/card/logs_machine">发卡记录</el-menu-item>
              <el-menu-item index="/admin/card/logs_agent">代理充值记录</el-menu-item>
            </el-submenu>
          </el-menu>
        </template>

        <template v-else-if="model === 'agent'">
          <el-menu
            :default-openeds="opendIndex2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span>账号</span>
              </template>
              <el-submenu index="1-2">
                <template slot="title">机主</template>
                <el-menu-item index="/agent/agent/accounts">列表</el-menu-item>
                <el-menu-item index="/agent/agent/create">新建</el-menu-item>
              </el-submenu>
              <el-submenu index="1-3">
                <template slot="title">机器</template>
                <el-menu-item index="/agent/machine/list">列表</el-menu-item>
                <el-menu-item index="/agent/machine/create">新建</el-menu-item>
              </el-submenu>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-shopping-bag-2"></i>
                <span>订单</span>
              </template>
              <el-submenu index="2-2">
                <template slot="title">接单</template>
                <el-menu-item index="/agent/taskmachine/list">任务列表</el-menu-item>
                <el-menu-item index="/agent/taskmachine/listbytask">任务</el-menu-item>
                <el-menu-item index="/agent/taskmachine/listbymachine">机器</el-menu-item>
              </el-submenu>
              <el-submenu index="2-3">
                <template slot="title">日志</template>
                <el-menu-item index="/agent/taskcounter/listbyuser">机主</el-menu-item>
                <el-menu-item index="/agent/taskcounter/listbymachine">机器</el-menu-item>
                <!-- <el-menu-item index="/agent/taskcounter/list">列表</el-menu-item> -->
              </el-submenu>
            </el-submenu>

            <el-menu-item index="/agent/card/MachineTopup">
              <i class="el-icon-date"></i>
              <span slot="title">充值</span>
            </el-menu-item>

            <el-submenu index="6">
              <template slot="title">
                <i class="el-icon-folder-opened"></i>
                <span>卡管理</span>
              </template>
              <el-menu-item index="/agent/card/list">我的卡</el-menu-item>
              <el-menu-item index="/agent/card/logs_machine">机器充值记录</el-menu-item>
              <el-menu-item index="/agent/card/logs_agent">卡充值记录</el-menu-item>
            </el-submenu>
          </el-menu>
        </template>

        <template v-else-if="model === 'user'">
          <el-menu
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
          >
            <el-menu-item index="/user/machine/list">
              <i class="el-icon-user-solid"></i>
              <span slot="title">机器</span>
            </el-menu-item>

            <el-menu-item index="/user/taskcounter/listbyuser">
              <i class="el-icon-date"></i>
              <span slot="title">日志</span>
            </el-menu-item>
          </el-menu>
        </template>
      </el-aside>
      <el-container>
        <el-header v-if="model!=''">
          <div  v-if="model!=='user'" class="search">
            <el-input
              placeholder="请输入账号或ID"
              prefix-icon="el-icon-search"
              v-model="keyword"
              @change="changeKeyword"
              @keyup.enter.native="searchWithkeyword"
              clearable
            ></el-input>
            <span class="searchBtn" style="padding:20px;" @click="searchWithkeyword">搜索</span>
          </div>

          <div class="userInfo">
            <span>{{ user_login }}</span>
            <el-link
              class="exitCss"
              href="/api/index/public/logout"
              :underline="false"
              style="padding:20px;"
            >退出</el-link>
          </div>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>

    <!-- <template v-if="model === 'admin'">
      <div v-if="islogin" id="nav">
        <el-menu
          :default-active="activeIndex"
          @select="handleSelect"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">账号</template>
            <el-submenu index="1-1">
              <template slot="title">代理</template>
              <el-menu-item index="1-1-2">
                <router-link to="/admin/agent/list">列表</router-link>
              </el-menu-item>
              <el-menu-item index="1-1-3">
                <router-link to="/admin/agent/create">新建</router-link>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="1-2">
              <template slot="title">机主</template>
              <el-menu-item index="1-2-1">
                <router-link to="/admin/agent/accounts">列表</router-link>
              </el-menu-item>
              <el-menu-item index="1-2-2">
                <router-link to="/admin/agent/create">新建</router-link>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="1-3">
              <template slot="title">机器</template>
              <el-menu-item index="1-3-1">
                <router-link to="/admin/machine/list">列表</router-link>
              </el-menu-item>
              <el-menu-item index="1-3-2">
                <router-link to="/admin/machine/create">新建</router-link>
              </el-menu-item>
            </el-submenu>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">订单</template>
            <el-submenu index="2-1">
              <template slot="title">用户订单</template>
              <el-menu-item index="2-1-1">
                <router-link to="/admin/taskuser/create">下单</router-link>
              </el-menu-item>
              <el-menu-item index="2-1-2">
                <router-link to="/admin/taskuser/list">列表</router-link>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="2-2">
              <template slot="title">接单</template>
              <el-menu-item index="2-2-1">
                <router-link to="/admin/task/list">任务列表</router-link>
              </el-menu-item>
              <el-menu-item index="2-2-2">
                <router-link to="/admin/taskmachine/listbytask">任务</router-link>
              </el-menu-item>
              <el-menu-item index="2-2-3">
                <router-link to="/admin/taskmachine/listbymachine">机器</router-link>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="2-3">
              <template slot="title">日志</template>
              <el-menu-item index="2-3-1">
                <router-link to="/admin/taskcounter/listbyuser">机主</router-link>
              </el-menu-item>
              <el-menu-item index="2-3-2">
                <router-link to="/admin/taskcounter/listbymachine">机器</router-link>
              </el-menu-item>
              <el-menu-item index="2-3-3">
                <router-link to="/admin/taskcounter/list">列表</router-link>
              </el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">财务</template>
            <el-menu-item index="5-1">
              <router-link to="/admin/withdraw/list">提现</router-link>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">卡管理</template>
            <el-menu-item index="6-1">
              <router-link to="/admin/card/list">列表</router-link>
            </el-menu-item>
            <el-menu-item index="6-2">
              <router-link to="/admin/card/create">新建</router-link>
            </el-menu-item>
            <el-menu-item index="6-3">
              <router-link to="/admin/card/logs_machine">发卡记录</router-link>
            </el-menu-item>
            <el-menu-item index="6-4">
              <router-link to="/admin/card/logs_agent">代理充值记录</router-link>
            </el-menu-item>
          </el-submenu>

          <el-menu-item>
            <template slot="title">
              <div class="search">
                <el-input
                  placeholder="请输入账号或ID"
                  prefix-icon="el-icon-search"
                  v-model="keyword"
                  @change="changeKeyword"
                  @keyup.enter.native="searchWithkeyword"
                  clearable
                ></el-input>
                <span class="searchBtn" style="padding:20px;" @click="searchWithkeyword">搜索</span>
              </div>
            </template>
          </el-menu-item>
        </el-menu>
        <div class="userInfo">
          <span>{{ user_login }}</span>
          <el-link
            class="exitCss"
            href="/api/index/public/logout"
            :underline="false"
            style="padding:20px;"
          >退出</el-link>
        </div>
      </div>
    </template>

    <template v-else-if="model === 'agent'">
      <div v-if="islogin" id="nav">
        <el-menu
          :default-active="activeIndex"
          :default-openeds="openeds"
          @select="handleSelect"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">账号</template>

            <el-submenu index="1-2">
              <template slot="title">机主</template>
              <el-menu-item index="1-2-1">
                <router-link to="/agent/agent/accounts">列表</router-link>
              </el-menu-item>
              <el-menu-item index="1-2-2">
                <router-link to="/agent/agent/create">新建</router-link>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="1-3">
              <template slot="title">机器</template>
              <el-menu-item index="1-3-1">
                <router-link to="/agent/machine/list">列表</router-link>
              </el-menu-item>
              <el-menu-item index="1-3-2">
                <router-link to="/agent/machine/create">新建</router-link>
              </el-menu-item>
            </el-submenu>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">订单</template>

            <el-submenu index="2-2">
              <template slot="title">接单</template>
              <el-menu-item index="2-2-1">
                <router-link to="/agent/task/list">任务列表</router-link>
              </el-menu-item>
              <el-menu-item index="2-2-2">
                <router-link to="/agent/taskmachine/listbytask">任务</router-link>
              </el-menu-item>
              <el-menu-item index="2-2-3">
                <router-link to="/agent/taskmachine/listbymachine">机器</router-link>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="2-3">
              <template slot="title">日志</template>
              <el-menu-item index="2-3-1">
                <router-link to="/agent/taskcounter/listbyuser">机主</router-link>
              </el-menu-item>
              <el-menu-item index="2-3-2">
                <router-link to="/agent/taskcounter/listbymachine">机器</router-link>
              </el-menu-item>
              <el-menu-item index="2-3-3">
                <router-link to="/agent/taskcounter/list">列表</router-link>
              </el-menu-item>
            </el-submenu>
          </el-submenu>

          <el-menu-item index="3">
            <router-link to="/agent/card/MachineTopup">充值</router-link>
          </el-menu-item>
          <el-submenu index="6">
            <template slot="title">卡管理</template>
            <el-menu-item index="6-1">
              <router-link to="/agent/card/list">我的卡</router-link>
            </el-menu-item>
            <el-menu-item index="6-2">
              <router-link to="/agent/card/logs_machine">机器充值记录</router-link>
            </el-menu-item>
            <el-menu-item index="6-3">
              <router-link to="/agent/card/logs_agent">卡充值记录</router-link>
            </el-menu-item>
          </el-submenu>
          <el-menu-item>
            <template slot="title">
              <div class="search">
                <el-input
                  placeholder="请输入账号或ID"
                  prefix-icon="el-icon-search"
                  v-model="keyword"
                  @change="changeKeyword"
                  @keyup.enter.native="searchWithkeyword"
                  clearable
                ></el-input>
                <span class="searchBtn" style="padding:20px;" @click="searchWithkeyword">搜索</span>
              </div>
            </template>
          </el-menu-item>
        </el-menu>
        <div class="userInfo">
          <span>{{ user_login }}</span>
          <el-link
            class="exitCss"
            href="/api/index/public/logout"
            :underline="false"
            style="padding:20px;"
          >退出</el-link>
        </div>
      </div>
    </template>

    <template v-else-if="model === 'user'">
      <div v-if="islogin" id="nav">
        <el-menu
          :default-active="activeIndex"
          :default-openeds="openeds"
          @select="handleSelect"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1">
            <router-link to="/user/machine/list">机器</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="/user/taskcounter/listbyuser">日志</router-link>
          </el-menu-item>
        </el-menu>
        <div class="userInfo">
          <span>{{ user_login }}</span>
          <el-link
            class="exitCss"
            href="/api/index/public/logout"
            :underline="false"
            style="padding:20px;"
          >退出</el-link>
        </div>
      </div>
    </template>-->
    <div v-else class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      opendIndex: ['1', '2', '3', '4'],
      opendIndex2: ['1', '2', '6'],
      user_login: '',
      keyword: ''
    }
  },
  mounted() {
    this.isLogin()
  },
  watch: {
    // 如果路由发生变化，再次执行该方法
    $route: 'isLogin'
  },
  methods: {
    isLogin() {
      this.$api.admin.user.islogin().then(res => {
        // console.log(res);
        if (res.code == 0) {
          this.user_login = res.data.user_login
        }
      })
    },

    //搜索框内容变化
    changeKeyword(e) {
      this.keyword = e.trim()
    },

    //搜索
    searchWithkeyword() {
      if (this.keyword) {
        let model = location.pathname.split('/')[1]
        let routeUrl = this.$router.resolve({
          path: '/' + model + '/agent/search',
          query: { keyword: this.keyword }
        })
        window.open(routeUrl.href, '_blank')
      }
    }

    // //退出
    // onExit(){
    //   this.$route.pa
    // }
  },
  computed: {
    model: function() {
      let path = this.$route.path.split('/');
      return path.length > 2 ? path[1] : '';
    }
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  height: 100vh;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
#nav {
  a {
    font-weight: bold;
    // color: #2c3e50;
    // color: inherit;
    text-decoration: none;
    padding: 20px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.el-menu {
  height: 100%;
  border-right: none !important;
}

.el-aside {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow-x: hidden;
}

.el-container .is-vertical {
  margin-left: 200px;
}
.el-menu--horizontal .el-menu .el-menu-item > a {
  display: block;
  font-weight: bold;
  // color: #2c3e50;
  color: inherit;
  text-decoration: none;
  padding: 0;

  &.router-link-exact-active {
    color: #42b983;
  }
}

.el-menu--horizontal > .el-menu-item {
  height: 60px;
  line-height: 60px;
  padding: 0;
}

.el-header {
  background-color: #545c64;
}

.search {
  line-height: 60px;
  .searchBtn {
    color: white;
  }
}

.search .el-input {
  width: auto;
}

*::-webkit-scrollbar {
  width: 6px;
  height: 9px;
}

*::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border: 1px solid #ddd;
  min-height: 4px;
  border-radius: 12px;
}

.userInfo {
  position: absolute;
  right: 20px;
  top: 0;
  font-size: 14px;
  color: #fff;
  > a {
    span {
      color: #fff;
    }
  }
}
.content {
  padding: 20px;
}
.el-link.el-link--primary {
  padding: 0 10px;
}
</style>
