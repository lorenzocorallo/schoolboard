import React from 'react';
import ReactHTMLParser from 'react-html-parser';
import styled from 'styled-components';
import Paper, {
  PaperHeader,
  PaperContent,
  PaperHeaderLine,
} from '../Styled/Paper';
import { Topic } from '../../models/Student';
import { checkSubjectColor, fixSubject } from '../../util/argo/util';
import { recognizeUrls } from '../../util/string';

const Main = styled(Paper)``;

const HomeTopic = ({ topic }: { topic: Topic }) => {
  const { urlied } = recognizeUrls(topic.description);
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
          {ReactHTMLParser(urlied)}
        </p>
      </PaperContent>
    </Main>
  );
};

export default HomeTopic;
