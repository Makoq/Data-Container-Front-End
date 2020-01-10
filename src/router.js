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



        {//about页面
          path: '/about',
          name: 'About',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
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
