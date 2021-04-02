import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import leftArrow from '../../assets/img/left_arrow.png';
import rightArrow from '../../assets/img/right_arrow.png';
import Store from '../../models/store';
import { selectDate } from '../../redux/actions/system';
import { getMonth } from '../../util/dates';
import Scrollable from '../Styled/Scrollable';
import SidebarAbsents from './SidebarAbsents';
import SidebarCalendar from './SidebarCalendar';
import SidebarMemos from './SidebarMemos';
import SidebarTop from './SidebarTop';

const Main = styled.div`
  flex: 0 0 35rem;
  padding: 1rem 3rem 0 3rem;
  height: 95%;
  width: 35rem;
  max-width: 35rem;
  display: flex;
  flex-direction: column;
  svg {
    width: 2.4rem;
    fill: ${(props) => props.theme.text};
  }
`;

const Content = styled(Scrollable)`
  border-radius: 16px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Sidebar = () => {
  const dispatch = useDispatch();
  const updateDate = (date: Date | Date[]) => {
    dispatch(selectDate(date as Date));
  };

  const currentSchoolYear = useSelector(
    (store: Store) => store.student.currentYear
  );

  const selectedDate = useSelector((store: Store) => store.system.selectedDate);
  const formatShortWeekday = (_locale: string, date: Date) =>
    ['D', 'L', 'M', 'M', 'G', 'V', 'S'][date.getDay()];

  return (
    <Main>
      <SidebarTop />
      <Content>
        <SidebarCalendar
          value={selectedDate}
          className="paper calendar"
          minDetail="month"
          maxDetail="month"
          onChange={(date) => updateDate(date)}
          navigationLabel={({ date }) => (
            <p>
              {getMonth(date)} {date.getFullYear()}
            </p>
          )}
          prevLabel={
            <img
              style={{ pointerEvents: 'none' }}
              src={leftArrow}
              alt="previous month"
            />
          }
          nextLabel={
            <img
              style={{ pointerEvents: 'none' }}
              src={rightArrow}
              alt="next month"
            />
          }
          next2Label=""
          prev2Label=""
          minDate={currentSchoolYear.start}
          maxDate={currentSchoolYear.end}
          formatShortWeekday={formatShortWeekday}
        />
        <SidebarAbsents />
        <SidebarMemos />
      </Content>
    </Main>
  );
};

export default Sidebar;
