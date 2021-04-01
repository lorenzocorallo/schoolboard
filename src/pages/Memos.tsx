import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import gsap from 'gsap';
import styled from 'styled-components';
import AppSection, { AppSectionTitle } from '../components/Styled/AppSection';
import Scrollable from '../components/Styled/Scrollable';
import Store from '../models/store';
import MemosDate from '../components/Memos/MemosDate';
import { checkIfSameDate, orderArrayByDate } from '../util/dates';
import { Memo } from '../models/Student';

const Main = styled(AppSection)``;
const Content = styled(Scrollable)`
  padding-top: 2rem;
`;

interface DateState {
  id: string;
  date: Date;
  memos: Memo[];
}

const Homeworks = () => {
  const memos = useSelector((store: Store) => store.student.memos);
  const [dates, setDates] = useState<DateState[]>([]);
  useEffect(() => {
    const localDates: DateState[] = [];
    memos.forEach((memo) => {
      const dateString = memo.date ? memo.date.toLocaleDateString() : null;
      if (dateString)
        localDates.push({
          id: dateString,
          date: memo.date || new Date(),
          memos: [],
        });
    });
    const unique = localDates.filter(
      (v, i, a) => a.findIndex((t) => t.id === v.id) === i
    );

    const ordered = orderArrayByDate(unique);

    const filledDates = ordered.map((date) => {
      const array = memos.filter(
        (v) => v.date && checkIfSameDate(v.date, date.date)
      );
      return { ...date, memos: array };
    });

    setDates(filledDates);
  }, [memos]);

  // Animation
  const contentRef = useRef<HTMLDivElement>(null);
  const datesRef = useRef([] as HTMLDivElement[]);
  datesRef.current = [] as HTMLDivElement[];

  const addToRef = (el: HTMLDivElement | null) => {
    if (el && !datesRef.current.includes(el)) {
      datesRef.current.push(el);
    }
  };

  useEffect(() => {
    if (dates.length > 0) {
      gsap.to(datesRef.current, {
        opacity: 1,
        stagger: 0.1,
        duration: 0.3,
        delay: 0.1,
      });
    }
  }, [dates, datesRef]);

  return (
    <Main>
      <AppSectionTitle>Promemoria</AppSectionTitle>
      <Content ref={contentRef}>
        {dates.map((date) => (
          <MemosDate
            ref={addToRef}
            date={date.date}
            memos={date.memos}
            key={date.id}
          />
        ))}
      </Content>
    </Main>
  );
};

export default Homeworks;
