import { getData, storeData, removeData } from './offlineStorage';
import api from './api';

export const syncData = async () => {
  try {
    // Sync calls
    const offlineCalls = await getData('offlineCalls') || [];
    for (const call of offlineCalls) {
      await api.post('/calls', call);
    }
    await removeData('offlineCalls');

    // Sync analytics
    const offlineAnalytics = await getData('offlineAnalytics') || [];
    for (const analytic of offlineAnalytics) {
      await api.post('/analytics', analytic);
    }
    await removeData('offlineAnalytics');

    // Fetch and store latest data
    const calls = await api.get('/calls');
    await storeData('calls', calls.data);

    const analytics = await api.get('/analytics');
    await storeData('analytics', analytics.data);

  } catch (error) {
    console.error('Error syncing data:', error);
  }
};