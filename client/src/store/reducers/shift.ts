import {
  SHIFT_LIST_PENDING,
  SHIFT_LIST_FULFILLED,
  SHIFT_LIST_REJECTED,
  UPDATE_SHIFT_ENTRY,
  DELETE_SHIFT_ENTRY,
  SHIFT_LIST_BY_ID,
} from '../../constants/actions';

/* 
    This reducer is a pure function that takes the previous state and an action, 
    and returns the next state. 
  */

const INITIAL_STATE = {
  shifts: [],
  loading: false,
  error: false,
};

const shift = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SHIFT_LIST_PENDING:
      return { ...state, loading: true, error: false };
    case SHIFT_LIST_FULFILLED:
      return {
        ...state,
        loading: false,
        error: false,
        shifts: action.payload.data,
      };
    case SHIFT_LIST_REJECTED:
      return { ...state, loading: false, error: true };
    case SHIFT_LIST_BY_ID:
      return { ...state, shifts: action.payload };
    case UPDATE_SHIFT_ENTRY:
      return { ...state, shifts: action.payload };
    case DELETE_SHIFT_ENTRY:
      return { ...state, shifts: action.payload };
    default:
      return state;
  }
};

export default shift;
