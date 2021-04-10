import React from 'react';
import styled from 'styled-components';
import { ThemeType } from '../Styled/Theme';

const Main = styled.div`
  padding: 2rem 1rem;
`;
const Input = styled.input<{ theme: ThemeType }>`
  background: ${(props) => props.theme.paper};
`;

interface PropsType {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const MemosFilter = ({ filter, setFilter }: PropsType) => {
  const updateFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };
  return (
    <Main>
      <Input placeholder="Filtra..." onChange={updateFilter} value={filter} />
    </Main>
  );
};

export default MemosFilter;
