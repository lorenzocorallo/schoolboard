import styled from 'styled-components';

const Scrollable = styled.div`
  overflow-y: auto;
  max-height: 100%;
  &::-webkit-scrollbar {
    background: none;
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgb(200, 200, 200);
    width: 4px;
    border-radius: 8px;
    transition: width 0.2s ease;
  }
  padding-bottom: 1rem;
`;

export default Scrollable;
