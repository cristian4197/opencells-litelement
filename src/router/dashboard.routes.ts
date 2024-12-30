import { RouteDefinition } from '@open-cells/core/types';

export const dashboardRoutes: RouteDefinition[] = [
  {
    path: '/dashboard/home',
    name: 'dashboard-home',
    component: 'dashboard-home-page',
    action: async () => {
      await import('../pages/dashboard/views/home/home-page.js');
    },
  },
  {
    path: '/dashboard/config',
    name: 'dashboard-config',
    component: 'dashboard-config-page',
    action: async () => {
      await import('../pages/dashboard/views/config/config-page.js');
    },
  },
  {
    path: '/dashboard/customers/add',
    name: 'dashboard-customers-add',
    component: 'dashboard-customers-add-page',
    action: async () => {
      await import('../pages/dashboard/views/customers/customers-add-page.js');
    },
  },
  {
    path: '/dashboard/customers/list',
    name: 'dashboard-customers-list',
    component: 'dashboard-customers-list-page',
    action: async () => {
      await import('../pages/dashboard/views/customers/customers-list-page.js');
    },
  },
  {
    path: '/dashboard/countries/list',
    name: 'dashboard-countries-list',
    component: 'dashboard-countries-list-page',
    action: async () => {
      await import('../pages/dashboard/views/countries/countries.page.js');
    },
  }

];
