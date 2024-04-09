// material-ui
import { Divider, List, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import pxToRem from '@/themes/functions/pxToRem';

import NavCollapse from '../NavCollapse';
// project imports
import NavItem from '../NavItem';

// ==============================|| SIDEBAR MENU LIST GROUP ||============================== //

const NavGroup = ({ item }: any) => {
  const theme = useTheme();

  // menu list collapse & items
  const items = item.children?.map((menu: any) => {
    switch (menu.type) {
      case 'collapse':
        return <NavCollapse key={menu.id} menu={menu} level={1} />;
      case 'item':
        return <NavItem key={menu.id} item={menu} level={1} />;
      default:
        return (
          <Typography key={menu.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return (
    <>
      <List
        subheader={
          item.title && (
            <Typography
              variant="caption"
              sx={{
                listStyleType: 'none',
                ml: 3,
                fontSize: '11px',
                display: 'block',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: '#b2aeae',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                },
              }}
            >
              {item.title}
              {item.caption && (
                <Typography
                  variant="caption"
                  sx={{
                    listStyleType: 'none',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    },
                  }}
                >
                  {item.caption}
                </Typography>
              )}
            </Typography>
          )
        }
        sx={{
          paddingTop: 0, // Remove top padding
          paddingBottom: 0, // Remove bottom padding
          paddingLeft: 0, // Remove left padding
          paddingRight: 0, // Remove right padding
          listStyleType: 'none',
          '.MuiListItemButton': {
            my: 0,
          },
          '.MuiListItemIcon-root': {
            // display: 'none',
            my: 0,
          },
          '.MuiListItemText-root > .MuiTypography-root': {
            my: 0,
            fontSize: '14px',
          },
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
          },
        }}
      >
        {items}
      </List>
    </>
  );
};

export default NavGroup;
