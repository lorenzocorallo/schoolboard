import React from 'react';
import styled from 'styled-components';
import { Subject } from '../../models/Student';
import { checkSubjectColor } from '../../util/argo/util';
import Paper, { PaperHeaderLine } from '../Styled/Paper';

const Main = styled(Paper)`
  flex: 1 1 30%;
  font-size: 2.2rem;
  cursor: pointer;
  padding: 3rem;
  transition: all 0.2s ease;
  display: flex;
  font-weight: bold;
  justify-content: space-between;
  align-items: center;
  &:hover {
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const MarksSubject = ({ subject }: { subject: Subject }) => {
  return (
    <Main>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <PaperHeaderLine
          color={checkSubjectColor(subject.name)}
          style={{ marginRight: '1rem' }}
        />
        <h4>{subject.name}</h4>
      </div>
      <p>{subject.avg.total || 0}</p>
    </Main>
  );
};

export default MarksSubject;
