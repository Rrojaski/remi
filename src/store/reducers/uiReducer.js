import * as TYPES from '../types'

const initialState = {
  openDeleteAccount: false
};

const uiReducer = (state = initialState, action) => {

  switch (action.type) {
    case TYPES.TOGGLE_DELETE_ACCOUNT:
      return {
        ...state,
        openDeleteAccount: !state.openDeleteAccount
      };
    default:
      return state;
  }
}

export default uiReducer;