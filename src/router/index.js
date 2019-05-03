import Vue from "vue";
import Router from "vue-router";

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router);

/* Layout */
import Layout from "../views/layout/Layout";

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const tenantProtectedRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/login/:mode",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  { path: "/404", component: () => import("@/views/404"), hidden: true },
  {
    path: "/",
    component: Layout,
    hidden: false,
    children: [
      {
        path: "",
        component: () => import("@/views/dashboard/index"),
        name: "Dashboard",
        meta: { title: "Dashboard", icon: "icon-home", noCache: true }
      }
    ]
  },
  {
    path: "/users",
    component: Layout,
    children: [
      {
        path: "",
        component: () => import("@/views/users/index"),
        name: "Users",
        meta: { title: "Users", icon: "icon-users", noCache: true }
      }
    ]
  },
  {
    path: "/monitoring",
    component: Layout,
    redirect: "/monitoring/units",
    name: "Monitoring",
    meta: { title: "Monitoring", icon: "icon-eye" },
    children: [
      {
        path: "units",
        name: "Units",
        component: () => import("@/views/monitor/units"),
        meta: { title: "Units", icon: "icon-cursor" }
      },
      {
        // Carga el componente con la ruta correcta pero lo muestra en el sidebar a pesar del hidden:true
        path: "trips/:trip_id/details",
        name: "Trip Details",
        component: () => import("../views/catalogs/trips/details.vue"),
        hidden: true,
        meta: { title: "Trips", icon: "fas fa-route" }
      },
      {
        path: "trips",
        name: "Trips ",
        component: () => import("@/views/catalogs/trips/index"),
        meta: { title: "Trips", icon: "fas fa-route" }
      },
      {
        path: "devicesmap",
        name: "Devices Map",
        component: () => import("@/views/monitor/devices_map"),
        meta: { title: "Units", icon: "icon-cursor" }
      }
    ]
  },
  {
    path: "/catalogs",
    component: Layout,
    redirect: "/catalogs/operators",
    name: "Catalogs",
    meta: { title: "Catalogs", icon: "icon-docs" },
    children: [
      {
        path: "trips",
        name: "Trips",
        component: () => import("@/views/catalogs/trips/index"),
        meta: { title: "Trips", icon: "fas fa-route" }
      },
      {
        path: "operators",
        name: "Operators",
        component: () => import("@/views/catalogs/operators/index"), // Parent router-view,
        meta: { title: "Operators", icon: "icon-comments" }
      },
      {
        path: "devices",
        name: "Devices",
        component: () => import("@/views/catalogs/devices/index"),
        meta: { title: "Devices", icon: "fas fa-truck-loading" }
      },
      {
        path: "trucks",
        name: "Trucks",
        component: () => import("@/views/catalogs/trucks/index"),
        meta: { title: "Trucks", icon: "fas fa-truck" }
      },
      {
        path: "trailerbox",
        name: "Trialerbox",
        component: () => import("@/views/catalogs/trailerbox/index"),
        meta: { title: "Trucks", icon: "fas fa-truck" }
      },
      {
        path: "carriers",
        name: "Carriers",
        component: () => import("@/views/catalogs/carriers/index"),
        meta: { title: "Carriers", icon: "icon-exchange-alt" }
      },
      {
        path: "clients",
        name: "Clients",
        component: () => import("@/views/catalogs/clients/index"),
        meta: { title: "Clients", icon: "icon-users" }
      },
      {
        path: "contacts",
        name: "Contacts",
        component: () => import("@/views/catalogs/contacts/index"),
        meta: { title: "Contacts", icon: "icon-users" }
      },
      {
        path: "places",
        name: "Places",
        component: () => import("@/views/catalogs/places/index"),
        meta: { title: "Places", icon: "fas fa-map-marker-alt" }
      },
      {
        path: "situations",
        name: "Situations",
        component: () => import("@/views/catalogs/situations/index"),
        meta: { title: "Situations", icon: "fas fa-clipboard-check" }
      },
      {
        path: "monitoring_assign",
        name: "Monitoring Assign",
        component: () => import("@/views/monitoring_assign/assign"),
        meta: { title: "Monitoring Assign", icon: "icon-form" }
      }
    ]
  },
  {
    path: "/report",
    component: Layout,
    // redirect: 'report',
    children: [
      {
        path: "",
        component: () => import("@/views/general_report/genreport"),
        name: "General report",
        meta: { title: "General report", icon: "icon-bar-chart", noCache: true }
      }
    ]
  },
  {
    path: "/user_settings",
    component: Layout,
    hidden: true,
    // redirect: 'user_settings',
    children: [
      {
        path: "",
        component: () => import("@/views/user_settings/user_settings"),
        name: "User Settings",
        meta: { title: "User Settings", icon: "icon-settings", noCache: true }
      }
    ]
  },
  {
    path: "/notifications",
    component: Layout,
    redirect: "notifications",
    children: [
      {
        path: "",
        component: () => import("@/views/notifications/index"),
        name: "Notifications",
        meta: { title: "Notifications", icon: "icon-settings", noCache: true }
      }
    ]
  },
  {
    path: "/settings",
    component: Layout,
    redirect: "/settings/general",
    name: "System Settings",
    meta: { title: "System Settings", icon: "icon-settings" },
    children: [
      {
        path: "general",
        component: () => import("@/views/settings/settings"),
        name: "General Settings"
      },
      {
        path: "permissions",
        component: () => import("@/views/settings/permissions"),
        name: "Permissions",
        meta: { title: "Permissions", icon: "icon-settings", noCache: true }
      }
    ]
  }
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: tenantProtectedRoutes
});
