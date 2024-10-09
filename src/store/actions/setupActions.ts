export const saveSetupProgress = (step: number) => async (dispatch: Dispatch) => {
  try {
    await api.post('/setup/save-progress', { step });
    dispatch({ type: 'SAVE_SETUP_PROGRESS', payload: step });
  } catch (error) {
    console.error('Error saving setup progress:', error);
  }
};

export const loadSetupProgress = () => async (dispatch: Dispatch) => {
  try {
    const response = await api.get('/setup/load-progress');
    dispatch({ type: 'LOAD_SETUP_PROGRESS', payload: response.data.step });
  } catch (error) {
    console.error('Error loading setup progress:', error);
  }
};