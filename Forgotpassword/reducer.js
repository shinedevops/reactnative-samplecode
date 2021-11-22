import {FORGOT_FAIL, FORGOT_REQUEST, FORGOT_SUCCESS} from './constants';

const INITIAL_STATE = {
  loading: false,
  error: null,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FORGOT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FORGOT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case FORGOT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
