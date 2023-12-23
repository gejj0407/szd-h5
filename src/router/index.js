import { createRouter, createWebHistory } from "vue-router";

const components = {
  appHome: () => import("@/views/home/index.vue"),
  qrcode: () => import("@/views/home/qrcode.vue"),
  success: () => import("@/views/home/success.vue"),
};

const baseRoutes = [
  {
    name: "index",
    path: "/",
    component: components.appHome,
  },
  {
    name: "qrcode",
    path: "/qrcode",
    component: components.qrcode,
  },
  {
    name: "success",
    path: "/success",
    component: components.success,
  }
];

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: baseRoutes
});
