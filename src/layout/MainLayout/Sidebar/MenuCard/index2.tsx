// material-ui
import { styled } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';

import { convertTimeStampToDate } from '@/utils/DateConverter';
// assets
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import SubCard from '@/components/Cards/SubCard';
import { gridSpacing } from '@/redux/constant';
import userProfileIcon from '../../../../assets/images/avatar.jpg';

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

const MenuCard2 = ({ userDetails }: any) => {
  return (
    <Card sx={{ backgroundColor: '#0000', color: 'white'}}>
      <CardContent sx={{ padding: '15px 15px', paddingBottom: '20px'}}>
        {/* <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '4px',
          }}
        >
          <Avatar sx={{ height: 50, width: 50 }} src={userProfileIcon} color="inherit" />
        </Box> */}

        <Stack flexDirection="column" justifyContent="center" alignItems="center">
          <Typography variant="subtitle1" textAlign="center" sx={{  fontWeight: '900' }}>
            {userDetails
              ? userDetails?.name.charAt(0).toUpperCase() + userDetails?.name.slice(1)
              : ' Get Extra Space'}
          </Typography>
          <Typography variant="subtitle2" sx={{ fontSize: 10 }}>
            {userDetails ? userDetails?.designation : '28/23 GB'}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontSize: 9 }}>
            Last Login: {convertTimeStampToDate(userDetails?.lastLogin)}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default MenuCard2;
