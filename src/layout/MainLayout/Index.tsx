import React, { ReactNode } from 'react';

import Container from './Container';
import Header from './Header';
import Sidebar from './Sidebar';
// import './style.css';
const MainLayout = ({ children }: any) => {
  return (
    <>
      <div className="wrapper">
        <Sidebar />
        <div id="content">
          <Header />
          <div className="page-content">{children}</div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
