import axios from "axios";
import router from "../../router";
// import ElementUI from "element-ui";


var baseUrl = "http://api.kjlm68.com:12345/",
  baseApiUrl = baseUrl + "api/",
  api = {
    model : ''
  };
var ajax = {
  post(url, data) {
    // , errorReturn = false
    url += url.indexOf('?') > -1 ? '&' : '?';
    url += '_ajax=1';

    return new Promise((resolve, reject) => {
      axios.post(url, data)
        .then(res => {
          if (res.data.code == 10001) {
            router.push({
              path: "/login"
            })
          } else if(res.data.code == 0){
              resolve(res.data);
            
          }else{
            // if(errorReturn){
                
            //   resolve(res.data);
            // }else{
              // ElementUI.$message({
              //   message:res.msg,
              //   type:"error"
              // })
              resolve(res.data);
            // }
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  // ajax(url, data, method){

  // }
};

// var login = {
// };

var machine = {
  create(data) {
    return ajax.post(baseApiUrl + api.model + "/machine/create", data);
  },
  // 机器账号列表
  list(data){
    return ajax.post(baseApiUrl + api.model + "/machine/list", data);
  },
};

var user = {
  //登录
  login(data) {
    return ajax.post(baseApiUrl + "index/public/login", data);
  },

  // 用户列表
  list(data) {
    return ajax.post(baseApiUrl + api.model + "/user/list", data);
  },

  //检测登录状态
  islogin(data){
    return ajax.post(baseApiUrl + "index/public/islogin", data);
  }
}

var agent = {
  // 创建代理/机主
  create(data){
    return ajax.post(baseApiUrl + api.model + "/agent/create", data);
  },
  // 代理列表
  list(data){
    return ajax.post(baseApiUrl + api.model + "/agent/list", data);
  },
  // 机主列表
  accounts(data){
    return ajax.post(baseApiUrl + api.model + "/agent/accounts", data);
  },
  //查看
  read(data){
    return ajax.post(baseApiUrl + api.model + "/agent/read", data);
  },
  //保存/更新
  update(data){
    return ajax.post(baseApiUrl + api.model + "/agent/update", data);
  },
  //搜索
  search(data){
    return ajax.post(baseApiUrl + api.model + "/agent/search", data);
  }
}

var taskcounter = {
  //任务日志
  listbyuser(data){
    return ajax.post(baseApiUrl + api.model + "/taskcounter/listbyuser", data);
  },
  listbymachine(data){
    return ajax.post(baseApiUrl + api.model + "/taskcounter/listbymachine", data);
  },
  list(data){
    return ajax.post(baseApiUrl + api.model + "/taskcounter/list", data);
  },
}

var method = {
  //抖音分享内容
  getmediaid(data){
    return ajax.post(baseApiUrl + "method/douyin/getmediaid", data);
  }
}

var task = {
  list(data){
    return ajax.post(baseApiUrl + api.model + "/task/list", data);
  },

  create(data){
    return ajax.post(baseApiUrl + api.model + "/task/create", data);
  },

  update(data){
    return ajax.post(baseApiUrl + api.model + "/task/update", data);
  },
}

var taskuser = {
  list(data){
    return ajax.post(baseApiUrl + api.model + "/taskuser/list", data);
  },
  read(data){
    return ajax.post(baseApiUrl + api.model + "/taskuser/read", data);
  },
  create(data){
    return ajax.post(baseApiUrl + api.model + "/taskuser/create", data);
  }
}

var taskmachine = {
  list(data){
    return ajax.post(baseApiUrl + api.model + "/taskmachine/list", data);
  },
  listbytask(data){
    return ajax.post(baseApiUrl + api.model + "/taskmachine/listbytask", data);
  },
  listbymachine(data){
    return ajax.post(baseApiUrl + api.model + "/taskmachine/listbymachine", data);
  },
}

var card = {
  topup(data){
    return ajax.post(baseApiUrl + api.model + "/card/topup", data);
  },
  list(data){
    return ajax.post(baseApiUrl + api.model + "/card/list", data);
  },
  machineTopup(data){
    return ajax.post(baseApiUrl + api.model + "/card/machineTopup", data);
  },
  logsbyagent(data){
    return ajax.post(baseApiUrl + api.model + "/card/logsbyagent", data);
  },
  logsbymachine(data){
    return ajax.post(baseApiUrl + api.model + "/card/logsbymachine", data);
  },
  listbyagent(data){
    return ajax.post(baseApiUrl + api.model + "/card/listbyagent", data);
  },
  logs(data){
    return ajax.post(baseApiUrl + api.model + "/card/logs", data);
  }
}

var withdraw = {
  list(data){
    return ajax.post(baseApiUrl + api.model + "/withdraw/list", data);
  },
  update(data){
    return ajax.post(baseApiUrl + api.model + "/withdraw/update", data);
  },
  read(data){
    return ajax.post(baseApiUrl + api.model + "/withdraw/read", data);
  }
}


var account = {
  //流水
  balancelogs(data){
    return ajax.post(baseApiUrl + api.model + "/account/balancelogs", data);
  },
}

api.admin = {
  machine,
  user,
  agent,
  taskcounter,
  task,
  method,
  taskuser,
  taskmachine,
  card,
  withdraw,
  account
};

api.agent = {
  machine,
  user,
  agent,
  taskcounter,
  method,
  taskuser,
  taskmachine,
  card,
  account
};
api.user = {
  machine,
  user,
  taskcounter,
  taskuser,
  taskmachine,
  account
}


export default api;
