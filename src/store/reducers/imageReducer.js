import * as TYPES from "../types";

const initialState = {
  error: null,
  loading: false,
  image: []
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_IMAGES:
      return {
        ...state,
        images: action.payload,
        loading: true
      };
    case TYPES.GET_IMAGES_SUCCESS:
      return {
        ...state,
        image: action.payload,
        loading: false
      };
    case TYPES.GET_IMAGES_FAIL:
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
