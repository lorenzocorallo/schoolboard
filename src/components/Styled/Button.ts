import styled from 'styled-components';
import { ThemeType } from './Theme';

const Button = styled.button<{
  theme: ThemeType;
  primary?: boolean;
  secondary?: boolean;
  flat?: boolean;
}>`
  padding: ${(props) => (props.primary ? '2.5rem' : '2rem')};
  background: ${(props) => {
    if (props.primary) return props.theme.primary;
    if (props.secondary) return props.theme.secondary;
    if (props.flat) return 'none';
    return props.theme.bg;
  }};
  color: ${(props) => {
    if (props.flat) return props.theme.primary;
    if (props.primary || props.secondary) return props.theme.invertedText;
    return props.theme.text;
  }};
  font-weight: 600;
  border-radius: 10px;
  display: flex;
  font-size: 1.6rem;
  width: 100%;
  justify-content: center;
  align-items: center;
  svg {
    pointer-events: none;
  }
  img {
    margin: 0 1rem;
    height: 1.2rem;
  }

  &:hover {
    background-color: mix(
      ${(props) => props.theme.primary},
      ${(props) => props.theme.text},
      70%
    );
  }

  &.secondary {
    &:hover {
      background-color: mix(
        ${(props) => props.theme.secondary},
        ${(props) => props.theme.text},
        70%
      );
    }
  }
`;

export default Button;
