import React from 'react';
import styled from 'styled-components';
import { Homework } from '../../models/Student';
import { checkSubjectColor, fixSubject } from '../../util/argo/util';
import Paper, {
  PaperContent,
  PaperHeader,
  PaperHeaderLine,
} from '../Styled/Paper';

const Main = styled(Paper)``;

const HomeworksItem = ({ homework }: { homework: Homework }) => {
  return (
    <Main>
      <PaperHeader>
        <PaperHeaderLine color={checkSubjectColor(homework.subject)} />
        <p>{fixSubject(homework.subject)}</p>
      </PaperHeader>
      <PaperContent>
        <p>{homework.homework}</p>
      </PaperContent>
    </Main>
  );
};

export default HomeworksItem;
