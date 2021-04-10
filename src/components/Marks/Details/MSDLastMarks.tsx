import React from 'react';
import styled from 'styled-components';
import { Subject } from '../../../models/Student';
import {
  SDContent as SDDefaultContent,
  SDHeader,
  SDSection,
} from '../../Styled/Marks';
import MSDMark from './MSDMark';

interface Props {
  subject: Subject;
}

const SDContent = styled(SDDefaultContent)`
  direction: rtl;
  div {
    direction: ltr;
  }
`;

const MSDLastMarks = ({ subject }: Props) => {
  return (
    <SDSection>
      <SDHeader>Voti per data</SDHeader>
      <SDContent>
        {subject.marks.map((mark) => (
          <MSDMark key={mark.id} mark={mark} />
        ))}
      </SDContent>
    </SDSection>
  );
};

export default MSDLastMarks;
