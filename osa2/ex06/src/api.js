import axios from 'axios';
require('dotenv').config(); // eslint-disable-line

const API_URL = process.env.NODE_ENV === 'production' // eslint-disable-line
    ? 'https://best-phonebook-app-ever.now.sh/api/persons'
    : 'http://localhost:3001/api/persons';

export const get = () => axios.get(API_URL);

export const post = data => axios.post(API_URL, data);

export const del = id => axios.delete(`${API_URL}/${id}`);

export const put = (id, data) => axios.put(`${API_URL}/${id}`, data);
