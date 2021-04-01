import React, { useEffect } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import HomeHws from '../components/Home/HomeHws';
import HomeMarks from '../components/Home/HomeMarks';
import HomeMemos from '../components/Home/HomeMemos';
import HomeTopics from '../components/Home/HomeTopics';
import AppSection, { AppSectionTitle } from '../components/Styled/AppSection';

const Main = styled(AppSection)`
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: 5% 15rem 81%;
  column-gap: 4px;
  max-height: 100%;
  max-width: calc(100vw - 48rem);
`;

const Home = () => {
  useEffect(() => {
    gsap.to('.home__section', {
      opacity: 1,
      stagger: 0.1,
      duration: 0.3,
      delay: 0.1,
    });
  }, []);

  return (
    <Main>
      <AppSectionTitle>Dashboard</AppSectionTitle>
      <HomeMarks />
      <HomeHws />
      <HomeTopics />
      <HomeMemos />
    </Main>
  );
};

export default Home;
