import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from '@mui/material';

// project imports
import { MENU_OPEN, SET_MENU } from '../../../../../redux/reducers/actions';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { RootState } from '../../../../../redux/reducers';
import pxToRem from '@/themes/functions/pxToRem';

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem = ({ item, level }: any) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const customization = useSelector((state: RootState) => state.customization);
  const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

  const Icon = item.icon;
  const itemIcon = item?.icon ? (
    <Icon stroke={1.5} size="1.3rem" />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width:
          customization.isOpen.findIndex((id: string) => id === item?.id) > -1 ? 8 : 6,
        height:
          customization.isOpen.findIndex((id: string) => id === item?.id) > -1 ? 8 : 6,
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  let listItemProps = {
    component: forwardRef((props, ref) => (
      <Link ref={ref as null} {...props} to={item.url} target={itemTarget} />
    )),
  };
  if (item?.external) {
    listItemProps = { component: 'a', href: item.url, target: itemTarget };
  }

  const itemHandler = (id: string) => {
    dispatch({ type: MENU_OPEN, id });
    if (matchesSM) dispatch({ type: SET_MENU, opened: false });
  };

  // active menu item on page load
  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split('/')
      .findIndex((id) => id === item.id);
    if (currentIndex > -1) {
      dispatch({ type: MENU_OPEN, id: item.id });
    }
    // eslint-disable-next-line
  }, [pathname]);

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      sx={{
        borderRadius: `${customization.borderRadius}px`,
        // mb: 0.5,
        alignItems: 'flex-start',
        backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
        py: level > 1 ? 1 : 1.25,
        pl: `${level * 24}px`,
        fontSize: pxToRem(8),
      }}
      selected={customization.isOpen.findIndex((id: string) => id === item.id) > -1}
      onClick={() => itemHandler(item.id)}
    >
      <ListItemIcon sx={{ my: '10px', minWidth: !item?.icon ? 18 : 36, color: 'white' }}>
        {itemIcon}
      </ListItemIcon>
      <ListItemText
        sx={{ paddingLeft: 0, listStyleType: 'none' }}
        primary={
          <Typography
            variant={
              customization.isOpen.findIndex((id: String) => id === item.id) > -1
                ? 'h6'
                : 'body1'
            }
            color="inherit"
          >
            {item.title}
          </Typography>
        }
      />
    </ListItemButton>
  );
};

export default NavItem;
