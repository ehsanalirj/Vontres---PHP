import CallDashboard from './components/CallDashboard.vue';
import CallList from './components/CallList.vue';
import callStore from './store';
import callRoutes from './routes';

export default {
  name: 'call',
  routes: callRoutes,
  store: callStore,
  components: {
    CallDashboard,
    CallList,
  },
  init(app) {
    // Any initialization logic for the call module
    console.log('Call module initialized');
  }
};