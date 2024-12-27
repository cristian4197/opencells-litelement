import { RouteDefinition } from '@open-cells/core/types'; 
import { dashboardRoutes } from './dashboard.routes.js';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    name: 'login',
    component: 'login-page',
    action: async () => {
      await import('../pages/login/login-page.js');
    },
  },
    ...dashboardRoutes
];
