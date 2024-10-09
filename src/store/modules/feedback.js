import api from '@/api';

const state = {
  feedbackList: [],
};

const mutations = {
  ADD_FEEDBACK(state, feedback) {
    state.feedbackList.push(feedback);
  },
};

const actions = {
  async submitFeedback({ commit }, feedbackData) {
    try {
      const response = await api.post('/feedback', feedbackData);
      commit('ADD_FEEDBACK', response.data);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  },
};

export default {
  state,
  mutations,
  actions,
};