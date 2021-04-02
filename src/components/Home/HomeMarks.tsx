import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Store from '../../models/store';
import Paper, { PaperContent, PaperHeader } from '../Styled/Paper';
import HomeMark from './HomeMark';

const Main = styled(Paper)`
  grid-row: 2/3;
  grid-column: 1/3;
  opacity: 0;
  max-height: 12rem;
`;

const Content = styled(PaperContent)`
  justify-content: space-between;
`;

const HomeMarks = () => {
  const marks = useSelector((store: Store) => store.student.marks);
  return (
    <Main className="home__section">
      <PaperHeader>
        <h3>Ultimi voti</h3>
      </PaperHeader>
      <Content>
        {marks.map(
          (mark, i) =>
            i < 3 && (
              <HomeMark
                key={mark.id}
                value={mark.value}
                subject={mark.subject}
              />
            )
        )}
      </Content>
    </Main>
  );
};

export default HomeMarks;
