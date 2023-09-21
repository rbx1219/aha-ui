import { getUserBySession } from '@/api/getUserBySession.js';
import { login } from '@/api/login.js';
import { logout } from '@/api/logout.js';
import { mergeAccounts } from '@/api/merge.js';
import { signup } from '@/api/signup.js';
import { getActive, getDashboardUsers } from '@/api/statistics';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    sessionChecked: false,
    dashboardUsers: null,
    activeStats: null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_CHECKED_SESSION(state) {
      state.sessionChecked = true;
    },
    SET_DASHBOARD_USERS(state, users) {
      state.dashboardUsers = users;
    },
    SET_ACTIVE_STATS(state, stats) {
      state.activeStats = stats;
    }
  },
  actions: {
    setUser({ commit }, user) {
      commit('SET_USER', user);
    },
    async fetchUserBySession({commit, state}) {
      if (state.sessionChecked && state.user) {
        return;
      }

      try {
        const response = await getUserBySession();
        const {user} = response;

        if (user && user.id) {
          commit('SET_USER', user);
        }
        commit('SET_CHECKED_SESSION', true);
      } catch (error) {
        commit('SET_CHECKED_SESSION', true);
        console.error("fetchUser failed:", error.message);
      }
    },
    async handleSignup({ commit }, userData) {
      try {
        const response = await signup(userData);

        console.log(response, commit);
        return response;
    } catch (error) {
        console.error("Signup failed:", error.message);
        throw error;
    }

    },
    async handleLogin({ commit }, userData) {
      try {
        const response = await login(userData);

        console.log(response, commit);

      } catch (error) {
        console.error("Login failed:", error.message);
        throw error;
      }
    },
    async mergeUserAccounts({ commit }, { errorCode, mergeKey }) {
      try {
          const response = await mergeAccounts(errorCode, mergeKey);

          if (response.success) {
            console.log(response, commit);

            return response;
          } else {
              throw new Error(response.message);
          }
      } catch (error) {
          console.error("Account merge failed:", error.message);
          throw error;
      }
    },
    async fetchUsers({ state, commit }, force = false) {
      if (!state.users || force) {
        const response = await getDashboardUsers();

        commit('SET_DASHBOARD_USERS', response.users);
      }
    },
    async fetchActive({ state, commit }, force = false) {
      if (!state.activeSessions || force)
      {
        const response = await getActive();

        commit('SET_ACTIVE_STATS', response);
      }
    },
    async handleLogout({ commit }, userData) {
      try {
        const response = await logout(userData);

        console.log(response, commit);
        // commit('SET_USER', null);
        // commit('SET_CHECKED_SESSION', false);

      } catch (error) {
        console.error("Logout failed:", error.message);
        throw error;
      }
    },
  },
  getters: {
    user: state => state.user,
    isAuthenticated: state => !!state.user,
    totalUsers: state => state.activeStats?.totalUsers || 0,
    activeSessionsToday: state => state.activeStats?.todayActiveUsers || 0,
    averageSessionsLast7Days: state => state.activeStats?.avgLast7DaysActiveUsers || 0
  }
});