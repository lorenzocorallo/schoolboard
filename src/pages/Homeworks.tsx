import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import gsap from 'gsap';
import styled from 'styled-components';
import HomeworksDate from '../components/Homeworks/HomeworksDate';
import AppSection, { AppSectionTitle } from '../components/Styled/AppSection';
import Scrollable from '../components/Styled/Scrollable';
import Store from '../models/store';
import { checkIfSameDate, orderArrayByDate } from '../util/dates';
import { Homework } from '../models/Student';

const Main = styled(AppSection)``;
const Content = styled(Scrollable)`
  padding-top: 2rem;
`;

interface DateState {
  id: string;
  date: Date;
  homeworks: Homework[];
}

const Homeworks = () => {
  const homeworks = useSelector((store: Store) => store.student.homeworks);
  const [dates, setDates] = useState<DateState[]>([]);
  useEffect(() => {
    const localDates: DateState[] = [];
    homeworks.forEach((hw) => {
      const dateString = hw.deadline ? hw.deadline.toLocaleDateString() : null;
      if (dateString)
        localDates.push({
          id: dateString,
          date: hw.deadline || new Date(),
          homeworks: [],
        });
    });
    const unique = localDates.filter(
      (v, i, a) => a.findIndex((t) => t.id === v.id) === i
    );

    const ordered = orderArrayByDate(unique);

    const filledDates = ordered.map((date) => {
      const array = homeworks.filter(
        (v) => v.deadline && checkIfSameDate(v.deadline, date.date)
      );
      return { ...date, homeworks: array };
    });

    setDates(filledDates);
  }, [homeworks]);

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
      <AppSectionTitle>Compiti</AppSectionTitle>
      <Content ref={contentRef}>
        {dates.map((date) => (
          <HomeworksDate
            ref={addToRef}
            date={date.date}
            homeworks={date.homeworks}
            key={date.id}
          />
        ))}
      </Content>
    </Main>
  );
};

export default Homeworks;
