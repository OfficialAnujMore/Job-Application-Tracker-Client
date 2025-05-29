export const APP_NAME = process.env.REACT_APP_NAME || 'Application Tracker';
export const APP_VERSION = '1.0.0';

export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';
export const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY || 'app_token';
export const USER_KEY = process.env.REACT_APP_USER_KEY || 'app_user';

export const ROWS_PER_PAGE_OPTIONS = [5, 10, 25];
export const DEFAULT_ROWS_PER_PAGE = 10;

export const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship'] as const;

export const DATE_FORMAT = {
  display: {
    short: 'MMM d, yyyy',
    long: 'MMMM d, yyyy',
    withTime: 'MMM d, yyyy h:mm a',
  },
  input: 'yyyy-MM-dd',
};

export const SNACKBAR_AUTO_HIDE_DURATION = 6000;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  APPLICATION: '/application',
  APPLICATION_EDIT: '/application/:id',
} as const;

export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Session expired. Please login again.',
  NOT_FOUND: 'Resource not found.',
  VALIDATION: 'Please check your input.',
} as const;

export const SUCCESS_MESSAGES = {
  LOGIN: 'Successfully logged in',
  REGISTER: 'Successfully registered',
  APPLICATION_CREATE: 'Application created successfully',
  APPLICATION_UPDATE: 'Application updated successfully',
  APPLICATION_DELETE: 'Application deleted successfully',
} as const;

export const LOCAL_STORAGE_KEYS = {
  THEME: process.env.REACT_APP_THEME_KEY || 'app_theme',
  LANGUAGE: process.env.REACT_APP_LANGUAGE_KEY || 'app_language',
  SETTINGS: process.env.REACT_APP_SETTINGS_KEY || 'app_settings',
} as const;

export const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
} as const; 