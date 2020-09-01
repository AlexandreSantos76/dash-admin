/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import Clients from "views/clients/Clients";
import ClientProfile from "views/clients/ClientProfile";
import ClientRegister from "views/clients/ClientRegister";
import Plans from "views/plans/Plans";
import PlanRegister from "views/plans/PlanRegister";
import PlanSettings from "views/plans/PlanSettings";
// import PlanMonetizPaySettings from "views/plans/PlanMonetizPaySettings";
import ClientsChargeback from "views/clients/ClientsChargeback";


var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/clients",
    name: "Clientes",
    icon: "ni ni-tv-2 text-primary",
    component: Clients,
    layout: "/admin",
  },
  {
    path: "/client-profile",
    component: ClientProfile,
    layout: "/admin"
  },
  {
    path: "/client-register",
    component: ClientRegister,
    layout: "/admin"
  },
  {
    path: "/plans",
    name: "Planos",
    icon: "ni ni-bullet-list-67 text-red",
    component: Plans,
    layout: "/admin"
  },
  {
    path: "/plan-register",
    component: PlanRegister,
    layout: "/admin"
  },
  {
    path: "/plan-settings",
    component: PlanSettings,
    layout: "/admin"
  },
  // {
  //   path: "/plan-pay-settings",
  //   component: PlanMonetizPaySettings,
  //   layout: "/admin"
  // },
  {
    path: "/clients-chargeback",
    name: "Chargebacks",
    icon: "ni ni-planet text-blue",
    component: ClientsChargeback,
    layout: "/admin"
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: Profile,
  //   layout: "/admin"
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Tables,
  //   layout: "/admin"
  // },
  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "ni ni-key-25 text-info",
  //   component: Login,
  //   layout: "/auth"
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: Register,
  //   layout: "/auth"
  // }
];
export default routes;
