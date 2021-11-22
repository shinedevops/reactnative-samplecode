import {
  PROFILE_REQUEST,
  PROFILE_FAIL,
  PROFILE_SUCCESS,
  EDIT_CIMAGE_FAIL,
  EDIT_CIMAGE_REQUEST,
  EDIT_CIMAGE_SUCCESS,
} from './constants';

const INITIAL_STATE = {
  loading: false,
  error: null,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case PROFILE_FAIL:
      return {
        ...state,
        loading: false,
      };
    case EDIT_CIMAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case EDIT_CIMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case EDIT_CIMAGE_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
