import React from 'react';
import styled from 'styled-components';

const Main = styled.div`
  padding: 2rem 1rem;
`;
const Input = styled.input``;

interface PropsType {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const HomeworksFilter = ({ filter, setFilter }: PropsType) => {
  const updateFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };
  return (
    <Main>
      <Input placeholder="Filtra..." onChange={updateFilter} value={filter} />
    </Main>
  );
};

export default HomeworksFilter;
