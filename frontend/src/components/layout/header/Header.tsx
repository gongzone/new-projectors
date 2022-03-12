import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { openLoginModal, openRegisterModal } from '../../../store/modalSlice';

import NavLinks from './NavLinks';
import Backdrop from '../../UI/Backdrop';
import LoginModal from '../../modals/login/LoginModal';
import SignupModal from '../../modals/signup/SignupModal';

const Header = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Backdrop />
      <LoginModal />
      <SignupModal />
      <HeaderWrapper>
        <div>
          <Link to="/" className="logo">
            ProJectors
          </Link>
        </div>
        <nav className="header-nav">
          <NavLinks />
        </nav>
        <div className="header-buttons">
          <button onClick={() => dispatch(openLoginModal())} className="auth-button">
            로그인
          </button>
          <button onClick={() => dispatch(openRegisterModal())} className="auth-button">
            회원가입
          </button>
        </div>
      </HeaderWrapper>
    </>
  );
};

const HeaderWrapper = styled.div`
  height: 7.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 9rem;
  background-color: #24292f;
  border-bottom: 1px solid #e6eaea;

  .logo {
    color: white;
    font-size: 2.5rem;
    font-weight: bold;
  }

  .header-buttons {
    display: flex;
    justify-content: space-between;
    width: 16rem;

    .auth-button {
      position: relative;
      z-index: 10;
      color: white;
      background-color: transparent;
      padding: 0.5rem;
      font-size: 1.7rem;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.4s ease;

      :hover {
        color: #f7de8e;
        transform: translateY(-9%);
      }
    }
  }
`;

export default Header;
