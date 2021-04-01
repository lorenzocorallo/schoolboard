import { SystemActionTypes } from '../../models/Actions';
import System from '../../models/System';
import { getDefaultSchoolPeriods } from '../../util/dates';

const getPeriods = () => {
  const periods = getDefaultSchoolPeriods();
  localStorage.setItem('schoolPeriods', JSON.stringify(periods));
  return periods;
};

const initalState: System = {
  isLoaded: false,
  selectedDate: new Date(),
  schoolPeriods: getPeriods(),
};

const systemReducer = (
  state = initalState,
  { type, payload }: SystemActionTypes
) => {
  switch (type) {
    case 'SYSTEM_LOAD':
      return { ...state, isLoaded: payload };
    case 'SYSTEM_NEW_DATE':
      return { ...state, selectedDate: payload };
    default:
      return state;
  }
};

export default systemReducer;
