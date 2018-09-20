import axios from 'axios';
const API_URL = 'http://localhost:3001/persons';

export const get = () => axios.get(API_URL);

export const post = (data) => axios.post(API_URL, data);
