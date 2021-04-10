import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import AbsentsSvg from '../../assets/img/AbsentsSvg';
import ClockSvg from '../../assets/img/ClockSvg';
import ExitSvg from '../../assets/img/ExitSvg';
import Store from '../../models/store';
import Paper from '../Styled/Paper';
import { ThemeType } from '../Styled/Theme';

const Main = styled(Paper)<{ theme: ThemeType }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  font-weight: bold;
  padding: 1rem 3rem;
  margin: 2rem 0;
  font-size: 2rem;
`;

const Row = styled.div`
  display: flex;
  margin: 1.5rem 0;

  justify-content: flex-start;
  align-items: center;
  svg {
    margin: 0 0.8rem;
    fill: ${(props) => props.theme.secondary};
  }
  span {
    margin: 0 0.5rem;
    color: ${(props) => props.theme.secondary};
  }
`;

const SidebarAbsents = () => {
  const { absents, delays, exits } = useSelector(
    (store: Store) => store.student.absents
  );
  return (
    <Main>
      <Row>
        <AbsentsSvg />
        <span>{absents.length || 0}</span> Assenze totali
      </Row>
      <Row>
        <ClockSvg />
        <span>{delays.length || 0}</span> Ritardi totali
      </Row>
      <Row>
        <ExitSvg />
        <span>{exits.length || 0}</span> Uscite totali
      </Row>
    </Main>
  );
};

export default SidebarAbsents;
