import chroma from 'chroma-js';
import styled from 'styled-components';
import { ThemeType } from './Theme';

export const AppSectionTitle = styled.h1`
  color: #101751;
  font-weight: bold;
  margin: 0 1rem;
  font-size: 2.4rem;
`;

const AppSection = styled.div<{ theme: ThemeType }>`
  flex: 1;
  height: 95%;
  max-height: 95%;
  padding: 5rem;
  border-radius: 31px;
  background: ${(props) => chroma(props.theme.paper).alpha(0.6).hex()};
  backdrop-filter: blur(3rem);
`;

export default AppSection;
