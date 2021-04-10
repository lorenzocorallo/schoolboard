import React from 'react';
import styled from 'styled-components';
import { Mark } from '../../../models/Student';
import { SDMark } from '../../Styled/Marks';
import { PaperContent, PaperFooter } from '../../Styled/Paper';

interface Props {
  mark: Mark;
}

const Content = styled(PaperContent)`
  align-items: flex-start;
  justify-content: space-between;
`;

const Footer = styled(PaperFooter)`
  align-items: flex-start;
  justify-content: flex-start;
`;

const MSDMark = ({ mark }: Props) => {
  return (
    <SDMark>
      <Content>
        <p className="description">{mark.description}</p>
        <span className="value">{mark.value}</span>
      </Content>
      <Footer>
        <p className="date">{mark.date.toLocaleDateString()}</p>
      </Footer>
    </SDMark>
  );
};

export default MSDMark;
