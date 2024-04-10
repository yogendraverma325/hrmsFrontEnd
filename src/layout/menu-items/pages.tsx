// assets
import { IconKey } from '@tabler/icons-react';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// constant
export const icons = {
  HolidayVillageIcon,
  IconKey,
  AccessAlarmIcon,
  AssignmentIcon,
  AccountTreeIcon,
  WifiCalling3Icon,
  PersonSearchIcon,
  AttachMoneyIcon,
  DocumentScannerIcon,
  CalendarMonthIcon,
  TrendingUpIcon,
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
      icon: icons.HolidayVillageIcon,
    },
    {
      id: 'authentication',
      title: 'Attendance',
      type: 'item',
      icon: icons.AccessAlarmIcon,
    },
    {
      id: 'authentication',
      title: 'Task Box',
      type: 'item',
      icon: icons.AssignmentIcon,
    },
    {
      id: 'authentication',
      title: 'Organizarion',
      type: 'item',
      icon: icons.AccountTreeIcon,
    },
    {
      id: 'hrCareDesk',
      title: 'HR Care Desk',
      type: 'item',
      icon: icons.WifiCalling3Icon,
    },
    {
      id: 'recruitment',
      title: 'Recruitment',
      type: 'item',
      icon: icons.PersonSearchIcon,
    },
    {
      id: 'compensation',
      title: 'Compensation',
      type: 'item',
      icon: icons.AttachMoneyIcon,
    },
    {
      id: 'HRDocuments',
      title: 'HRDocuments',
      type: 'item',
      icon: icons.DocumentScannerIcon,
    },
    {
      id: 'performance',
      title: 'Performance',
      type: 'item',
      icon: icons.TrendingUpIcon,
    },
    {
      id: 'calendar',
      title: 'Calendar',
      type: 'item',
      icon: icons.CalendarMonthIcon,
    },
  ],
};

export default pages;
