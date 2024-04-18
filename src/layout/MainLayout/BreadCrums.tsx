import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useSelector } from 'react-redux';
import HomeIcon from '@mui/icons-material/Home';
import GrainIcon from '@mui/icons-material/Grain';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/redux/reducers';
export default function BreadCrums() {
  const Utils = useSelector((state: RootState) => state.utils);
  const navigate = useNavigate();
  const handleListItemClick = (URLData: string) => {
    navigate(URLData);
  };
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          onClick={() => {
            handleListItemClick('/dashbaord');
          }}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Dashboard
        </Link>
        <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
          {Utils.breadCrum}
        </Typography>
      </Breadcrumbs>
    </div>
  );
}
