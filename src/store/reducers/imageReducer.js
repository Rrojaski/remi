import * as TYPES from "../types";

const initialState = {
  error: null,
  loading: false,
  image: ''
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_IMAGE:
      return {
        ...state,
        loading: true
      };
    case TYPES.GET_IMAGE_SUCCESS:
      return {
        ...state,
        image: action.payload,
        loading: false
      };
    case TYPES.GET_IMAGE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default imageReducer;
