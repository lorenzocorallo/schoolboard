import Student from './Student';

export const STUDENT_LOGIN = 'STUDENT_LOGIN';
export const STUDENT_FETCH = 'STUDENT_FETCH';
export const STUDENT_LOGOUT = 'STUDENT_LOGOUT';

interface StudentFetchAction {
  type: typeof STUDENT_FETCH;
  payload: Student;
}

interface StudentLogoutAction {
  type: typeof STUDENT_LOGOUT;
  payload: null;
}

export const SYSTEM_LOAD = 'SYSTEM_LOAD';
export const SYSTEM_NEW_DATE = 'SYSTEM_NEW_DATE';

interface SystemLoadAction {
  type: typeof SYSTEM_LOAD;
  payload: boolean;
}

interface SystemSelectDate {
  type: typeof SYSTEM_NEW_DATE;
  payload: Date;
}

export type StudentActionTypes = StudentFetchAction | StudentLogoutAction;
export type SystemActionTypes = SystemLoadAction | SystemSelectDate;
