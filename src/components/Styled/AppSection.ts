import styled from 'styled-components';
import { ThemeType } from './Theme';

export const AppSectionTitle = styled.h1<{ theme: ThemeType }>`
  color: ${(props) => props.theme.text};
  font-weight: bold;
  margin: 0 1rem 1rem 1rem;
  font-size: 2.4rem;
`;

const AppSection = styled.div<{ theme: ThemeType }>`
  flex: 1;
  height: 95%;
  max-height: 95%;
  padding: 5rem 5rem 2rem 5rem;
  border-radius: 31px;
  background: ${(props) => props.theme.lighterBg};
  backdrop-filter: blur(3rem);
`;

export default AppSection;
