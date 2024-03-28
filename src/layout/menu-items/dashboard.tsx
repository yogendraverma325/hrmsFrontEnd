// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'MAIN',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashbaord',
      icon: icons.IconDashboard,
      breadcrumbs: false,
      external: true,
      target: true,
    },
  ],
};

export default dashboard;
