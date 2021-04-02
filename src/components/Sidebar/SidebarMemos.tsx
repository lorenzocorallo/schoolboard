import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';
import Store from '../../models/store';
import { urlify } from '../../util/string';
import Paper, {
  PaperContent,
  PaperHeader,
  PaperHeaderLine,
} from '../Styled/Paper';
import { Memo } from '../../models/Student';
import { checkIfSameDate } from '../../util/dates';

const Main = styled.div`
  margin: 1rem 0;
`;

const Item = ({ memo }: { memo: Memo }) => {
  return (
    <Paper style={{ margin: '1rem 0' }}>
      <PaperHeader>
        <PaperHeaderLine />
        <p>{memo.author}</p>
      </PaperHeader>
      <PaperContent>
        <p>{ReactHtmlParser(urlify(memo.description))}</p>
      </PaperContent>
    </Paper>
  );
};

const SidebarMemos = () => {
  const selectedDate = useSelector((store: Store) => store.system.selectedDate);
  const storeMemos = useSelector((store: Store) => store.student.memos);
  const [memos, setMemos] = useState<Memo[]>([]);
  useEffect(() => {
    const filtered = storeMemos.filter((memo) =>
      checkIfSameDate(memo.date, selectedDate)
    );
    setMemos(filtered);
  }, [storeMemos, selectedDate]);
  return (
    <Main>
      {memos.map((memo) => (
        <Item key={memo.id} memo={memo} />
      ))}
    </Main>
  );
};

export default SidebarMemos;
