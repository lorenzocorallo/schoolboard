import React from 'react';
import styled from 'styled-components';
import { checkMarkColor, fixSubject } from '../../util/argo/util';
import { ThemeType } from '../Styled/Theme';

const Main = styled.div<{ theme: ThemeType; color: string }>`
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  align-items: center;
  flex: 0.32 1;
  border: 2px solid ${(props) => props.color};
  span {
    font-weight: bold;
    font-size: 2.4rem;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    color: ${(props) => props.color};
  }
  p {
    display: flex;
    font-weight: 500;
    font-size: 1.6rem;
    align-items: center;
  }
`;

const HomeMark = ({
  subject,
  value,
}: {
  subject: string;
  value: string | number;
}) => {
  return (
    <Main className="home__section__item" color={checkMarkColor(value)}>
      <span>{value}</span>
      <p>{fixSubject(subject)}</p>
    </Main>
  );
};

export default HomeMark;
