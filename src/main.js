import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import api from "@/common/js/api.js";
import "@/common/js/date.js";

Vue.prototype.$api = api;
Vue.use(ElementUI);
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  let path = to.path.split("/");
  if(path.length > 2){
    api.model = path[1];
  }
  if (to.meta.title) {
      document.title = to.meta.title
  }
  next()
 })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
