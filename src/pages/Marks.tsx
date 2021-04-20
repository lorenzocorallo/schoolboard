import React, { useEffect, useRef } from 'react';
import {
  match as matchType,
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';

import MarksSubjectDetail from '../components/Marks/MarksSubjectDetails';
import AppSection, { AppSectionTitle } from '../components/Styled/AppSection';
import MarksGraph from '../components/Marks/MarksGraph';
import MarksSubject from '../components/Marks/MarksSubject';
import Store from '../models/store';
import { Subject } from '../models/Student';

interface MatchProps {
  match: matchType<{ id: string }>;
}

const Main = styled(AppSection)<{ notScroll: boolean }>`
  overflow-y: ${(props) => (props.notScroll ? 'hidden' : 'auto' || 'auto')};
  position: relative;
  scroll-behavior: smooth;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Content = styled.div`
  height: auto;
  display: flex;
  flex-wrap: wrap;
`;

const MarksHome = ({ subjects, id }: { subjects: Subject[]; id: string }) => {
  const topRef = useRef<HTMLDivElement | undefined>();
  const listRef = useRef<HTMLDivElement | undefined>();
  useEffect(() => {
    if (id && topRef) {
      topRef.current.scrollIntoView();
    }
  }, [id]);
  return (
    <>
      <div ref={topRef} style={{ position: 'absolute', top: 0 }} />
      <AppSectionTitle>Voti</AppSectionTitle>
      <MarksGraph />
      <Content ref={listRef}>
        {subjects.map((subject) => (
          <MarksSubject key={subject.id} subject={subject} />
        ))}
      </Content>
    </>
  );
};

const MarksSwitch = ({ match }: MatchProps) => {
  const { id } = match.params;
  const subjects = useSelector((store: Store) => store.student.subjects);
  const selectedSubject = subjects.find((item) => item.id === id);
  return (
    <Main notScroll={id && id !== 'D:'}>
      <AnimateSharedLayout type="crossfade">
        <AnimatePresence>
          {selectedSubject && <MarksSubjectDetail subject={selectedSubject} />}
        </AnimatePresence>
        <MarksHome id={id} subjects={subjects} />
      </AnimateSharedLayout>
    </Main>
  );
};

const Marks = () => {
  return (
    <Router>
      <Route path={['/:id', '/']} component={MarksSwitch} />
    </Router>
  );
};

export default Marks;
