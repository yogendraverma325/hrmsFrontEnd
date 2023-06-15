import moment from 'moment';
import React from 'react';

import { UserData } from '../../models/user';

const UserProfile = () => {
  const uploadImage = () => {
    console.log('first');
  };
  const uploadArea = () => {
    console.log('first');
  };
  const reverseUploadArea = () => {
    console.log('first');
  };

  const userData: UserData = JSON.parse(localStorage.getItem('userData') as string);

  const user = {
    name: userData.Full_Name,
    coverImg: '/static/images/placeholders/covers/5.jpg',
    avatar: '/static/images/avatars/avatar.png',

    jobtitle: userData.Designation,
    location: userData.Location_Code,
    userId: userData.TMC,
    officialEmail: userData.Company_E_Mail,
  };
  return (
    <div className="wrap-around">
      <div className="profile-wrap">
        <div className="prof-header-bg"></div>

        <div className="prof-card">
          <div className="prof-card-inner-top">
            <div className="profile-info">
              <div className="row">
                <div className="side-info">
                  <div className="categories-shield">
                    <div className="row shield-row" style={{ padding: 0 }}>
                      <p className="d-flex justify-content-center m-0">
                        <span className="mx-4">
                          <span className="value-count">0</span>
                          <span>
                            <img alt="platinum" src="/src/assets/images/platinum.png" />
                          </span>
                        </span>
                        <span className="mx-4">
                          <span className="value-count">0</span>
                          <span>
                            <img alt="diamond" src="/src/assets/images/diamond.png" />
                          </span>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mid-info"></div>
                <div className="side-info">
                  <div className="categories-shield">
                    <div className="row shield-row">
                      <p className="d-flex justify-content-center m-0">
                        <span className="mx-4">
                          <span className="value-count">0</span>
                          <span>
                            <img alt="gold" src="/src/assets/images/gold.png" />
                          </span>
                        </span>
                        <span className="mx-4">
                          <span className="value-count">0</span>
                          <span>
                            <img alt="silver" src="/src/assets/images/silver.png" />
                          </span>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="prof-card-inner-bottom">
            <div className="user-info">
              <h4 className="text-center">{userData.Full_Name}</h4>
              <p className="text-center user-location">{userData.Location_Code}</p>
              <p className="text-center user-designation">{userData.Department}</p>
              <div className="personal-info">
                <hr />
                <div className="row">
                  <div className="col-md-6">
                    <p className="info-key m-0">Department</p>
                    <p className="m-0 info-value">{userData.Department}</p>
                  </div>
                  <div className="col-md-6">
                    <p className="info-key m-0">TMC</p>
                    <p className="m-0 info-value">{userData.TMC}</p>
                  </div>
                  <div className="col-md-6">
                    <p className="info-key m-0">Date Of Joining</p>
                    <p className="m-0 info-value">
                      {moment(userData.Date_of_Joining).format('DD-MM-YYYY')}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="info-key m-0">Designation</p>
                    <p className="m-0 info-value">{userData.Designation}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/mouse-events-have-key-events */}
        <div
          className="profile-photo"
          id="profPhoto"
          onMouseOver={uploadArea}
          onMouseOut={reverseUploadArea}
        >
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          {/* <div className="camera-div" id="camDiv" onClick={uploadImage}>
            <i className="las la-camera"></i>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
