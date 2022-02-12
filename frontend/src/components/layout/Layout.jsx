import React from "react";
import styled from "styled-components";

import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
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
