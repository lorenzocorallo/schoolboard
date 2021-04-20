import Calendar from 'react-calendar';
import styled from 'styled-components';
import chroma from 'chroma-js';
import { ThemeType } from '../Styled/Theme';

const SidebarCalendar = styled(Calendar)<{ theme: ThemeType }>`
  &&& {
    background: ${(props) => props.theme.paper};
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.12);
    border-radius: 2rem;
    padding: 2rem;
    border: none;
    margin: 2rem 0;
    max-height: unset;
    font-family: 'Roboto', sans-serif;
    padding: 1.5rem 4rem 2.5rem 4rem;
    color: ${(props) => props.theme.text};
    user-select: none;
    .react-calendar__navigation {
      height: unset;
      margin: 0.5rem 0;
      justify-content: center;
      align-items: center;
      button {
        padding: 0.5rem;
        border-radius: 8px;
        min-width: none;
      }
    }
    .react-calendar__navigation button {
      min-width: 3rem;
      width: 3rem;
      height: 3rem;
      border-radius: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .react-calendar__navigation__arrow.react-calendar__navigation__next-button,
    .react-calendar__navigation__arrow.react-calendar__navigation__prev-button {
      font-size: 2rem;
      :hover {
        background: #383838;
      }
    }
    .react-calendar__navigation__arrow.react-calendar__navigation__next2-button,
    .react-calendar__navigation__arrow.react-calendar__navigation__prev2-button {
      display: none;
    }
    button.react-calendar__navigation__label {
      flex-grow: 0 !important;
      cursor: default;
      flex-basis: 16rem;
      padding-top: 7px;
      :hover {
        cursor: default;
        background: #383838;
      }
      :disabled {
        background-color: inherit;
        color: inherit;
      }
    }
    .react-calendar__navigation__label__labelText {
      font-size: 1.6rem;
    }
    .react-calendar__month-view__weekdays__weekday {
      margin: 0 0.5rem;
      font-size: 1.4rem;
      flex-basis: 2rem !important;
      display: flex;
      justify-content: center;
      align-items: center;
      abbr[title] {
        text-decoration: none;
      }
      :nth-child(6),
      :nth-child(7) {
        color: #d62b2b;
      }
    }
    .react-calendar__tile {
      transition: all 0.1s ease;
    }
    .react-calendar__tile.react-calendar__month-view__days__day {
      color: ${(props) => props.theme.text};
      height: 2.8rem;
      margin: 0.1rem;
      flex-basis: 2.8rem !important;
      font-size: 1.4rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      transition: all 0.2s ease;
      &.react-calendar__month-view__days__day--weekend {
        color: #d62b2b;
      }
      :hover {
        background: #383838;
      }
      &.react-calendar__tile--now:hover {
        background-color: ${(props) =>
          chroma(props.theme.primary).brighten(1).hex()};
      }
    }
    .react-calendar__month-view__days__day.react-calendar__tile--active,
    .react-calendar__month-view__days__day.react-calendar__tile--active:focus,
    .react-calendar__month-view__days__day.react-calendar__tile:nth-child(6):focus,
    .react-calendar__month-view__days__day.react-calendar__tile:nth-child(13):focus,
    .react-calendar__month-view__days__day.react-calendar__tile:nth-child(20):focus,
    .react-calendar__month-view__days__day.react-calendar__tile:nth-child(27):focus {
      background-color: ${(props) =>
        chroma(props.theme.secondary).darken(0.8).hex()};
      color: white;
      :hover {
        background-color: ${(props) =>
          chroma(props.theme.secondary).darken(0.5).hex()};
      }
    }
    .react-calendar__tile--now {
      background-color: ${(props) =>
        chroma(props.theme.primary).brighten(0.8).hex()};
    }
  }
`;

export default SidebarCalendar;
