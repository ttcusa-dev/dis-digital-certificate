import { createRouter, createWebHistory } from "vue-router";
import DigitalCertificate from "../views/DigitalCertificate.vue";

const routes = [
  {
    path: "/:certId",
    name: "DigitalCertificate",
    component: DigitalCertificate,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
