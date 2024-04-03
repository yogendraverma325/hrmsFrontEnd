import React from 'react';
import { Outlet } from 'react-router-dom';
import { publishAnnoucements } from '@/redux/reducers/utilitesSlice';
import { RootState } from '@/redux/reducers';
import { useDispatch, useSelector } from 'react-redux';

const Announcements = () => {
  const Utils = useSelector((state: RootState) => state.utils);
  return Utils.annoucements ? <div>{Utils.annoucements}</div> : <></>;
};

export default Announcements;
