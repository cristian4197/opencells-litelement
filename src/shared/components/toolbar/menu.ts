export interface MenuItem {
  name: string;
  path: string;
  icon: string;
}

export const getMenuItems = (): MenuItem[] => [
  { name: 'Inicio', path: 'dashboard-home', icon: '../../icons/home.svg' },
  { name: 'Nuevo Cliente', path: 'dashboard-customers-add', icon: '../../icons/customer-add.svg' },
  { name: 'Consultar Clientes', path: 'dashboard-customers-list', icon: '../../icons/customer-list.svg' },
  { name: 'Consultar Países', path: 'dashboard-countries-list', icon: '../../icons/countries.svg' },
  { name: 'Configurar', path: 'dashboard-config', icon: '../../icons/config.svg' },
  { name: 'Cerrar Sesión', path: 'login', icon: '../../icons/logout.svg' }
];
