import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import gsap from 'gsap';

import HomeSvg from '../../assets/img/HomeSvg';
import ExamSvg from '../../assets/img/ExamSvg';
import CopySvg from '../../assets/img/CopySvg';
import PushPinSvg from '../../assets/img/PushPinSvg';

const navItems = [
  {
    name: 'Home',
    icon: <HomeSvg />,
    slug: 'home',
  },
  {
    name: 'Voti',
    icon: <ExamSvg />,
    slug: 'marks',
  },
  {
    name: 'Compiti',
    icon: <CopySvg />,
    slug: 'homeworks',
  },
  {
    name: 'Promemoria',
    icon: <PushPinSvg />,
    slug: 'memos',
  },
];

const Main = styled.div`
  height: 100%;
  flex: 0 0 13rem;
  padding: 2rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  user-select: none;
`;

const Nav = styled.nav`
  padding-top: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const ActiveBox = styled.div`
  width: 8rem;
  height: 8rem;
  background: ${(props) => props.theme.paper};
  border-radius: 20%;
  position: absolute;
  z-index: -2;
`;

const NavButton = styled.button`
  border: none;
  width: 8rem;
  height: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20%;
  background: transparent;
  z-index: 3;
  svg {
    width: 4.2rem;
  }
`;

const Menu = () => {
  const location = useLocation();
  const activeBoxRef = useRef(null);
  const buttonsRef = useRef([] as HTMLAnchorElement[]);
  buttonsRef.current = [] as HTMLAnchorElement[];

  const addToRef = (el: HTMLAnchorElement | null) => {
    if (el && !buttonsRef.current.includes(el)) {
      buttonsRef.current.push(el);
    }
  };
  useEffect(() => {
    const activeIndex = navItems.findIndex(
      (item) => location.pathname.split('/')[1] === item.slug
    );
    const activeItem = buttonsRef.current[activeIndex];
    const inactiveItems = buttonsRef.current.filter((el) => el !== activeItem);

    if (activeItem && activeBoxRef.current) {
      const tl = gsap.timeline();
      tl.to(activeBoxRef.current, {
        top: `${2.5 + 6.4 * activeIndex + 8 * activeIndex}rem`,
        duration: 0.3,
      }).to(
        activeItem.querySelectorAll('svg path'),
        {
          fill: '#5385e7',
          duration: 0.2,
        },
        '-=0.3'
      );
      inactiveItems.map((el) =>
        gsap.to(el.querySelectorAll('svg path'), {
          fill: '#4b4b4b',
          duration: 0.3,
        })
      );
    }
  }, [location, activeBoxRef]);

  return (
    <Main>
      <Nav>
        <ActiveBox ref={activeBoxRef} />
        {navItems.map((item) => (
          <Link
            style={{
              marginBottom: '6.4rem',
            }}
            key={`nav-${item.name}`}
            ref={(e) => addToRef(e)}
            to={`/${item.slug}`}
          >
            <NavButton aria-label={item.name} type="button">
              {item.icon}
            </NavButton>
          </Link>
        ))}
      </Nav>
    </Main>
  );
};

export default Menu;
