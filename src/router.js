import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'

import Home from './views/Home.vue'
 

Vue.use(Router)

const router= new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      redirect:'/Home',
      component: Index,
      children:[
       
        {//home页面
          path: '/Home',
          name: 'Home',
          component: Home
        },
        {
          path:'/workSpace',
          name:'Workspace List: Manage your workspace',
          // 路由懒加载
          component:resolve=>require(['./views/WorkSpace.vue'],resolve)
        },
        {
          path:'/state',
          name:'Service State',
          // 路由懒加载
          component:resolve=>require(['./views/State.vue'],resolve)
        },
        {
          path:'/instance',
          name:'Instances List: Manage your service instances',
          //路由懒加载
          component:resolve=>require(['./views/Instances.vue'],resolve)
 
        },
        {
          path:'/form/:type',
          name:'Create Service: Create your service',
          component: () => import(/* webpackChunkName: "about" */ './views/FormInput.vue')
        },

        {//cluster
          path: '/cluster',
          name: 'Online Service Nodes',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/Cluster.vue')
        },
        {//about页面
          path: '/worldCluster',
          name: 'worldCluster',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/WorldNodes.vue')
        },


        {//cluster
          path: '/thematic',
          name: 'Thematic visualization',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/Thematic.vue')
        },
        {//about页面
          path: '/about',
          name: 'About',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {//about页面
          path: '/upload',
          name: 'Upload',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/Upload.vue')
        },
        {//UserInfo页面
          path:'/userInfo',
          name:'UserInfo',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/UserInfo.vue')
        }

      ]
    },
    
    
    {
      path: '/Login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "about" */ './views/user/Login.vue')
    },
    {
      path: '/Register',
      name: 'Register',
      component: () => import(/* webpackChunkName: "about" */ './views/user/Register.vue')
    },
    
  ]
});

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');
 
    if (token === 'null' || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});

export default router;
