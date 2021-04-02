import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import AbsentsSvg from '../../assets/img/AbsentsSvg';
import ClockSvg from '../../assets/img/ClockSvg';
import ExitSvg from '../../assets/img/ExitSvg';
import Store from '../../models/store';
import Paper from '../Styled/Paper';

const StyledSidebarAbsents = styled(Paper)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  font-weight: bold;
  padding: 1rem 3rem;
  margin: 2rem 0;
  font-size: 2rem;
  svg {
    margin: 0 0.8rem;
  }
  span {
    margin: 0 0.5rem;
  }
  .paper__content {
    margin: 1.5rem 0;
  }
`;

const SidebarAbsents = () => {
  const { absents, delays, exits } = useSelector(
    (store: Store) => store.student.absents
  );
  return (
    <StyledSidebarAbsents>
      <div className="paper__content">
        <AbsentsSvg />
        <span className="primary">{absents.length || 0}</span> Assenze totali
      </div>
      <div className="paper__content">
        <ClockSvg />
        <span className="primary">{delays.length || 0}</span> Ritardi totali
      </div>
      <div className="paper__content">
        <ExitSvg />
        <span className="primary">{exits.length || 0}</span> Uscite totali
      </div>
    </StyledSidebarAbsents>
  );
};

export default SidebarAbsents;
