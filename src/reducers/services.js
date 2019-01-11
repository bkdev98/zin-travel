import {
  SAVE_SERVICE,
  UNSAVE_SERVICE,
  CREATE_REQUEST_FAILURE,
  CREATE_REQUEST_INITIAL,
  CREATE_REQUEST_SUCCESS,
  // GET_REQUEST_LIST_FAILURE,
  // GET_REQUEST_LIST_INITIAL,
  GET_REQUEST_LIST_SUCCESS,
  // GET_CUSTOMER_LIST_FAILURE,
  // GET_CUSTOMER_LIST_INITIAL,
  GET_CUSTOMER_LIST_SUCCESS,
} from '../actions';

const INITIAL_STATE = {
  saved: [],
  sendingRequest: false,
  error: null,
  requestList: [],
  customerList: [],
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
    case CREATE_REQUEST_INITIAL:
      return {
        ...state,
        sendingRequest: true,
        error: null,
      };
    case CREATE_REQUEST_SUCCESS:
      return {
        ...state,
        sendingRequest: false,
      };
    case CREATE_REQUEST_FAILURE:
      return {
        ...state,
        sendingRequest: false,
        error: action.payload,
      };
    case GET_REQUEST_LIST_SUCCESS:
      return {
        ...state,
        requestList: action.payload,
      };
    case GET_CUSTOMER_LIST_SUCCESS:
      return {
        ...state,
        customerList: action.payload,
      };
    default:
      return state;
  }
};
