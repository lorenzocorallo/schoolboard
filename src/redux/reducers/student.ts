import { StudentActionTypes } from '../../models/Actions';
import Student from '../../models/Student';

const initalState: Student = {
  isLogged: false,
  homeworks: [],
  marks: [],
  memos: [],
  today: {
    homeworks: [],
    marks: [],
    memos: [],
    topics: [],
    news: [],
  },
  topics: [],
  info: {
    firstName: '',
    lastName: '',
    gender: '',
    class: '',
    school: '',
  },
  subjects: [],
  authToken: '',
  absents: {
    absents: [],
    delays: [],
    exits: [],
  },
  currentYear: {
    start: new Date(),
    end: new Date(),
  },
};

const studentReducer = (
  state = initalState,
  { type, payload }: StudentActionTypes
) => {
  switch (type) {
    case 'STUDENT_FETCH':
      return { ...state, ...payload };
    case 'STUDENT_LOGOUT':
      return initalState;
    default:
      return state;
  }
};

export default studentReducer;
