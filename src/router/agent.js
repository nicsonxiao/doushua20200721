
// import List from "../views/agent/order/List.vue";
import Taskuser_create from "../views/agent/taskuser/Taskuser_create.vue";
import Taskuser_list from "../views/agent/taskuser/Taskuser_list.vue";

import Card_list from "../views/agent/card/Card_list.vue";
import Logs_machine from "../views/agent/card/Logs_machine.vue";
import Logs_agent from "../views/agent/card/Logs_agent.vue";
import MachineTopup from "../views/agent/card/MachineTopup.vue";


import Machine_create from "../views/agent/machine/Machine_create.vue";
import Machine_list from "../views/agent/machine/Machine_list.vue";
import Taskcounter_listbyuser from "../views/agent/taskcounter/Taskcounter_listbyuser.vue";
import Taskcounter_listbymachine from "../views/agent/taskcounter/Taskcounter_listbymachine.vue";

import Taskmachine_listbymachine from "../views/agent/taskmachine/Taskmachine_listbymachine.vue";
import Taskmachine_listbytask from "../views/agent/taskmachine/Taskmachine_listbytask.vue";
import Taskmachine_list from "../views/agent/taskmachine/Taskmachine_list.vue";

import Agent_create from "../views/agent/agent/Agent_create.vue";
import Agent_read from "../views/agent/agent/Agent_read.vue";
import Agent_accounts from "../views/agent/agent/Agent_accounts.vue";
import Agent_search from "../views/agent/agent/Agent_search.vue";

import Account_balancelogs from "../views/agent/account/Account_balancelogs.vue";

const agentUrl = "/agent";

const routes = [
  {
    path: agentUrl+"/account/balancelogs",
    name: "Account_balancelogs",
    component: Account_balancelogs,
    meta:{
      title:"查看流水情况"
    }
  },
    {
      path: agentUrl+"/taskmachine/list",
      name: "Taskmachine_list",
      component: Taskmachine_list,
      meta:{
        title:"任务列表"
      }
    },
  
    {
      path: agentUrl+"/card/list",
      name: "Card_list",
      component: Card_list,
      meta:{
        title:"我的卡"
      }
    },
    {
      path: agentUrl+"/card/logs_machine",
      name: "Logs_machine",
      component: Logs_machine,
      meta:{
        title:"机器充值记录"
      }
    },
    {
      path: agentUrl+"/card/logs_agent",
      name: "Logs_agent",
      component: Logs_agent,
      meta:{
        title:"卡充值记录"
      }
    },
    {
      path: agentUrl+"/card/MachineTopup",
      name: "MachineTopup",
      component: MachineTopup,
      meta:{
        title:"充值"
      }
    },
  
    {
      path: agentUrl+"/machine/create",
      name: "Machine_create",
      component: Machine_create,
      meta:{
        title:"创建机器账号"
      }
    },
    {
      path: agentUrl+"/machine/list",
      name: "Machine_list",
      component: Machine_list,
      meta:{
        title:"机器账号列表"
      }
    },
    {
      path: agentUrl+"/taskcounter/listbyuser",
      name: "Taskcounter_listbyuser",
      component: Taskcounter_listbyuser,
      meta:{
        title:"机器执行任务统计列表"
      }
    },
    {
      path: agentUrl+"/taskcounter/listbymachine",
      name: "Taskcounter_listbymachine",
      component: Taskcounter_listbymachine,
      meta:{
        title:"单个机器执行任务统计列表"
      }
    },
    {
      path: agentUrl+"/taskmachine/listbymachine",
      name: "Taskmachine_listbymachine",
      component: Taskmachine_listbymachine,
      meta:{
        title:"机器接单列表"
      }
    },
    {
      path: agentUrl+"/taskmachine/listbytask",
      name: "Taskmachine_listbytask",
      component: Taskmachine_listbytask,
      meta:{
        title:"根据任务ID查看机器接单列表"
      }
    },
  
    {
      path: agentUrl+"/agent/search",
      name: "Agent_search",
      component: Agent_search,
      meta:{
        title:"搜索"
      }
    },
    {
      path: agentUrl+"/agent/create",
      name: "Agent_create",
      component: Agent_create,
      meta:{
        title:"创建机主"
      }
    },
    {
      path: agentUrl+"/agent/read",
      name: "Agent_read",
      component: Agent_read,
      meta:{
        title:"查看 / 修改 机主信息"
      }
    },
    {
      path: agentUrl+"/agent/accounts",
      name: "Agent_accounts",
      component: Agent_accounts,
      meta:{
        title:"机主列表"
      }
    },
  
  
    {
      path: agentUrl+"/taskuser/create",
      name: "Taskuser_create",
      component: Taskuser_create,
      meta:{
        title:"创建订单"
      }
    },
    {
      path: agentUrl+"/taskuser/list",
      name: "Taskuser_list",
      component: Taskuser_list,
      meta:{
        title:"订单列表"
      }
    }
  ];

export default routes;