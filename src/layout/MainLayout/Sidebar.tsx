import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ResetPassword from '../../components/ResetPassword';
import { toggleModal } from '../../redux/reducers/utilitesSlice';

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const handleToggleClass = () => {
    setIsActive(!isActive);
  };
  return (
    <nav className="main-nav">
      <ul className="main-menu">
        <li className="menu-item active">
          <a href="#" onClick={() => navigate('/overview')} className="menu-a">
            <div className="menu-txt-hld">
              <i className="fas fa-igloo menu-icon"></i>
              <span>
                <img alt="menu" src="/src/assets/images/menu.png" />
              </span>
              <span className="menu-txt">Home</span>
            </div>
          </a>
        </li>
        <li
          className="menu-item"
          data-toggle="modal"
          data-target="#appreciateSomeoneModal"
        >
          <a href="#" onClick={() => dispatch(toggleModal(true))} className="menu-a">
            <div className="menu-txt-hld">
              <span>
                <img alt="menu_a" src="/src/assets/images/high-quality2.png" />
              </span>
              <span className="menu-txt">Appreciate Someone</span>
            </div>
          </a>
        </li>
        <li className="menu-item">
          <a href="#" onClick={() => navigate('/overview')} className="menu-a">
            <div className="menu-txt-hld">
              <span>
                <img alt="appriciation" src="/src/assets/images/appreciation.png" />
              </span>
              <span className="menu-txt">Appreciation Activities </span>
            </div>
          </a>
        </li>
        <li className="menu-item">
          <a href="#" onClick={() => navigate('/profile')} className="menu-a">
            <div className="menu-txt-hld">
              <span>
                <img alt="user_img" src="/src/assets/images/user.png" />
              </span>
              <span className="menu-txt">My profile</span>
            </div>
          </a>
        </li>
        <li className="menu-item" data-toggle="modal" data-target="#resetPass">
          <a href="#" onClick={handleToggleClass} className="menu-a">
            <div className="menu-txt-hld">
              <span>
                <img alt="synchronize" src="/src/assets/images/synchronize.png" />
              </span>
              <span className="menu-txt">Reset Password</span>
            </div>
          </a>
        </li>
        <li className="menu-item">
          <a href="./" className="menu-a">
            <div className="menu-txt-hld">
              <span>
                <img alt="logout" src="/src/assets/images/logout.png" />
              </span>
              <span className="menu-txt">Logout</span>
            </div>
          </a>
        </li>
      </ul>
      {isActive ? (
        <ResetPassword isActive={isActive} toggleClass={handleToggleClass} />
      ) : null}
    </nav>
  );
};

export default Sidebar;
