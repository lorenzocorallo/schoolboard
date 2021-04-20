import React from 'react';
import styled from 'styled-components';
import ReactHTMLParser from 'react-html-parser';
import { Memo } from '../../models/Student';
import { capitalize } from '../../util/argo/util';
import { recognizeUrls } from '../../util/string';
import Paper, {
  PaperContent,
  PaperHeader,
  PaperHeaderLine,
} from '../Styled/Paper';

const Main = styled(Paper)``;

const MemosItem = ({ memo }: { memo: Memo }) => {
  const { fullUrlied } = recognizeUrls(memo.description);
  return (
    <Main>
      <PaperHeader>
        <PaperHeaderLine />
        <p>{capitalize(memo.author)}</p>
      </PaperHeader>
      <PaperContent>
        <p>{ReactHTMLParser(fullUrlied)}</p>
      </PaperContent>
    </Main>
  );
};

export default MemosItem;
