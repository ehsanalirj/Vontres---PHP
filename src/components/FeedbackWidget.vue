<template>
  <div class="feedback-widget">
    <button @click="showFeedbackForm = true">Give Feedback</button>
    <modal v-if="showFeedbackForm" @close="showFeedbackForm = false">
      <h3>We'd love to hear your thoughts!</h3>
      <form @submit.prevent="submitFeedback">
        <div>
          <label for="feedbackType">Type of Feedback</label>
          <select v-model="feedbackType" id="feedbackType" required>
            <option value="bug">Bug Report</option>
            <option value="feature">Feature Request</option>
            <option value="general">General Feedback</option>
          </select>
        </div>
        <div>
          <label for="feedbackContent">Your Feedback</label>
          <textarea v-model="feedbackContent" id="feedbackContent" required></textarea>
        </div>
        <button type="submit">Submit Feedback</button>
      </form>
    </modal>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import Modal from './Modal.vue';

export default {
  components: { Modal },
  setup() {
    const store = useStore();
    const showFeedbackForm = ref(false);
    const feedbackType = ref('');
    const feedbackContent = ref('');

    const submitFeedback = () => {
      store.dispatch('submitFeedback', {
        type: feedbackType.value,
        content: feedbackContent.value,
      });
      showFeedbackForm.value = false;
      feedbackType.value = '';
      feedbackContent.value = '';
    };

    return {
      showFeedbackForm,
      feedbackType,
      feedbackContent,
      submitFeedback,
    };
  },
}
</script>