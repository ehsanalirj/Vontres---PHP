<template>
  <div class="fixed left-0 top-0 w-64 h-full bg-white shadow-lg">
    <div class="flex items-center justify-center h-16 border-b">
      <img src="/images/logo.svg" alt="Vontres AI" class="h-8">
    </div>
    <nav class="mt-6">
      <a v-for="item in menuItems" :key="item.name" :href="item.href" :class="[
        item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
        'group flex items-center px-4 py-2 text-sm font-medium'
      ]">
        <component :is="item.icon" :class="[
          item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
          'mr-3 flex-shrink-0 h-6 w-6'
        ]" aria-hidden="true" />
        {{ item.name }}
      </a>
    </nav>
  </div>
</template>

<script>
import { HomeIcon, PhoneIcon, UserGroupIcon, ChartBarIcon, CogIcon } from '@heroicons/vue/outline';

export default {
  name: 'Sidebar',
  components: {
    HomeIcon,
    PhoneIcon,
    UserGroupIcon,
    ChartBarIcon,
    CogIcon,
  },
  data() {
    return {
      menuItems: [
        { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
        { name: 'Calls', href: '#', icon: PhoneIcon, current: false },
        { name: 'Agents', href: '#', icon: UserGroupIcon, current: false },
        { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
        { name: 'Settings', href: '#', icon: CogIcon, current: false },
      ],
    };
  },
}
</script>