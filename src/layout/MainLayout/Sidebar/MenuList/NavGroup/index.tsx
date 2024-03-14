// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, List, Typography } from '@mui/material';

// project imports
import NavItem from '../NavItem';
import NavCollapse from '../NavCollapse';

// ==============================|| SIDEBAR MENU LIST GROUP ||============================== //

const NavGroup = ({ item }:any) => {
  const theme = useTheme();

  // menu list collapse & items
  const items = item.children?.map((menu:any) => {
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
            <Typography variant="caption"  sx={{listStyleType: 'none'}} >
              {item.title}
              {item.caption && (
                <Typography variant="caption" sx={{listStyleType: 'none'}}>
                  {item.caption}
                </Typography>
              )}
            </Typography>
          )
        }
        sx={{
          paddingTop: 0,  // Remove top padding
          paddingBottom: 0, // Remove bottom padding
          paddingLeft: 0, // Remove left padding
          paddingRight: 0, // Remove right padding
          listStyleType: 'none'
        }}
      >
        {items}
      </List>
    </>
  );
};

export default NavGroup;
