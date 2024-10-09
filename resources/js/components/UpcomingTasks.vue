<template>
  <div class="bg-white overflow-hidden shadow rounded-lg">
    <div class="p-5">
      <h3 class="text-lg leading-6 font-medium text-gray-900">Upcoming Tasks</h3>
      <div class="mt-6 flow-root">
        <ul class="-my-5 divide-y divide-gray-200">
          <li v-for="task in upcomingTasks" :key="task.id" class="py-4">
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <component :is="task.icon" class="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  {{ task.name }}
                </p>
                <p class="text-sm text-gray-500 truncate">
                  {{ task.time }}
                </p>
              </div>
              <div>
                <a href="#" class="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50">
                  View
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { PhoneIcon, UserGroupIcon, ClockIcon } from '@heroicons/vue/outline';

export default {
  name: 'UpcomingTasks',
  components: {
    PhoneIcon,
    UserGroupIcon,
    ClockIcon,
  },
  data() {
    return {
      upcomingTasks: [
        { id: 1, name: 'Call with John Doe', icon: PhoneIcon, time: 'In 30 minutes' },
        { id: 2, name: 'Team Meeting', icon: UserGroupIcon, time: 'Today at 2:00 PM' },
        { id: 3, name: 'Performance Review', icon: ClockIcon, time: 'Tomorrow at 10:00 AM' },
      ],
    };
  },
}
</script>