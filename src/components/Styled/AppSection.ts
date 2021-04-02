import styled from 'styled-components';
import { ThemeType } from './Theme';

export const AppSectionTitle = styled.h1`
  color: #101751;
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
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(3rem);
`;

export default AppSection;
