import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const links = [
  {
    title: '프로젝트 전시장',
    to: '/showroom',
  },
  {
    title: '팀원 모집',
    to: '/team',
  },
  {
    title: '커뮤니티',
    to: '/community',
  },
]

const Navigation = () => {
  return (
    <Wrapper>
      <ul>
        {links.map((link, index) => {
          return (
            <li className="nav-link" key={index}>
              <NavLink to={link.to} activeClassName="selected">
                {link.title}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  .nav-link {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5rem;
    font-size: 1.8rem;
    font-weight: bold;
    border-bottom: 1px solid #d0d7de;
    padding: 0 4rem;

    a {
      color: #384d58;
      padding: 2rem;
      transition: color 0.3s;

      :hover {
        color: #5eaca0;
      }
    }

    .selected {
      color: #5eaca0;
    }

    :first-child {
      border-top: 1px solid #d0d7de;
    }
  }
`

export default Navigation
