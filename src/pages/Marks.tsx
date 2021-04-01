import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import MarksGraph from '../components/Marks/MarksGraph';
import MarksSubject from '../components/Marks/MarksSubject';
import AppSection, { AppSectionTitle } from '../components/Styled/AppSection';
import Store from '../models/store';

const Main = styled(AppSection)``;
const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Marks = () => {
  const subjects = useSelector((store: Store) => store.student.subjects);

  // const marksItemsRef = useRef([] as HTMLDivElement[]);
  // marksItemsRef.current = [] as HTMLDivElement[];

  // const addToRef = (el: HTMLAnchorElement | null) => {
  //   if (el && !buttonsRef.current.includes(el)) {
  //     buttonsRef.current.push(el);
  //   }
  // };

  return (
    <Main>
      <AppSectionTitle>Voti</AppSectionTitle>
      <MarksGraph />
      <Content>
        {subjects.map((subject) => (
          <MarksSubject key={subject.name} subject={subject} />
        ))}
      </Content>
    </Main>
  );
};

export default Marks;
