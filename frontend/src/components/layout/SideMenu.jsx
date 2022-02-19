import React from "react";
import styled from "styled-components";

import Navigation from "./Navigation";

const SideMenu = () => {
  return (
    <Wrapper>
      <div className="content-container">
        <div className="menu-container">
          <span className="menu">Menu</span>
          <div className="underline"></div>
        </div>
        <Navigation />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  width: 27rem;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #f3f3f3;

  .content-container {
    margin-top: 8rem;
  }

  .menu-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 5rem;

    .menu {
      font-size: 1.9rem;
      font-weight: bold;
    }

    .underline {
      width: 5.3rem;
      height: 0.5rem;
      background-color: orange;
    }
  }
`;

export default SideMenu;
