<template>
  <nav class="sidebar">
    <div class="logo">
      <img src="@/assets/logo.svg" alt="Vontres AI Logo">
    </div>
    <ul class="nav-items">
      <li v-for="item in navItems" :key="item.id">
        <router-link :to="item.path" :class="{ active: isActive(item.path) }">
          <i :class="item.icon"></i>
          <span>{{ item.label }}</span>
        </router-link>
      </li>
    </ul>
    <div class="user-info">
      <img :src="user.avatar" :alt="user.name">
      <span>{{ user.name }}</span>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const route = useRoute();

    const navItems = computed(() => store.state.navigation.items);
    const user = computed(() => store.state.auth.user);

    const isActive = (path) => route.path.startsWith(path);

    return {
      navItems,
      user,
      isActive,
    };
  },
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
}

.nav-items {
  list-style-type: none;
  padding: 0;
}

.nav-items li a {
  display: flex;
  align-items: center;
  padding: 10px;
  color: white;
  text-decoration: none;
  transition: background-color 0.3s;
}

.nav-items li a:hover,
.nav-items li a.active {
  background-color: #34495e;
}

.nav-items li a i {
  margin-right: 10px;
}

.user-info {
  position: absolute;
  bottom: 20px;
  display: flex;
  align-items: center;
}

.user-info img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>