/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import userData from "views/userData.js";
import addUser from "views/AddUser";
import AdminTest from "views/adminTest";
import result from "views/Result";

const dashboardAdminRoutes = [
 
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/userProfile",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",

  },
  {
    path: "/users",
    name: "Users",
    icon: "nc-icon nc-notes",
    component: userData,
    layout: "/admin",
    
  },
  {
    path: "/AddUser",
    name: "Add User",
    icon: "nc-icon nc-atom",
    component: addUser,
    layout: "/admin",
  },
  {
    path: "/AdminTest",
    name: "Test",
    icon: "nc-icon nc-circle-09",
    component: AdminTest,
    layout: "/admin",

  },
  {
    path: "/Result",
    name: "result",
    icon: "nc-icon nc-circle-09",
    component: result,
    layout: "/admin",

  },
];

export default dashboardAdminRoutes;
