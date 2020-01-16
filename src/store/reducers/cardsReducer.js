import * as TYPES from "../types";

const initialState = {
  error: null,
  loading: false,
  cards: []
};

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_CARDS:
      return {              
        ...state,
        loading: true
      };
    case TYPES.GET_CARDS.SUCCESS:
      return {
        ...state,
        cards: action.payload,
        loading: false
      };
    case TYPES.GET_CARDS.FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default cardReducer;
