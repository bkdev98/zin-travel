import {
  SAVE_SERVICE,
  UNSAVE_SERVICE,
} from '../actions';

const INITIAL_STATE = {
  saved: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_SERVICE:
      return {
        ...state,
        saved: [
          ...state.saved,
          action.payload,
        ],
      };
    case UNSAVE_SERVICE:
      return {
        ...state,
        saved: state.saved.filter(item => item.id !== action.payload.id),
      };
    default:
      return state;
  }
};
