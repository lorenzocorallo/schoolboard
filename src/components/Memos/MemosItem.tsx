import React from 'react';
import styled from 'styled-components';
import { Memo } from '../../models/Student';
import { capitalize } from '../../util/argo/util';
import Paper, {
  PaperContent,
  PaperHeader,
  PaperHeaderLine,
} from '../Styled/Paper';

const Main = styled(Paper)``;

const MemosItem = ({ memo }: { memo: Memo }) => {
  return (
    <Main>
      <PaperHeader>
        <PaperHeaderLine />
        <p>{capitalize(memo.author)}</p>
      </PaperHeader>
      <PaperContent>
        <p>{memo.description}</p>
      </PaperContent>
    </Main>
  );
};

export default MemosItem;
