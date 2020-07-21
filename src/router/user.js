import MachineList from "../views/user/machine/List.vue";
import Taskcounter_listbyuser from "../views/user/taskcounter/Taskcounter_listbyuser.vue";
import Taskcounter_listbymachine from "../views/user/taskcounter/Taskcounter_listbymachine.vue";

import Taskmachine_listbymachine from "../views/user/taskmachine/Taskmachine_listbymachine.vue";
import Taskmachine_listbytask from "../views/user/taskmachine/Taskmachine_listbytask.vue";
import TaskMachine_list from "../views/user/taskmachine/TaskMachine_list.vue";


import Account_balancelogs from "../views/user/account/Account_balancelogs.vue";


const agentUrl = "/user";

const routes = [
    {
      path: agentUrl+"/task/list",
      name: "TaskMachine_list",
      component: TaskMachine_list,
      meta:{
        title:"任务列表"
      }
    },
    {
      path: agentUrl+"/machine/list",
      name: "MachineList",
      component: MachineList,
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
      path: agentUrl+"/account/balancelogs",
      name: "Account_balancelogs",
      component: Account_balancelogs,
      meta:{
        title:"查看流水情况"
      }
    },
  ];

export default routes;