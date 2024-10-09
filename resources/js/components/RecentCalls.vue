<template>
  <div class="bg-white overflow-hidden shadow rounded-lg">
    <div class="p-5">
      <h3 class="text-lg leading-6 font-medium text-gray-900">Recent Calls</h3>
      <div class="mt-6 flow-root">
        <ul class="-my-5 divide-y divide-gray-200">
          <li v-for="call in recentCalls" :key="call.id" class="py-4">
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <img class="h-8 w-8 rounded-full" :src="call.customerAvatar" alt="" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  {{ call.customerName }}
                </p>
                <p class="text-sm text-gray-500 truncate">
                  {{ call.duration }} • {{ call.time }}
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
export default {
  name: 'RecentCalls',
  data() {
    return {
      recentCalls: [
        { id: 1, customerName: 'John Doe', customerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', duration: '5m 23s', time: '2 hours ago' },
        { id: 2, customerName: 'Jane Smith', customerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', duration: '3m 45s', time: '3 hours ago' },
        { id: 3, customerName: 'Bob Johnson', customerAvatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', duration: '8m 12s', time: '5 hours ago' },
      ],
    };
  },
}
</script>