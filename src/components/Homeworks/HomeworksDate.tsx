import React from 'react';
import styled from 'styled-components';
import { Homework } from '../../models/Student';
import Paper from '../Styled/Paper';
import HomeworksItem from './HomeworksItem';

const Main = styled.div`
  margin-bottom: 4rem;
  opacity: 0;
`;

interface PropsType {
  date: Date;
  homeworks: Homework[];
}

const HomeworksDate = ({ date, homeworks }: PropsType, ref) => {
  return (
    <Main ref={ref}>
      <Paper primary>
        <h3>{date.toLocaleDateString()}</h3>
      </Paper>
      {homeworks.map((hw) => (
        <HomeworksItem key={hw.id} homework={hw} />
      ))}
    </Main>
  );
};

export default React.forwardRef(HomeworksDate);
