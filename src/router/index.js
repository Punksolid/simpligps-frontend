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
    // redirect: '/',
    name: 'Dashboard',
    hidden: false,
    meta: { title: 'Dashboard', icon: 'icon-home', noCache: true },

    children: [{
      path: '/',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'icon-home', noCache: true },
      name: 'Dashboard'
    }]
  },
  {
    path: '/catalogs',
    // redirect: '/catalogs/notifications',
    name: 'Catalogs',
    meta: { title: 'Catalogs has childs', icon: 'icon-docs' },
    component: Layout,
    hidden: false,
    children: [
      {
        name: 'Notifications',
        component: () => import('@/views/form/index'),
        path: '/catalogs/notifications',
        meta: { title: 'Notifications', icon: 'icon-comments' }
      },
      {
        path: '/catalogs/units',
        name: 'Units Catalog',
        component: () => import('@/views/form/index'),
        meta: { title: 'Units', icon: 'icon-truck' }
      },
      {
        path: '/catalogs/notification_linking',
        name: 'Notification Linking',
        component: () => import('@/views/notification_linking/notiflink'),
        meta: { title: 'Notification Linking', icon: 'icon-form' }
      },
      {
        path: '/catalogs/monitoring_assign',
        name: 'Monitoring Assign',
        component: () => import('@/views/monitoring_assign/assign'),
        meta: { title: 'Monitoring Assign', icon: 'icon-form' }
      }
    ]
  },
  {
    hidden: false,
    path: '/create_notification',
    component: Layout,
    name: 'Create notification',
    meta: { title: 'Create Notification', icon: 'icon-settings', noCache: true },
    children: [{
      hidden: false,
      path: '/create_notification',
      component: () => import('@/views/notifications/index'),
      name: 'Create notification',
      meta: { title: 'Create Notification', icon: 'icon-settings', noCache: true }
    }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
