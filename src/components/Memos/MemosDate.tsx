import React from 'react';
import styled from 'styled-components';
import { Memo } from '../../models/Student';
import Paper from '../Styled/Paper';
import HomeworksItem from './MemosItem';

const Main = styled.div`
  margin-bottom: 4rem;
  opacity: 0;
`;

interface PropsType {
  date: Date;
  memos: Memo[];
}

const MemosDate = ({ date, memos }: PropsType, ref) => {
  return (
    <Main ref={ref}>
      <Paper primary>
        <h3>{date.toLocaleDateString()}</h3>
      </Paper>
      {memos.map((memo) => (
        <HomeworksItem key={memo.id} memo={memo} />
      ))}
    </Main>
  );
};

export default React.forwardRef(MemosDate);
