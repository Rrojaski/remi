import * as TYPES from "../types";

const initialState = {
  error: null,
  loading: false,
  cards: [],
  currentCard: {}
};

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_FIRESTORE_CARDS:
      return {
        ...state,
        loading: true
      };
    case TYPES.GET_FIRESTORE_CARDS_SUCCESS:
      return {
        ...state,
        cards: action.payload,
        loading: false
      };
    case TYPES.GET_FIRESTORE_CARDS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case TYPES.UPDATE_FIRESTORE_CARD_GRADE:
      return {
        ...state,
        loading: true
      };
    case TYPES.UPDATE_FIRESTORE_CARD_GRADE_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case TYPES.UPDATE_FIRESTORE_CARD_GRADE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case TYPES.UPDATE_FIRESTORE_CARD_CONTENT:
      return {
        ...state,
        loading: true
      };
    case TYPES.UPDATE_FIRESTORE_CARD_CONTENT_SUCCESS:
      return {
        ...state,
        currentCard: action.payload,
        loading: false
      };
    case TYPES.UPDATE_FIRESTORE_CARD_CONTENT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case TYPES.UPDATE_CURRENT_CARD:
      return {
        ...state,
        currentCard: action.currentCard,
        loading: true
      };
    case TYPES.UPDATE_CURRENT_CARD_SUCCESS:
      return {
        ...state,
        currentCard: action.payload,
        loading: false
      };
    case TYPES.UPDATE_CURRENT_CARD_FAIL:
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
