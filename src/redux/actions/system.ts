import { SystemActionTypes } from '../../models/Actions';

export const systemLoad = (isLoaded: boolean): SystemActionTypes => {
  return {
    type: 'SYSTEM_LOAD',
    payload: isLoaded,
  };
};

export const selectDate = (date: Date): SystemActionTypes => {
  return {
    type: 'SYSTEM_NEW_DATE',
    payload: date,
  };
};
