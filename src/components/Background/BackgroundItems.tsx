import styled from 'styled-components';
import { ThemeType } from '../Styled/Theme';

export const Layer1 = styled.div<{ theme: ThemeType }>`
  position: absolute;
  opacity: 0.4;
  background: ${(props) => props.theme.bg};
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

export default { Layer1 };
