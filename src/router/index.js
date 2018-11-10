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
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  },
  {
    path: '/users',
    component: Layout,
    children: [
      {
        path: 'users',
        component: () => import('@/views/users/index'),
        name: 'Users',
        meta: { title: 'Users', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/monitor',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Units',
        component: () => import('@/views/monitor/units'),
        meta: { title: 'Units', icon: 'example' }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/monitoring/table',
    // redirect: '/example/table',
    name: 'Monitoring',
    meta: { title: 'Monitoring', icon: 'example' },
    children: [
      {
        path: 'new_trip',
        name: 'New Trip',
        component: () => import('@/views/table/index'),
        meta: { title: 'New Trip', icon: 'table' }
      },
      {
        path: 'programming',
        name: 'Programming',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Monitoring', icon: 'tree' }
      },
      {
        path: 'convoy',
        name: 'Convoy',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Convoy', icon: 'tree' }
      },
      {
        path: 'high_risk_group',
        name: 'High Risk Group',
        component: () => import('@/views/tree/index'),
        meta: { title: 'High Risk Group', icon: 'tree' }
      },
      {
        path: 'units',
        name: 'Units',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Units', icon: 'tree' }
      }
    ]
  },

  {
    path: '/catalogs',
    component: Layout,
    redirect: '/monitoring/table',
    // redirect: '/example/table',
    name: 'Catalogs',
    meta: { title: 'Catalogs', icon: 'example' },
    children: [
      {
        path: 'index',
        name: 'Catalogs',
        component: () => import('@/views/form/index'),
        meta: { title: 'Catalogs', icon: 'form' }
      },
      {
        path: 'operators',
        name: 'Operators',
        component: () => import('@/views/form/index'),
        meta: { title: 'Operators', icon: 'form' }
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: () => import('@/views/form/index'),
        meta: { title: 'Notifications', icon: 'form' }
      },
      {
        path: 'units',
        name: 'Units',
        component: () => import('@/views/form/index'),
        meta: { title: 'Units', icon: 'form' }
      },
      {
        path: 'lines',
        name: 'Lines',
        component: () => import('@/views/form/index'),
        meta: { title: 'Lines', icon: 'form' }
      },
      {
        path: 'status',
        name: 'Status',
        component: () => import('@/views/form/index'),
        meta: { title: 'Status', icon: 'form' }
      },
      {
        path: 'notification_linking',
        name: 'Notification Linking',
        component: () => import('@/views/form/index'),
        meta: { title: 'Notification Linking', icon: 'form' }
      },
      {
        path: 'monitoring_assign',
        name: 'Monitoring Assign',
        component: () => import('@/views/form/index'),
        meta: { title: 'Monitoring Assign', icon: 'form' }
      }
    ]
  },
  {
    path: '/contacts',
    component: Layout,
    redirect: '/contacts/menu1',
    name: 'Contacts',
    meta: {
      title: 'Contacts',
      icon: 'nested'
    },
    children: [
      {
        path: 'operators',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Operators',
        meta: { title: 'Operators' }
      }
    ]
  },
  {
    path: 'users',
    component: Layout,
    redirect: '/contacts/menu1',
    name: 'Users',
    meta: {
      title: 'Users',
      icon: 'nested'
    }
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
