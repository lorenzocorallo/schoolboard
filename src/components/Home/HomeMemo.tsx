import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import styled from 'styled-components';
import { urlify } from '../../util/string';
import { Memo } from '../../models/Student';
import { getDate } from '../../util/dates';
import Paper, {
  PaperHeader,
  PaperContent,
  PaperFooter,
  PaperHeaderLine,
} from '../Styled/Paper';

const Main = styled(Paper)``;

const HomeMemo = ({ memo }: { memo: Memo }) => {
  return (
    <Main className="home__section__item">
      <PaperHeader>
        <PaperHeaderLine />
        <p>{memo.author}</p>
      </PaperHeader>
      <PaperContent>
        <p>{ReactHtmlParser(urlify(memo.description))}</p>
      </PaperContent>
      <PaperFooter>
        <p>{getDate(memo.date)}</p>
      </PaperFooter>
    </Main>
  );
};

export default HomeMemo;
