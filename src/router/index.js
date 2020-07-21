import Vue from "vue";
import VueRouter from "vue-router";
// import Index from "../views/Index.vue";
import Login from "../views/index/Login.vue";

import adminRoute from "./admin";
import agentRoute from "./agent";
import userRoute from "./user";


Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

let routes = [
  {
    path: "/login",
    component: Login,
    meta:{
      title:"登录"
    }
  },
  
  {
    path: "/",
    component: Login,
    meta:{
      title:"首页"
    }
  }
];
routes = routes.concat(adminRoute).concat(agentRoute).concat(userRoute);


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});


export default router;
