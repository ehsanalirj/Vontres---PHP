import { AnyAction } from 'redux';

const initialState = {
  companyDetails: {},
  departments: [],
  roles: [],
  hierarchy: [],
  twilioSettings: {},
  openAISettings: {},
  scripts: [],
  emailSettings: {},
  setupProgress: 0,
};

const setupReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'SAVE_COMPANY_DETAILS':
      return { ...state, companyDetails: action.payload };
    case 'ADD_DEPARTMENT':
      return { ...state, departments: [...state.departments, action.payload] };
    case 'REMOVE_DEPARTMENT':
      return { ...state, departments: state.departments.filter(dept => dept !== action.payload) };
    case 'ADD_ROLE':
      return { ...state, roles: [...state.roles, action.payload] };
    case 'REMOVE_ROLE':
      return { ...state, roles: state.roles.filter(role => role.roleName !== action.payload) };
    case 'SAVE_HIERARCHY':
      return { ...state, hierarchy: action.payload };
    case 'SAVE_TWILIO_SETTINGS':
      return { ...state, twilioSettings: action.payload };
    case 'SAVE_OPENAI_SETTINGS':
      return { ...state, openAISettings: action.payload };
    case 'ADD_SCRIPT':
      return { ...state, scripts: [...state.scripts, action.payload] };
    case 'REMOVE_SCRIPT':
      return { ...state, scripts: state.scripts.filter(script => script.scriptName !== action.payload) };
    case 'SAVE_EMAIL_SETTINGS':
      return { ...state, emailSettings: action.payload };
    case 'SAVE_SETUP_PROGRESS':
      return { ...state, setupProgress: action.payload };
    default:
      return state;
  }
};

export default setupReducer;