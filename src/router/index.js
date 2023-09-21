import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';

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
    path: '/login/sess',
    beforeEnter: async (to, from, next) => {
      const storeUser = store.state.user;

      if (storeUser) {
        if (to.path !== '/dashboard/me') {
          return next('/dashboard/me');
        }
        return next();
      }

      try {
        await store.dispatch('fetchUserBySession');

        if (store.state.user) {
          return next('/dashboard/me');
        }

        return next({ path: '/' });
      } catch (error) {
        console.error("Error fetching user by session:", error);
        return next({ path: '/' });
      }
    }
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
  },
  {
    path: '/dashboard',
    component: () => import('../components/DashboardComponent.vue'),
    children: [
      {
        path: 'me',
        component: () => import('../components/MeComponent.vue')
      },
      {
        path: 'statistics',
        component: () => import('../components/MeComponent.vue')
      }
    ]
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (!store.state.sessionChecked && to.path !== '/login/sess') {
    next({ path: '/login/sess', query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router
