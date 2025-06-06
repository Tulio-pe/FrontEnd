export const AppRoutes = {
  WORKSHOP: {
    ROOT: 'workshop',
    LOGIN: 'workshop/login',
    REGISTER: 'workshop/register',
    ONBOARDING_INFO: 'workshop/onboarding/info',
    ONBOARDING_SCHEDULE: 'workshop/onboarding/schedule',
    DASHBOARD: 'workshop/dashboard',
    CARS: 'workshop/cars',
    CONFIG: 'workshop/configuration',
  },
  PUBLIC: {
    WORKSHOP_LIST: 'workshops',
    WORKSHOP_DETAILS: 'workshops/:id',
    TRACKING_INPUT: 'tracking',
    TRACKING_DETAILS: 'tracking/:code',
  }
};
