import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    // name: 'Dashboard',
    hidden: false,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'icon-home', noCache: true }
      }
    ]
  },
  {
    path: '/users',
    component: Layout,
    // meta: { title: 'Users', icon: 'icon-users', noCache: true },
    children: [
      {
        path: '',
        component: () => import('@/views/users/index'),
        name: 'users',
        meta: { title: 'Users', icon: 'icon-users', noCache: true }
      }
    ]
  },
  {
    path: '/monitor',
    component: Layout,
    children: [
      {
        path: '',
        name: 'units',
        component: () => import('@/views/monitor/units'),
        meta: { title: 'Units', icon: 'icon-cursor' }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/monitoring/table',
    // redirect: '/example/table',
    name: 'Monitoring',
    meta: { title: 'Monitoring has childs', icon: 'icon-eye' },
    children: [
      {
        path: 'new_trip',
        name: 'New Trip',
        component: () => import('@/views/table/index'),
        meta: { title: 'New Trip', icon: 'icon-plus-circle' }
      },
      {
        path: 'programming',
        name: 'Programming',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Monitoring', icon: 'icon-location-arrow' }
      },
      {
        path: 'convoy',
        name: 'Convoy',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Convoy', icon: 'icon-truck-moving' }
      },
      {
        path: 'high_risk_group',
        name: 'High Risk Group',
        component: () => import('@/views/tree/index'),
        meta: { title: 'High Risk Group', icon: 'icon-exclamation-triangle' }
      },
      {
        path: 'units',
        name: 'Units',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Units', icon: 'icon-cursor' }
      }
    ]
  },

  {
    path: '/catalogs',
    component: Layout,
    redirect: '/catalogs/notifications',
    name: 'Catalogs',
    meta: { title: 'Catalogs', icon: 'icon-docs' },
    children: [
      {
        path: 'notifications',
        name: 'Notifications',
        component: () => import('@/views/form/index'),
        meta: { title: 'Notifications', icon: 'icon-comments' }
      },
      {
        path: 'lines',
        name: 'Lines',
        component: () => import('@/views/form/index'),
        meta: { title: 'Lines', icon: 'icon-exchange-alt' }
      },
      {
        path: 'status',
        name: 'Status',
        component: () => import('@/views/form/index'),
        meta: { title: 'Status', icon: 'icon-clipboard-check' }
      },
      {
        path: 'notification_linking',
        name: 'Notification Linking',
        component: () => import('@/views/notification_linking/notiflink'),
        meta: { title: 'Notification Linking', icon: 'icon-form' }
      },
      {
        path: 'monitoring_assign',
        name: 'Monitoring Assign',
        component: () => import('@/views/monitoring_assign/assign'),
        meta: { title: 'Monitoring Assign', icon: 'icon-form' }
      }
    ]
  },
  {
    path: '/contacts',
    component: Layout,
    redirect: '/contacts',
    name: 'Contacts',
    meta: {
      title: 'Contacts',
      icon: 'icon-users'
    },
    children: [
      {
        path: '/contacts',
        component: () => import('@/views/operators/index'), // Parent router-view
        name: 'Operators',
        meta: { title: 'Operators' }
      }
    ]
  },
  {
    path: '/report',
    component: Layout,
    redirect: 'Report',
    meta: { title: 'General report', icon: 'icon-bar-chart', noCache: true },
    name: 'General Report',
    children: [
      {
        path: 'principal',
        component: () => import('@/views/general_report/genreport'),
        name: 'General report',
        meta: { title: 'General report', icon: 'icon-bar-chart', noCache: true }
      }
    ]
  },
  {
    path: '/user_settings',
    component: Layout,
    redirect: 'user_settings',
    children: [
      {
        path: '',
        component: () => import('@/views/user_settings/user_settings'),
        name: 'User Settings',
        meta: { title: 'User Settings', icon: 'icon-settings', noCache: true }
      }
    ]
  },
  {
    path: '/settings',
    component: Layout,
    redirect: 'settings',
    children: [
      {
        path: '',
        component: () => import('@/views/settings/settings'),
        name: 'System Settings',
        meta: { title: 'System Settings', icon: 'icon-settings', noCache: true }
      }
    ]
  },
  {
    path: '/notifications',
    component: Layout,
    redirect: 'notifications',
    children: [
      {
        path: '',
        component: () => import('@/views/notifications/index'),
        name: 'Create notification',
        meta: { title: 'Create Notification', icon: 'icon-settings', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
