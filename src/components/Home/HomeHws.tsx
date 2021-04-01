import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Store from '../../models/store';
import { Homework } from '../../models/Student';
import {
  checkIfSameDate,
  getExtendedDate,
  getTomorrow,
} from '../../util/dates';
import {
  HomeSection,
  HomeSectionContent,
  HomeSectionHeader,
} from '../Styled/Home';
import Paper from '../Styled/Paper';
import HomeHw from './HomeHw';

const Main = styled(HomeSection)`
  grid-row: 3/4;
  grid-column: 1/3;
`;

const Content = styled(HomeSectionContent)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ContentColumn = styled.div`
  flex: 1;
`;

const HomeHws = () => {
  const selectedDate = useSelector((store: Store) => store.system.selectedDate);
  const storeHomeworks = useSelector((store: Store) => store.student.homeworks);
  const [homeworks, setHomeworks] = useState(
    storeHomeworks || ([] as Homework[])
  );

  useEffect(() => {
    const hws = storeHomeworks.filter(
      (hw) =>
        hw.deadline !== undefined &&
        (checkIfSameDate(getTomorrow(new Date()), getTomorrow(selectedDate))
          ? checkIfSameDate(hw.deadline, getTomorrow(new Date()))
          : checkIfSameDate(hw.deadline, selectedDate))
    );
    setHomeworks([...hws]);
  }, [selectedDate, storeHomeworks]);

  return (
    <Main className="home__section">
      <HomeSectionHeader>
        <h3>
          {checkIfSameDate(getTomorrow(new Date()), getTomorrow(selectedDate))
            ? 'Compiti per domani'
            : `Compiti per il ${getExtendedDate(selectedDate)}`}
        </h3>
      </HomeSectionHeader>
      <Content>
        {homeworks.length === 0 ? (
          <Paper style={{ display: 'inline-flex', flex: 1 }}>
            <p>Nessun compito assegnato</p>
          </Paper>
        ) : (
          <>
            <ContentColumn>
              {homeworks.map(
                (hw, i) => i % 2 === 0 && <HomeHw key={hw.id} homework={hw} />
              )}
            </ContentColumn>
            <ContentColumn>
              {homeworks.map(
                (hw, i) => i % 2 === 1 && <HomeHw key={hw.id} homework={hw} />
              )}
            </ContentColumn>
          </>
        )}
      </Content>
    </Main>
  );
};

export default HomeHws;
