import { createRouter, createWebHistory } from "vue-router";

const DigitalCertificate = import("../views/DigitalCertificate.vue");
const DigitalCertificateList = import("../views/DigitalCertificateList.vue");
const ClientAnalyticalLandingPage = import(
  "../views/ClientAnalyticalLandingPage.vue"
);
// import Redirect from "../views/Redirect.vue";

const routes = [
  {
    path: "/:certType/:certId",
    name: "DigitalCertificate",
    component: DigitalCertificate,
  },
  {
    path: "/digitalcertlist/:list_id",
    name: "DigitalCertificateList",
    component: DigitalCertificateList,
  },

  {
    path: "/:type/:certificate_num/send_cert",
    name: "ClientAnalyticalLandingPage",
    component: ClientAnalyticalLandingPage,
  },

  // {
  //   path: "/redirect",
  //   name: "Redirect",
  //   component: Redirect,
  // },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
