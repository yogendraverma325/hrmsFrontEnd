import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { RootState } from '@/redux/reducers';
import { publishAnnoucements } from '@/redux/reducers/utilitesSlice';

const Announcements = () => {
  const Utils = useSelector((state: RootState) => state.utils);
  return Utils.annoucements ? <div>{Utils.annoucements}</div> : <></>;
};

export default Announcements;
