import React from 'react';

import { avatarCategory, UserData } from '../../models/user';

const Header = () => {
  let data = {
    id: 101,
    email: 'yogendra.verma@teamcomputers.com',
    name: 'YogendraVerma',
    tmc: '13675',
    department: 'ITAPPS',
    contact_no: "'7017734526",
    SBU: 'Shared',
    profilePic: 'uploads/ProfilePic-1687147886746.png',
    gender: 'Male',
    designation: 'Senior Full Stack Developer',
    dateofJoining: '2021-08-16',
    bronze: 0,
    diamond: 2,
    gold: 1,
    silver: 0,
    empDesignation: 'E2',
    role: 'user',
    ap_sbus: [
      {
        bam_code: 'Shared',
        local_code: 'Integrating Services',
      },
    ],
  };
  localStorage.setItem('userData', JSON.stringify(data));
  const userData: UserData = JSON.parse(localStorage.getItem('userData') as string);

  return (
    <nav className="navbar sticky-top navbar-light">
      <div className="row appreciation-nav-row">
        <div className="col">
          <div className="d-flex justify-content-start">
            <button
              type="button"
              id="sidebarCollapse"
              className="btn btn-outline-default"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>

        <div className="col">
          <div className="profile-area d-flex justify-content-end">
            <p className="p-0 m-0">
              <span>
                <img alt="userProfile" src={avatarCategory[userData.Gender]} />
              </span>
              <span className="username">{userData.Full_Name}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-start"></div>
    </nav>
  );
};

export default Header;
