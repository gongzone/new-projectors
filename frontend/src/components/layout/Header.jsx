import React from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { useGetUserDetail } from "../../hooks/user-api";

const Header = () => {
  const query = useGetUserDetail();

  return (
    <Wrapper>
      <Link to="/" className="header-title">
        ProJectors 💻
      </Link>
      {query.isIdle && (
        <div className="header-user-container">
          <NavLink to="/login" activeClassName="selected">
            로그인
          </NavLink>
          <NavLink to="/signup" activeClassName="selected">
            회원가입
          </NavLink>
        </div>
      )}
      {!query.isIdle && (
        <div className="header-user-container">
          <span>🧔 {query.data.nickname}</span>
          <Link to="#">로그아웃</Link>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 8rem;
  margin-bottom: 3rem;
  background-color: #5eaca0;
  box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 35%);

  .header-title {
    color: white;
    font-size: 3rem;
    font-weight: bold;
    margin-left: 6rem;
  }

  .header-user-container {
    font-size: 2rem;
    font-weight: bold;
    margin-right: 6rem;

    a {
      color: white;
      margin-left: 3rem;
      transition: color 0.3s;

      :hover {
        color: #384d58;
      }
    }

    .selected {
      color: #384d58;
    }
  }
`;

export default Header;
