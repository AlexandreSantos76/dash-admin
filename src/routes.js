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
import Clients from "views/clients/Clients";
import ClientProfile from "views/clients/ClientProfile";
import ClientRegister from "views/clients/ClientRegister";
import Plans from "views/plans/Plans";
import PlanRegister from "views/plans/PlanRegister";
import PlanSettings from "views/plans/PlanSettings";
// import PlanMonetizPaySettings from "views/plans/PlanMonetizPaySettings";
import Chargebacks from "views/chargebacks/Chargebacks";
import ChargebackSettings from "views/chargebacks/ChargebackSettings";
import Users from "views/users/Users";
import GroupsCreate from "views/users/GroupsCreate"
import GroupsUpdate from "views/users/GroupsUpdate";
import UserCreate from "views/users/UserCreate";
import Login from "views/users/Login"
import Register from "views/users/Register"
import ResetPassword from "views/users/ResetPassword"
import RePassword from "views/users/RePassword"
import Statement from "views/statements/Statement"
 
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
    path: "/users",
    name: "Usuários",
    icon: "fas fa-users text-primary text-red",
    component: Users,
    layout: "/admin"
  },
  {
    path: "/statements",
    name: "Extratos",
    icon: "fas fa-coins text-primary text-yellow",
    component: Statement,
    layout: "/admin"
  },
  {
    path: "/user-create",
    component: UserCreate,
    layout: "/admin",
  },
  {
    path: "/user-group",
    component: GroupsCreate,
    layout: "/admin",
  },
  {
    path: "/user-group-update/:id",
    component: GroupsUpdate,
    layout: "/admin",
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
  
  {
    path: "/clients-chargeback",
    name: "Chargebacks",
    icon: "ni ni-planet text-blue",
    component: Chargebacks,
    layout: "/admin"
  },
  {
    path: "/chargeback-settings",
    component: ChargebackSettings,
    layout: "/admin"
  },
  {
    path: "/login",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    component: Register,
    layout: "/auth"
  },
  {
    path: "/reset-password",
    component: ResetPassword,
    layout: "/auth"
  },
  {
    path: "/repassword",
    component: RePassword,
    layout: "/auth"
  }


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
