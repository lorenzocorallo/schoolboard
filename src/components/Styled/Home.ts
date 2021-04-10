import styled from 'styled-components';
import Paper from './Paper';
import Scrollable from './Scrollable';

export const HomeSection = styled.div`
  display: flex;
  flex-direction: column;
  opacity: 0;
`;

export const HomeSectionHeader = styled(Paper)`
  padding: 2.5rem;
  margin: 1rem;
  background: ${(props) => props.theme.primary};
  font-size: 1.8rem;
`;

export const HomeSectionContent = styled(Scrollable)`
  padding-bottom: 0.8rem;
`;

export default null;
