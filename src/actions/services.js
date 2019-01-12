import { query, ENDPOINTS } from '../utils/api';

export const SAVE_SERVICE = 'save-service';
export const UNSAVE_SERVICE = 'unsave-service';
export const CREATE_REQUEST_INITIAL = 'create-request-initial';
export const CREATE_REQUEST_SUCCESS = 'create-request-success';
export const CREATE_REQUEST_FAILURE = 'create-request-failure';
export const GET_REQUEST_LIST_INITIAL = 'get-request-list-initial';
export const GET_REQUEST_LIST_SUCCESS = 'get-request-list-success';
export const GET_REQUEST_LIST_FAILURE = 'get-request-list-failure';
export const GET_CUSTOMER_LIST_INITIAL = 'get-customer-list-initial';
export const GET_CUSTOMER_LIST_SUCCESS = 'get-customer-list-success';
export const GET_CUSTOMER_LIST_FAILURE = 'get-customer-list-failure';

export const saveService = data => ({
  type: SAVE_SERVICE,
  payload: data,
});

export const unsaveService = data => ({
  type: UNSAVE_SERVICE,
  payload: data,
});

export function createRequest(data, callback) {
  return async dispatch => {
    dispatch({ type: CREATE_REQUEST_INITIAL });
    try {
      const result = await query({
        method: 'POST',
        data,
        endpoint: ENDPOINTS.createRequest,
      });
      if (result.status === 201) {
        callback && callback.success && callback.success();
        dispatch({ type: CREATE_REQUEST_SUCCESS, payload: result.data });
      } else {
        callback && callback.failure && callback.failure();
        dispatch({ type: CREATE_REQUEST_FAILURE });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: CREATE_REQUEST_FAILURE });
      callback && callback.failure && callback.failure();
    }
  };
};

export function getRequestList() {
  return async dispatch => {
    dispatch({ type: GET_REQUEST_LIST_INITIAL });
    try {
      const result = await query({
        method: 'GET',
        endpoint: ENDPOINTS.getRequest,
      });
      if (result.status === 200) {
        dispatch({ type: GET_REQUEST_LIST_SUCCESS, payload: result.data });
      } else {
        dispatch({ type: GET_REQUEST_LIST_FAILURE });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_REQUEST_LIST_FAILURE });
    }
  };
};

export function getCustomerList() {
  return async dispatch => {
    dispatch({ type: GET_CUSTOMER_LIST_INITIAL });
    try {
      const result = await query({
        method: 'GET',
        endpoint: ENDPOINTS.getCustomer,
      });
      if (result.status === 200) {
        dispatch({ type: GET_CUSTOMER_LIST_SUCCESS, payload: result.data });
      } else {
        dispatch({ type: GET_CUSTOMER_LIST_FAILURE });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_CUSTOMER_LIST_FAILURE });
    }
  };
};
