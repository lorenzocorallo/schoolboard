import styled from 'styled-components';

const Scrollable = styled.div`
  overflow-y: auto;
  max-height: 100%;
  padding-bottom: 1rem;
  ::-webkit-scrollbar {
    background: none;
    width: 4px;
  }
  ::-webkit-scrollbar-thumb {
    height: 10px;
    background: rgb(190, 190, 190);
    width: 4px;
    border-radius: 8px;
    transition: width 0.2s ease;
  }
`;

export default Scrollable;
