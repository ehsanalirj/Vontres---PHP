import { encrypt, decrypt } from '@/utils/encryption';

const state = {
  user: null,
};

const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
};

const actions = {
  login({ commit }, userData) {
    // Encrypt sensitive data before storing
    const encryptedUser = encrypt(userData);
    localStorage.setItem('user', encryptedUser);
    commit('SET_USER', userData);
  },
  logout({ commit }) {
    localStorage.removeItem('user');
    commit('SET_USER', null);
  },
  initializeUser({ commit }) {
    const encryptedUser = localStorage.getItem('user');
    if (encryptedUser) {
      const user = decrypt(encryptedUser);
      commit('SET_USER', user);
    }
  },
};

export default {
  state,
  mutations,
  actions,
};