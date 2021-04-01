import { Dispatch } from 'redux';
import { StudentActionTypes } from '../../models/Actions';
import Student from '../../models/Student';
import { argoLogin, fetchStudent } from '../../util/argo/argo';
import { systemLoad } from './system';

const fetchUserAction = (student: Student): StudentActionTypes => {
  return {
    type: 'STUDENT_FETCH',
    payload: { ...student },
  };
};

const logoutUserAction = (): StudentActionTypes => {
  return {
    type: 'STUDENT_LOGOUT',
    payload: null,
  };
};

export const loginUser = (
  school_code: string,
  username: string,
  password: string
) => async (dispatch: Dispatch) => {
  const { token } = await argoLogin(school_code, username, password);
  const student = await fetchStudent(school_code, token);
  dispatch(systemLoad(true));
  if (student) {
    dispatch(fetchUserAction(student));
  } else {
    dispatch(logoutUserAction());
  }
};

export const fetchUser = (school_code: string, token: string) => async (
  dispatch: Dispatch
) => {
  const student = await fetchStudent(school_code, token);
  dispatch(systemLoad(true));
  if (student) {
    dispatch(fetchUserAction(student));
  } else {
    dispatch(logoutUserAction());
  }
};
