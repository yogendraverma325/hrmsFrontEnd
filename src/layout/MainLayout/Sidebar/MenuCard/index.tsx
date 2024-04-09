// material-ui
import { styled } from '@mui/material/styles';
import {
  Avatar,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';

// assets
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import PersonPinIcon from '@mui/icons-material/PersonPin';

const CardStyle = styled(Card)(({ theme }) => ({
  background: '#b0b5b74a',
  marginBottom: '22px',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    // content: '""',
    position: 'absolute',
    width: '157px',
    height: '157px',
    borderRadius: '50%',
    top: '-105px',
    right: '-96px',
  },
}));

// ==============================|| SIDEBAR MENU Card ||============================== //

const MenuCard = ({ userDetails }: any) => {
  return (
    <CardStyle>
      <CardContent sx={{ p: 2 }}>
        <List sx={{ p: 0, m: 0 }}>
          <ListItem alignItems="flex-start" disableGutters sx={{ p: 0 }}>
            <ListItemAvatar sx={{ mt: 0 }}>
              <Avatar src="/src/assets/images/avatar.jpg">
                {userDetails ? (
                  <PersonPinIcon fontSize="inherit" />
                ) : (
                  <TableChartOutlinedIcon fontSize="inherit" />
                )}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              sx={{ mt: 0, color: 'white' }}
              primary={
                <Typography variant="subtitle1">
                  {userDetails
                    ? userDetails?.name.charAt(0).toUpperCase() +
                      userDetails?.name.slice(1)
                    : ' Get Extra Space'}
                </Typography>
              }
              secondary={
                <Typography variant="subtitle2" sx={{ fontSize: 10 }}>
                  {userDetails ? userDetails?.designation : '28/23 GB'}
                </Typography>
              }
            />
          </ListItem>
        </List>
      </CardContent>
    </CardStyle>
  );
};

export default MenuCard;
