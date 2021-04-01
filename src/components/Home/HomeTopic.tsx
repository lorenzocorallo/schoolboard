import React from 'react';
import styled from 'styled-components';
import Paper, {
  PaperHeader,
  PaperContent,
  PaperHeaderLine,
} from '../Styled/Paper';
import { Topic } from '../../models/Student';
import { checkSubjectColor, fixSubject } from '../../util/argo/util';

const Main = styled(Paper)``;

const HomeTopic = ({ topic }: { topic: Topic }) => {
  return (
    <Main className="home__section__item">
      <PaperHeader>
        <PaperHeaderLine color={checkSubjectColor(topic.subject)} />
        <p>{fixSubject(topic.subject)}</p>
      </PaperHeader>
      <PaperContent>
        <p
          style={{
            maxWidth: '100%',
          }}
        >
          {topic.description}
        </p>
      </PaperContent>
    </Main>
  );
};

export default HomeTopic;
