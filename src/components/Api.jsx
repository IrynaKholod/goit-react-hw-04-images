import axios from 'axios';
const API_KEY = '30111910-fcbec35c08207b4a6ef54194c';
const QUANTITY = 12;
axios.defaults.baseURL = 'https://pixabay.com/api';

export const fetchImages = (query, page = 1) => {
  return axios.get(
    `/?q=${query}&key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true&language=en&per_page=${QUANTITY}&page=${page}`
  );
};