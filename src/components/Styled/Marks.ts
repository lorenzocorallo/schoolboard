import { motion } from 'framer-motion';
import styled from 'styled-components';
import Paper, { PaperHeaderLine } from './Paper';
import Scrollable from './Scrollable';
import { ThemeType } from './Theme';

export const Subject = styled(Paper)`
  width: 100%;
  margin: 0;
  font-size: 2.2rem;
  cursor: pointer;
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const SubjectLine = styled(PaperHeaderLine)`
  margin-right: 1rem;
`;

export const SubjectName = styled.h4`
  font-size: 2.2rem;
  font-weight: bold;
  flex: 1;
`;

export const SubjectTotAvg = styled.p`
  font-size: 2.2rem;
  font-weight: bold;
`;

export const SubjectHeader = styled(motion.div)`
  display: flex;
  padding: 3rem;
  align-items: center;
  pointer-events: none;
  justify-items: flex-start;
  position: relative;
`;

export const SubjectContent = styled(motion.div)`
  padding: 0 2rem;
  cursor: default;
  height: 100%;
  overflow: hidden;
`;

export const SDSection = styled(motion.div)`
  margin: 2rem 0;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  :nth-child(2) {
    margin: 2rem 1rem;
  }
`;

export const SDHeader = styled(Paper)`
  padding: 2.5rem;
  margin: 0.5rem 1rem;
  background: ${(props) => props.theme.primary};
  font-size: 2.2rem;
  :nth-child(2) {
    cursor: pointer;
    user-select: none;
  }

  input[type='checkbox'] {
    height: 0;
    width: 0;
    visibility: hidden;
  }

  label {
    cursor: pointer;
    text-indent: -9999px;
    width: 60px;
    height: 30px;
    background: grey;
    display: block;
    border-radius: 100px;
    position: relative;
  }

  label:after {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    width: 24px;
    height: 24px;
    background: #fff;
    border-radius: 90px;
    transition: 0.3s;
  }

  /* input:checked + label {
    background: #466edd;
  } */

  input:checked + label:after {
    left: calc(100% - 5px);
    transform: translateX(-100%);
  }

  label:active:after {
    width: 29px;
  }
`;

export const SDContent = styled(Scrollable)<{ theme: ThemeType }>`
  max-height: auto;
  padding-bottom: 0;
  margin: 1rem 0;
  overflow-y: auto;
`;

export const SDMark = styled(Paper)<{ theme: ThemeType }>`
  margin: 1.2rem 1rem;
  background: ${(props) => props.theme.paper2};
  .value {
    font-size: 2.4rem;
    margin-left: 2rem;
    text-align: right;
  }
  .description {
    font-size: 1.6rem;
  }
  :nth-child(1) {
    margin-top: 0;
  }
  :nth-last-child(1) {
    margin-bottom: 0;
  }
`;
