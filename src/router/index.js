import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)
  const routes = [
  {
    path: '/',
    name: 'signup',
    component: () => import('../components/SignupComp.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/LoginComp.vue')
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('../components/ForgotPassword.vue')
  },
  {
    path: '/merge-account',
    name: 'merge-account',
    component: () => import('../components/MergeAccount.vue'),
    props: route => ({ errorCode: route.params.errorCode, mergeKey: route.params.mergeKey }),
    beforeEnter: (to, from, next) => {
      if (!to.params.errorCode || !to.params.mergeKey) {
        next('/');
      } else {
        next();
      }
    }
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
