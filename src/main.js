// vue，pinia中所有的已通过auto import全局引入，这里可以删除
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "normalize.css";
import "@/styles/main.scss";
import "@/styles/coverVant.scss";

import "./utils/fastClick";
import vconsole from "vconsole";
// vant 函数组件样式
import "vant/es/toast/style";
import "vant/es/dialog/style";
import "vant/es/notify/style";
import "vant/es/image-preview/style";
import store from './store'
import { Lazyload } from "vant";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App);
const pinia = createPinia();
new vconsole();
window._AMapSecurityConfig = {
    securityJsCode: 'c3287da9a3806b809945659497e21ad0',
}

// 错误监控
// app.config.errorHandler = (err, vm) => {
//   const { message, name, stack } = err;
//   if (message || name) {
//     errReport({
//       target: vm?.$options?.__name,
//       msg: stack ? stack.toString() : `${name}:${message}`,
//       user: "",
//     });
//   }
//   console.error(err);
// };

app.use(router);
app.use(pinia);
app.use(Lazyload);
app.use(store);
app.use(ElementPlus)
app.mount("#app");
