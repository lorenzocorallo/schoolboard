import { motion } from 'framer-motion';
import styled from 'styled-components';
import { ThemeType } from './Theme';

const Paper = styled(motion.div)<{
  theme: ThemeType;
  primary?: boolean;
  secondary?: boolean;
}>`
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.12);
  border-radius: 2rem;
  background: ${(props) =>
    (props.primary && props.theme.primary) ||
    (props.secondary && props.theme.secondary) ||
    props.theme.paper};
  padding: ${(props) => (props.primary || props.secondary ? '2.5rem' : '2rem')};
  margin: 1rem;
  h3 {
    color: ${(props) => props.theme.text};
  }
`;

export const PaperHeader = styled.div`
  padding-bottom: 1rem;
  display: flex;
  p {
    font-size: 1.6rem;
    font-weight: 600;
    margin-left: 1rem;
  }
`;

export const PaperContent = styled.div`
  display: flex;
  align-items: center;
`;

export const PaperFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 1.2rem;
  color: #aaa;
  margin-top: 1rem;
  padding-top: 0.6rem;
`;

export const PaperHeaderLine = styled.div<{ color?: string }>`
  height: 16px;
  width: 3px;
  background-color: ${(props) => props.color || 'red'};
  border-radius: 8px;
`;

export default Paper;
