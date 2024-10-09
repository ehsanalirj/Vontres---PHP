<template>
  <div class="ai-assistant">
    <h3>AI Suggestions</h3>
    <ul v-if="suggestions.length">
      <li v-for="suggestion in suggestions" :key="suggestion">{{ suggestion }}</li>
    </ul>
    <p v-else>{{ statusMessage }}</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import AIService from '@/services/AIService';

export default {
  props: {
    callData: Object,
  },
  setup(props) {
    const suggestions = ref([]);
    const statusMessage = ref('Loading suggestions...');

    onMounted(async () => {
      try {
        suggestions.value = await AIService.getCallSuggestions(props.callData);
        if (suggestions.value.length === 0) {
          statusMessage.value = 'No suggestions available at this time.';
        }
      } catch (error) {
        console.error('Error in AI Assistant:', error);
        statusMessage.value = 'Unable to load suggestions. Using basic assistance.';
        suggestions.value = AIService.getRuleBasedSuggestions(props.callData);
      }
    });

    return {
      suggestions,
      statusMessage,
    };
  },
}
</script>