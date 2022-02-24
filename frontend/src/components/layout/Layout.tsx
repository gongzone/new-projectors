import React from 'react';
import styled from 'styled-components';

import Header from './Header';
import SideMenu from './SideMenu';
import Footer from './Footer';

import { useSilentRefresh } from '../../hooks/user-api';

const Layout: React.FC = ({ children }) => {
  useSilentRefresh(); // localstorage에 로그인했다는 정보를 담고 enable option 고려, withcredential 필요?

  return (
    <Wrapper>
      <Header />
      <SideMenu />
      <main className="layout-main">{children}</main>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .layout-main {
    display: flex;
    justify-content: center;
    width: 70%;
    padding-left: 27rem;
    margin: 0 auto;
  }
`;

export default Layout;
