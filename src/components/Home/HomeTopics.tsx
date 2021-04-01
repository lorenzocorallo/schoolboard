import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Store from '../../models/store';
import { Topic } from '../../models/Student';
import { checkIfSameDate } from '../../util/dates';
import {
  HomeSection,
  HomeSectionContent,
  HomeSectionHeader,
} from '../Styled/Home';
import Paper from '../Styled/Paper';
import HomeTopic from './HomeTopic';

const Main = styled(HomeSection)`
  grid-row: 3/4;
  grid-column: 3/4;
`;

const HomeTopics = () => {
  const selectedDate = useSelector((store: Store) => store.system.selectedDate);
  const storeTopics = useSelector((store: Store) => store.student.topics);
  const [topics, setTopics] = useState(storeTopics || ([] as Topic[]));

  useEffect(() => {
    const filtered = storeTopics.filter(
      (topic) =>
        topic.date !== undefined && checkIfSameDate(topic.date, selectedDate)
    );
    setTopics([...filtered]);
  }, [selectedDate, storeTopics]);

  return (
    <Main className="home__section">
      <HomeSectionHeader>
        <h3>Lezioni di oggi</h3>
      </HomeSectionHeader>
      <HomeSectionContent>
        {topics.length === 0 ? (
          <Paper style={{ flex: 1 }}>
            <p>Nessuna lezione oggi</p>
          </Paper>
        ) : (
          topics.map((topic) => <HomeTopic topic={topic} key={topic.id} />)
        )}
      </HomeSectionContent>
    </Main>
  );
};

export default HomeTopics;
