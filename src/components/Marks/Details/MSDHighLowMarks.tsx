import React, { useEffect, useState } from 'react';
import { Mark, Subject } from '../../../models/Student';
import { SDContent, SDHeader, SDSection } from '../../Styled/Marks';
import MSDMark from './MSDMark';

interface Props {
  subject: Subject;
}

const MSDHighLowMarks = ({ subject }: Props) => {
  const [fromHighest, setFromHighest] = useState(true);
  const [marks, setMarks] = useState([] as Mark[]);

  useEffect(() => {
    const sorted = subject.marks.sort((a, b) => {
      let first = 0;
      let second = 0;
      if (typeof a.value === 'string') {
        first = parseFloat(a.value);
      } else if (typeof a.value === 'number') {
        first = a.value;
      }
      if (typeof b.value === 'string') {
        second = parseFloat(b.value);
      } else if (typeof b.value === 'number') {
        second = b.value;
      }
      return second - first;
    });
    setMarks(sorted);
  }, [subject.marks]);

  const handleSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setFromHighest(value);
    const sorted = subject.marks.sort((a, b) => {
      let first = 0;
      let second = 0;
      if (typeof a.value === 'string') {
        first = parseFloat(a.value);
      } else if (typeof a.value === 'number') {
        first = a.value;
      }
      if (typeof b.value === 'string') {
        second = parseFloat(b.value);
      } else if (typeof b.value === 'number') {
        second = b.value;
      }
      return value ? second - first : first - second;
    });
    setMarks(sorted);
  };
  return (
    <SDSection>
      <SDHeader style={{ background: fromHighest ? '#0e740e' : '#740e0e' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <p style={{ flex: 1, textAlign: 'center' }}>Bassi</p>
          <input
            checked={fromHighest}
            onChange={(e) => handleSwitch(e)}
            type="checkbox"
            id="switch"
          />
          <label htmlFor="switch">Toggle</label>
          <p style={{ flex: 1, textAlign: 'center' }}>Alti</p>
        </div>
      </SDHeader>
      <SDContent>
        {marks.map((mark) => (
          <MSDMark key={mark.id} mark={mark} />
        ))}
      </SDContent>
    </SDSection>
  );
};

export default MSDHighLowMarks;
