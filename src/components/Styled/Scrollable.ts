import styled from 'styled-components';
import { ThemeType } from './Theme';

const Scrollable = styled.div<{ theme: ThemeType }>`
  overflow-y: auto;
  max-height: 100%;
  margin-bottom: 1rem;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    background: none;
    width: 4px;
  }
  ::-webkit-scrollbar-thumb {
    height: 10px;
    background: ${(props) => props.theme.paper2};
    width: 4px;
    border-radius: 8px;
    transition: width 0.2s ease;
  }
`;

export default Scrollable;
