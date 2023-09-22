import Vue from 'vue';
import Router from 'vue-router';

import ForgotPassword from '@/components/ForgotPassword.vue';
import MeComponent from '@/components/MeComponent.vue';
import ResetPassword from '@/components/ResetPassword.vue';
import StatisticsComponent from '@/components/StatisticsComponent.vue';
import Login from '@/components/UserLogin.vue';
import UserMerge from '@/components/UserMerge.vue';
import Signup from '@/components/UserSignup.vue';
import UserVerify from '@/components/UserVerify.vue';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import store from '@/store';

Vue.use(Router);

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', redirect: '/login' },
      { path: 'login', name: 'login', component: Login },
      { path: 'signup', component: Signup },
      { path: 'forgot-password', component: ForgotPassword },
      { path: 'reset-password', component: ResetPassword },
      { path: 'logout', beforeEnter: async () => {
          try {
            await store.dispatch('handleLogout');
            window.location.reload();
          } catch (err) {
            console.log(err);
          }
        }
      },
      {
        path: 'merge',
        name: 'merge-account',
        component: UserMerge,
        props: route => ({
          errorCode: parseInt(route.query.errCode, 10),
          mergeKey: route.query.mergeKey
        })
      },
    ]
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      { path: '', redirect: 'statistics' },
      { path: 'statistics', name: 'statistics', component: StatisticsComponent },
      { path: 'me', component: MeComponent },
      { path: 'verify', name: 'verify', component: UserVerify }
    ]
  }
];

const router = new Router({
  mode: 'history',
  routes
});

router.beforeEach(async (to, from, next) => {
  await store.dispatch('fetchUserBySession');
  const hasSession = store.state.user !== null;

  if (!hasSession) {
    if (['/login', '/signup', '/forgot-password', '/reset-password', '/merge'].includes(to.path)) {
      return next();
    } else {
      return next('/login');
    }
  }

  const user = store.state.user;

  // Allow logout regardless of verification status
  if (to.path.startsWith('/logout')) {
    return next();
  }

  // Handle unverified users.
  if (!user.isVerified) {
    if (to.path === '/dashboard/verify') {
      return next();
    } else {
      return next('/dashboard/verify');
    }
  }

  // For verified users.
  if (to.path.startsWith('/dashboard')) {
    return next();
  } else {
    return next('/dashboard/statistics');
  }
});

export default router;
