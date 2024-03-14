// assets
import { IconKey } from '@tabler/icons-react';

// constant
const icons = {
  IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: '',
  caption: '',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Employees',
      type: 'collapse',
      icon: icons.IconKey,
      children: [
        {
          id: 'login3',
          title: 'Add Employee',
          type: 'item',
          url: '/pages/login/login3',
          target: true
        },
        {
          id: 'register3',
          title: 'Update Employee',
          type: 'item',
          url: '/pages/register/register3',
          target: true
        }
      ]
    }
  ]
};

export default pages;
