<template>
  <div class="beta-feedback">
    <button @click="showFeedbackForm = true">Beta Feedback</button>
    <modal v-if="showFeedbackForm" @close="showFeedbackForm = false">
      <h3>Beta Tester Feedback</h3>
      <form @submit.prevent="submitFeedback">
        <div>
          <label for="featureUsed">Feature Used</label>
          <select v-model="featureUsed" id="featureUsed" required>
            <option value="callCenter">Call Center</option>
            <option value="aiAssistant">AI Assistant</option>
            <option value="reporting">Reporting</option>
            <!-- Add more options as needed -->
          </select>
        </div>
        <div>
          <label for="rating">Rating (1-5)</label>
          <input type="number" v-model="rating" id="rating" min="1" max="5" required>
        </div>
        <div>
          <label for="feedback">Detailed Feedback</label>
          <textarea v-model="feedback" id="feedback" required></textarea>
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
import { logEvent } from '@/utils/logger';

export default {
  components: { Modal },
  setup() {
    const store = useStore();
    const showFeedbackForm = ref(false);
    const featureUsed = ref('');
    const rating = ref(3);
    const feedback = ref('');

    const submitFeedback = () => {
      store.dispatch('submitBetaFeedback', {
        featureUsed: featureUsed.value,
        rating: rating.value,
        feedback: feedback.value,
      });
      logEvent('beta_feedback_submitted', {
        featureUsed: featureUsed.value,
        rating: rating.value,
      });
      showFeedbackForm.value = false;
      featureUsed.value = '';
      rating.value = 3;
      feedback.value = '';
    };

    return {
      showFeedbackForm,
      featureUsed,
      rating,
      feedback,
      submitFeedback,
    };
  },
}
</script>