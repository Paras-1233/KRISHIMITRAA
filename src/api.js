import axios from 'axios';

const API_URL = 'http://localhost:5000'; // your backend URL

export const signupBuyer = (buyerData) => {
  return axios.post(`${API_URL}/api/buyers/signup`, buyerData);
};

export const loginBuyer = (loginData) => {
  return axios.post(`${API_URL}/api/buyers/login`, loginData);
};
