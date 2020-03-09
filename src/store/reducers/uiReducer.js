import * as TYPES from "../types";

const initialState = {
  error: null,
  loading: false,
  isShowAnswer: false,
  isShowDefinition: false
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.UPDATE_SHOW_ANSWER:
      return {
        ...state,
        loading: true
      };
    case TYPES.UPDATE_SHOW_ANSWER_SUCCESS:
      return {
        ...state,
        isShowAnswer: action.payload,
        loading: false
      };
    case TYPES.UPDATE_SHOW_ANSWER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case TYPES.UPDATE_SHOW_DEFINITION:
      return {
        ...state,
        loading: true
      };
    case TYPES.UPDATE_SHOW_DEFINITION_SUCCESS:
      return {
        ...state,
        isShowDefinition: action.payload,
        loading: false
      };
    case TYPES.UPDATE_SHOW_DEFINITION_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default uiReducer;
