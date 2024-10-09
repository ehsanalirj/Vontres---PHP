<template>
  <div class="dashboard">
    <sidebar />
    <div class="main-content">
      <header>
        <h1>{{ pageTitle }}</h1>
        <quick-actions />
      </header>
      <div class="widget-area">
        <draggable v-model="widgets" @end="saveWidgetLayout">
          <component 
            v-for="widget in widgets" 
            :key="widget.id" 
            :is="widget.component"
          />
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import draggable from 'vuedraggable';
import Sidebar from './Sidebar.vue';
import QuickActions from './QuickActions.vue';
import { useStore } from 'vuex';

export default {
  components: {
    Sidebar,
    QuickActions,
    draggable,
    // Import all widget components
    CallVolumeWidget: () => import('./widgets/CallVolumeWidget.vue'),
    AgentPerformanceWidget: () => import('./widgets/AgentPerformanceWidget.vue'),
    // ... other widgets
  },
  setup() {
    const store = useStore();
    const widgets = ref(store.state.userPreferences.dashboardWidgets);

    const pageTitle = computed(() => store.state.currentPage.title);

    const saveWidgetLayout = () => {
      store.dispatch('saveWidgetLayout', widgets.value);
    };

    return {
      widgets,
      pageTitle,
      saveWidgetLayout,
    };
  },
}
</script>

<style scoped>
.dashboard {
  display: flex;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
}

.widget-area {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
</style>