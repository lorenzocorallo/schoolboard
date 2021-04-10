import React from 'react';
import { Link as RRLink } from 'react-router-dom';
import styled from 'styled-components';
import { Subject as SubjectType } from '../../models/Student';
import { checkSubjectColor } from '../../util/argo/util';
import {
  Subject,
  SubjectHeader,
  SubjectLine,
  SubjectTotAvg,
  SubjectName,
} from '../Styled/Marks';

const Positioner = styled.div`
  flex: 1 1 30%;
  position: relative;
  padding: 1rem;
  display: block;
`;

const Link = styled(RRLink)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const MarksSubject = ({ subject }: { subject: SubjectType }) => {
  return (
    <Positioner>
      <Subject layoutId={subject.id}>
        <SubjectHeader layoutId={`${subject.id}__header`}>
          <SubjectLine color={checkSubjectColor(subject.name)} />
          <SubjectName>{subject.name}</SubjectName>
          <SubjectTotAvg>{subject.avg.total || 0}</SubjectTotAvg>
        </SubjectHeader>
        <Link to="/" />
      </Subject>
      <Link to={`/${subject.id}`} />
    </Positioner>
  );
};

export default MarksSubject;
