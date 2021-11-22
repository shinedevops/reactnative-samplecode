import {
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
} from './constants';

const INITIAL_STATE = {
  loading: false,
  error: null,
  payloadcode: null,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
