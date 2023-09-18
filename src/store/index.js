import { login } from '@/api/login.js';
import { mergeAccounts } from '@/api/merge.js';
import { signup } from '@/api/signup.js';
import { getUserBySession } from '@/api/getUserBySession.js'
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    sessionChecked: false,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_CHECKED_SESSION(state) {
      state.sessionChecked = true;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit('SET_USER', user);
    },
    async fetchUserBySession({commit}) {
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
        throw error;
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
    }
  },
  getters: {
    user: state => state.user,
    isAuthenticated: state => !!state.user,
  }
});