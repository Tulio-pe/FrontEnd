export const AppRoutes = {
  WORKSHOP: {
    ROOT: 'workshop',
    LOGIN: 'login',
    REGISTER: 'register',
    ONBOARDING:{
      ROOT: 'onboarding',
      INFO: 'info',
      SCHEDULE: 'schedule',
    },
    DASHBOARD: 'dashboard',
    CARS: 'cars',
    CONFIG: 'configuration',
  },
  PUBLIC: {
    WORKSHOP_LIST: 'workshops',
    WORKSHOP_DETAILS: 'workshops/:id',
    TRACKING_INPUT: 'car-tracking',
    TRACKING_DETAILS: 'car-tracking/:code',
  }
};
