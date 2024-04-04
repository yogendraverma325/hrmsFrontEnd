// assets
import { IconKey } from '@tabler/icons-react';

// constant
const icons = {
  IconKey,
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
      title: 'Leave',
      type: 'item',
      icon: icons.IconKey,
    },
    {
      id: 'authentication',
      title: 'Attendance',
      type: 'item',
      icon: icons.IconKey,
    },
    {
      id: 'authentication',
      title: 'Task',
      type: 'item',
      icon: icons.IconKey,
    },
    {
      id: 'authentication',
      title: 'Organizarion',
      type: 'item',
      icon: icons.IconKey,
    },
  ],
};

export default pages;
