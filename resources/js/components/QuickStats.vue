<template>
  <div class="bg-white overflow-hidden shadow rounded-lg">
    <div class="p-5">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <PhoneIcon class="h-6 w-6 text-gray-400" aria-hidden="true" />
        </div>
        <div class="ml-5 w-0 flex-1">
          <dl>
            <dt class="text-sm font-medium text-gray-500 truncate">
              Total Calls Today
            </dt>
            <dd>
              <div class="text-lg font-medium text-gray-900">
                {{ totalCalls }}
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <div class="bg-gray-50 px-5 py-3">
      <div class="text-sm">
        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
          View all<span class="sr-only"> stats</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { PhoneIcon } from '@heroicons/vue/outline';

export default {
  name: 'QuickStats',
  components: {
    PhoneIcon,
  },
  data() {
    return {
      totalCalls: 145,
    };
  },
}
</script>