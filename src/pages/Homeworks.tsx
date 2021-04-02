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
import HomeworksFilter from '../components/Homeworks/HomeworksFilter';
import { fixSubject } from '../util/argo/util';

const Main = styled(AppSection)`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Content = styled(Scrollable)``;

interface DateState {
  id: string;
  date: Date;
  homeworks: Homework[];
}

const Homeworks = () => {
  const [filter, setFilter] = useState('');
  const homeworks = useSelector((store: Store) => store.student.homeworks);
  const [dates, setDates] = useState<DateState[]>([]);
  const [filteredDates, setFilteredDates] = useState<DateState[]>([]);
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

  useEffect(() => {
    if (filter === '') {
      setFilteredDates([...dates]);
    } else {
      const lowerFilter = filter.toLowerCase();
      const array = dates
        .map((date) => ({
          ...date,
          homeworks: date.homeworks.filter(
            (v) =>
              fixSubject(v.subject).toLowerCase().includes(lowerFilter) ||
              v.homework.toLowerCase().includes(lowerFilter)
          ),
        }))
        .filter((v) => v.homeworks.length > 0);
      setFilteredDates(array);
    }
  }, [dates, filter]);

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
  }, [dates, datesRef, filteredDates]);

  return (
    <Main>
      <Header>
        <AppSectionTitle>Compiti</AppSectionTitle>
        <HomeworksFilter filter={filter} setFilter={setFilter} />
      </Header>
      <Content ref={contentRef}>
        {filteredDates.map((date) => (
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
