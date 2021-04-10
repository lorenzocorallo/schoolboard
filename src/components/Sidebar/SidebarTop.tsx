import React from 'react';
import gsap from 'gsap';

import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
// import AlarmSvg from '../../assets/img/AlarmSvg';
import CalendarSvg from '../../assets/img/CalendarSvg';
import RefreshSvg from '../../assets/img/RefreshSvg';
import Store from '../../models/store';
import { fetchUser } from '../../redux/actions/student';
import { getExtendedDate } from '../../util/dates';
import { ThemeType } from '../Styled/Theme';

const StyledSidebarTop = styled.div<{ theme: ThemeType }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  .sidebar__date {
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      margin-top: 2px;
      vertical-align: middle;
      margin-left: 1.4rem;
      font-size: 1.6rem;
      font-weight: bold;
    }
  }
  .sidebar__notifications,
  .sidebar__refresh {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      // transition: all 0.3s ease;
      padding: 1rem;
      border-radius: 50%;
      &:hover {
        background: ${(props) => props.theme.paper};
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.068);
      }
    }
    .cursor {
      z-index: -1;
    }
  }
`;

const SidebarTop = () => {
  const selectedDate = useSelector((store: Store) => store.system.selectedDate);
  const dispatch = useDispatch();
  const handleRefresh = async () => {
    const tl = gsap.timeline();
    tl.to('.sidebar__refresh button', {
      cursor: 'not-allowed',
    });
    const rotateAnim = gsap.fromTo(
      '.sidebar__refresh svg',
      { rotate: 0 },
      {
        rotate: -360,
        repeat: -1,
        ease: 'linear',
      }
    );
    const authToken = localStorage.getItem('auth-token');
    const schoolCode = localStorage.getItem('school-code');
    if (authToken && schoolCode) {
      await dispatch(fetchUser(schoolCode, authToken));
    }
    rotateAnim.repeat(0);
    tl.to(
      '.sidebar__refresh button',
      {
        cursor: 'pointer',
      },
      '+=2'
    );
  };

  return (
    <StyledSidebarTop className="sidebar__top">
      <div className="sidebar__date">
        <CalendarSvg />
        <p>{getExtendedDate(selectedDate)}</p>
      </div>
      <div className="sidebar__refresh">
        <button type="button" onClick={handleRefresh}>
          <RefreshSvg />
        </button>
      </div>
      {/* <div className="sidebar__notifications">
          <button type="button">
            <AlarmSvg />
          </button>
        </div> */}
    </StyledSidebarTop>
  );
};

export default SidebarTop;
