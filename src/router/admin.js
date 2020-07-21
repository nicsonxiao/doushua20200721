
// import List from "../views/admin/order/List.vue";
import Taskuser_create from "../views/admin/taskuser/Taskuser_create.vue";
import Taskuser_list from "../views/admin/taskuser/Taskuser_list.vue";

import Card_create from "../views/admin/card/Card_create.vue";
import Card_list from "../views/admin/card/Card_list.vue";
import Logs_machine from "../views/admin/card/Logs_machine.vue";
import Logs_agent from "../views/admin/card/Logs_agent.vue";
import MachineTopup from "../views/admin/card/MachineTopup.vue";


import Machine_create from "../views/admin/machine/Machine_create.vue";
import Machine_list from "../views/admin/machine/Machine_list.vue";

import Taskcounter_listbyuser from "../views/admin/taskcounter/Taskcounter_listbyuser.vue";
import Taskcounter_listbymachine from "../views/admin/taskcounter/Taskcounter_listbymachine.vue";

import Taskmachine_listbymachine from "../views/admin/taskmachine/Taskmachine_listbymachine.vue";
import Taskmachine_listbytask from "../views/admin/taskmachine/Taskmachine_listbytask.vue";
import Taskmachine_List from "../views/admin/taskmachine/TaskmachineList.vue";

import Agent_create from "../views/admin/agent/Agent_create.vue";
import Agent_list from "../views/admin/agent/Agent_list.vue";
import Agent_read from "../views/admin/agent/Agent_read.vue";
import Agent_accounts from "../views/admin/agent/Agent_accounts.vue";
import Agent_search from "../views/admin/agent/Agent_search.vue";

import WithdrawList from "../views/admin/withdraw/WithdrawList.vue";
import WithdrawRead from "../views/admin/withdraw/WithdrawRead.vue";

import Account_balancelogs from "../views/admin/account/Account_balancelogs.vue";


import Task_List from "../views/admin/task/Task_list.vue";

const adminUrl = "/admin";

const routes = [
  {
    path: adminUrl+"/machine/create",
    name: "Machine_create",
    component: Machine_create,
    meta:{
      title:"创建机器账号"
    }
  },
  {
    path: adminUrl+"/machine/list",
    name: "Machine_list",
    component: Machine_list,
    meta:{
      title:"机器账号列表"
    }
  },

  {
    path: adminUrl+"/account/balancelogs",
    name: "Account_balancelogs",
    component: Account_balancelogs,
    meta:{
      title:"查看流水情况"
    }
  },


  {
    path: adminUrl+"/agent/search",
    name: "Agent_search",
    component: Agent_search,
    meta:{
      title:"搜索"
    }
  },
  {
    path: adminUrl+"/agent/create",
    name: "Agent_create",
    component: Agent_create,
    meta:{
      title:"创建代理 / 机主"
    }
  },
  {
    path: adminUrl+"/agent/list",
    name: "Agent_list",
    component: Agent_list,
    meta:{
      title:"代理列表"
    }
  },
  {
    path: adminUrl+"/agent/read",
    name: "Agent_read",
    component: Agent_read,
    meta:{
      title:"查看/编辑 代理/机主"
    }
  },
  {
    path: adminUrl+"/agent/accounts",
    name: "Agent_accounts",
    component: Agent_accounts,
    meta:{
      title:"机主列表"
    }
  },

  
  {
    path: adminUrl+"/task/list",
    name: "Task_List",
    component: Task_List,
    meta:{
      title:"任务管理列表"
    }
  },


    {
      path: adminUrl+"/taskmachine/list",
      name: "Taskmachine_List",
      component: Taskmachine_List,
      meta:{
        title:"任务列表"
      }
    },
  
    {
      path: adminUrl+"/card/create",
      name: "Card_create",
      component: Card_create,
      meta:{
        title:"下发卡"
      }
    },
    {
      path: adminUrl+"/card/list",
      name: "Card_list",
      component: Card_list,
      meta:{
        title:"卡管理列表"
      }
    },
    {
      path: adminUrl+"/card/logs_machine",
      name: "Logs_machine",
      component: Logs_machine,
      meta:{
        title:"发卡记录"
      }
    },
    {
      path: adminUrl+"/card/logs_agent",
      name: "Logs_agent",
      component: Logs_agent,
      meta:{
        title:"代理充值记录"
      }
    },
    {
      path: adminUrl+"/card/MachineTopup",
      name: "MachineTopup",
      component: MachineTopup,
      meta:{
        title:"充值"
      }
    },
    {
      path: adminUrl+"/taskcounter/listbyuser",
      name: "Taskcounter_listbyuser",
      component: Taskcounter_listbyuser,
      meta:{
        title:"机器执行任务统计列表"
      }
    },
    {
      path: adminUrl+"/taskcounter/listbymachine",
      name: "Taskcounter_listbymachine",
      component: Taskcounter_listbymachine,
      meta:{
        title:"单个机器执行任务统计列表"
      }
    },
    {
      path: adminUrl+"/taskmachine/listbymachine",
      name: "Taskmachine_listbymachine",
      component: Taskmachine_listbymachine,
      meta:{
        title:"机器接单列表"
      }
    },
    {
      path: adminUrl+"/taskmachine/listbytask",
      name: "Taskmachine_listbytask",
      component: Taskmachine_listbytask,
      meta:{
        title:"根据任务ID查看机器接单列表"
      }
    },
  
  
  
    {
      path: adminUrl+"/taskuser/create",
      name: "Taskuser_create",
      component: Taskuser_create,
      meta:{
        title:"创建订单"
      }
    },
    {
      path: adminUrl+"/taskuser/list",
      name: "Taskuser_list",
      component: Taskuser_list,
      meta:{
        title:"订单列表"
      }
    },

    {
      path: adminUrl+"/withdraw/list",
      name: "WithdrawList",
      component: WithdrawList,
      meta:{
        title:"提现"
      }
    },
    {
      path: adminUrl+"/withdraw/read",
      name: "WithdrawRead",
      component: WithdrawRead,
      meta:{
        title:"查看提现结果"
      }
    },

  ];

export default routes;