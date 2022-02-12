import React from "react";
import styled from "styled-components";

import Header from "./Header";
import Footer from "./Footer";

import { useSilentRefresh } from "../../hooks/user-api";

const Layout = ({ children }) => {
  useSilentRefresh(); // silentRefresh enable 옵션 생각, localstorage에 로그인했다는 정보를 담고 그것을 토대로 실행??

  return (
    <Wrapper>
      <Header />
      <main className="layout-main">{children}</main>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .layout-main {
    display: flex;
    justify-content: center;
    width: 60%;
    margin: 0 auto;
  }
`;

export default Layout;
