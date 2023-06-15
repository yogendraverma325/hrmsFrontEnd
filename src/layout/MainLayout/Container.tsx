import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';

const Container = () => {
  return (
    <div id="content">
      <Header />
      {/* Children component / OUTLET */}
      <div className="page-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Container;
