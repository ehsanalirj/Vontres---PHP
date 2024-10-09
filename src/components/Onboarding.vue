<template>
  <div class="onboarding">
    <h2>Welcome to Vontres AI</h2>
    <div class="step-indicator">
      <div v-for="(step, index) in steps" :key="index" 
           :class="['step', { active: currentStep === index, completed: currentStep > index }]">
        {{ step.title }}
      </div>
    </div>
    <div class="step-content">
      <component :is="currentStepComponent" @next="nextStep" @prev="prevStep"></component>
    </div>
    <div class="navigation">
      <button @click="prevStep" :disabled="currentStep === 0">Previous</button>
      <button @click="nextStep" :disabled="currentStep === steps.length - 1">
        {{ currentStep === steps.length - 1 ? 'Finish' : 'Next' }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import WelcomeStep from './onboarding/WelcomeStep.vue';
import ProfileSetupStep from './onboarding/ProfileSetupStep.vue';
import FeatureOverviewStep from './onboarding/FeatureOverviewStep.vue';
import FinalStep from './onboarding/FinalStep.vue';

export default {
  setup() {
    const steps = [
      { title: 'Welcome', component: WelcomeStep },
      { title: 'Profile Setup', component: ProfileSetupStep },
      { title: 'Feature Overview', component: FeatureOverviewStep },
      { title: 'Get Started', component: FinalStep },
    ];

    const currentStep = ref(0);

    const currentStepComponent = computed(() => steps[currentStep.value].component);

    const nextStep = () => {
      if (currentStep.value < steps.length - 1) {
        currentStep.value++;
      }
    };

    const prevStep = () => {
      if (currentStep.value > 0) {
        currentStep.value--;
      }
    };

    return {
      steps,
      currentStep,
      currentStepComponent,
      nextStep,
      prevStep,
    };
  },
}
</script>

<style scoped>
.onboarding {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.step-indicator {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.step {
  flex: 1;
  text-align: center;
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
}

.step.active {
  background-color: #e0e0ff;
  font-weight: bold;
}

.step.completed {
  background-color: #e0ffe0;
}

.navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>