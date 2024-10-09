<template>
  <div class="bg-gray-100 min-h-screen">
    <Sidebar />
    <div class="ml-64 p-8">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
      </header>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <QuickStats />
        <RecentCalls />
        <UpcomingTasks />
      </div>
      <div class="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CallAnalytics />
        <AgentPerformance />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue';
import QuickStats from './QuickStats.vue';
import RecentCalls from './RecentCalls.vue';
import UpcomingTasks from './UpcomingTasks.vue';
import CallAnalytics from './CallAnalytics.vue';
import AgentPerformance from './AgentPerformance.vue';

export default {
  name: 'Dashboard',
  components: {
    Sidebar,
    QuickStats,
    RecentCalls,
    UpcomingTasks,
    CallAnalytics,
    AgentPerformance,
  },
}
</script>