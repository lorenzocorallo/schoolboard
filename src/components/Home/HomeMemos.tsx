import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Store from '../../models/store';
import Button from '../Styled/Button';
import {
  HomeSection,
  HomeSectionContent,
  HomeSectionHeader,
} from '../Styled/Home';
import HomeMemo from './HomeMemo';

const Main = styled(HomeSection)`
  grid-row: 2/4;
  grid-column: 4/5;
`;

const StyledButton = styled(Button)`
  width: 90%;
  margin: auto;
`;

const HomeMemos = () => {
  const memos = useSelector((store: Store) =>
    store.student.memos.filter((_v, i) => i < 4)
  );
  return (
    <Main className="home__section">
      <HomeSectionHeader>
        <h3>Promemoria</h3>
      </HomeSectionHeader>
      <HomeSectionContent>
        {memos.map((memo) => (
          <HomeMemo memo={memo} key={memo.id} />
        ))}
        <StyledButton secondary>Mostra di più</StyledButton>
      </HomeSectionContent>
    </Main>
  );
};

export default HomeMemos;
