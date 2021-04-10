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
  SubjectContent,
} from '../Styled/Marks';
import MSDGraph from './Details/MSDGraph';
import MSDLastMarks from './Details/MSDLastMarks';
import MSDHighLowMarks from './Details/MSDHighLowMarks';

const Positioner = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
`;

const Link = styled(RRLink)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  pointer-events: all;
`;

const MarksSubjectDetails = ({ subject }: { subject: SubjectType }) => {
  return (
    <Positioner>
      <Subject layoutId={subject.id}>
        <SubjectHeader
          style={{ position: 'relative', pointerEvents: 'none' }}
          layoutId={`${subject.id}__header`}
        >
          <SubjectLine color={checkSubjectColor(subject.name)} />
          <SubjectName>{subject.name}</SubjectName>
          <SubjectTotAvg>{subject.avg.total || 0}</SubjectTotAvg>
          <Link to="/" />
        </SubjectHeader>
        <SubjectContent>
          <MSDGraph subject={subject} />
          <div
            style={{
              display: 'flex',
              height: '55%',
              justifyContent: 'space-between',
            }}
          >
            <MSDLastMarks subject={subject} />
            <MSDHighLowMarks subject={subject} />
          </div>
        </SubjectContent>

        {/* Back link */}
      </Subject>
    </Positioner>
  );
};

export default MarksSubjectDetails;
