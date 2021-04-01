const monthNames = [
  'Gennaio',
  'Febbraio',
  'Marzo',
  'Aprile',
  'Maggio',
  'Giugno',
  'Luglio',
  'Agosto',
  'Settembre',
  'Ottobre',
  'Novembre',
  'Dicembre',
];

export const getDate = (date: Date) =>
  `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

export const getMonth = (date: Date) => {
  return monthNames[date.getMonth()];
};

export const getExtendedDate = (date: Date) => {
  return `${date.getDate()} ${getMonth(date)} ${date.getFullYear()}`;
};

export const getTomorrow = (date?: Date) => {
  const today = new Date(date || '');
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
};

export const checkIfSameDate = (date1: Date, date2: Date = getTomorrow()) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const orderArrayByDate = (array: any[]) =>
  array.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const getDefaultSchoolPeriods = () => {
  const today = new Date();
  const month = today.getMonth();
  const isCurrentYearSchoolStartingYear = month <= 11 && month >= 8;
  const year = isCurrentYearSchoolStartingYear
    ? today.getFullYear()
    : today.getFullYear() - 1;
  const first = {
    start: new Date(`${year}/09/01`),
    end: new Date(`${year}/12/31`),
  };
  const second = {
    start: new Date(`${year + 1}/01/01`),
    end: new Date(`${year + 1}/06/31`),
  };
  return { first, second };
};
