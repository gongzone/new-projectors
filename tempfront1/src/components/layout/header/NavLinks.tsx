import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const LINKS = [
  { id: 1, title: '전시장', to: '/showroom' },
  { id: 2, title: '팀원모집', to: '/team' },
  { id: 3, title: '커뮤니티', to: '/community' },
  { id: 4, title: 'Q&A', to: '/questionboard' },
];

const NavLinks = () => {
  return (
    <NavLinksWrapper>
      {LINKS.map((link) => {
        return (
          <li className="nav-li" key={link.id}>
            <NavLink
              className={({ isActive }) => 'nav-link' + (isActive ? ' activated' : '')}
              to={link.to}
              end
            >
              {link.title}
            </NavLink>
          </li>
        );
      })}
    </NavLinksWrapper>
  );
};

const NavLinksWrapper = styled.ul`
  display: flex;
  margin: 0;

  .nav-li {
    padding-top: 0.5rem;

    .nav-link {
      position: relative;
      color: whitesmoke;
      padding: 0.5rem;
      margin-left: 2.5rem;
      font-size: 1.7rem;
      font-weight: bold;
      transition: color 0.4s ease-in-out;

      ::after {
        position: absolute;
        content: '';
        width: 0%;
        height: 0.35rem;
        background-color: whitesmoke;
        left: 50%;
        bottom: -0.4rem;
        transition: all 0.4s ease-in-out;
      }

      :hover {
        color: #f7de8e;
      }

      :hover::after {
        width: 90%;
        left: 5%;
      }
    }

    .activated {
      color: #f7de8e;
      ::after {
        width: 90%;
        left: 5%;
      }
    }
  }
`;

export default NavLinks;
