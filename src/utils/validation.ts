import * as Yup from 'yup';

export const companyDetailsSchema = Yup.object().shape({
  name: Yup.string().required('Company name is required'),
  website: Yup.string().url('Must be a valid URL'),
  customDomain: Yup.string().matches(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/, 'Invalid domain format'),
});

export const twilioSettingsSchema = Yup.object().shape({
  accountSid: Yup.string().required('Account SID is required'),
  authToken: Yup.string().required('Auth Token is required'),
  phoneNumber: Yup.string().matches(/^\+[1-9]\d{1,14}$/, 'Invalid phone number format'),
});

// Add more validation schemas for other setup steps