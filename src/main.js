import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { registerModules } from './plugins';

const app = createApp(App);

app.use(router);
app.use(store);

registerModules(app);

app.mount('#app');