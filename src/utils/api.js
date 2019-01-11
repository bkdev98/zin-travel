import axios from 'axios';

const API_URL = 'http://localhost:7777';

export const query = async ({
  method = 'GET',
  endpoint = '/',
  data = {},
  headers = {},
  params = {},
}) => await axios({
  method,
  url: API_URL + endpoint,
  data,
  params,
  headers,
});

export const ENDPOINTS = {
  createRequest: '/request',
  getRequest: '/request',
  getCustomer: '/customer',
};
