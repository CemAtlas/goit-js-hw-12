import axios from 'axios';

const API_KEY = '50804443-2b846a940781baef8affcab62';
const BASE_URL = 'https://pixabay.com/api/';
let currentPage = 1;
let searchQuery = '';

export async function fetchImages(query) {
  if (query !== searchQuery) {
    currentPage = 1;
    searchQuery = query;
  }

  const params = {
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: 40,
  };

  const response = await axios.get(BASE_URL, { params });
  currentPage += 1;

  return response.data;
}

export function resetPage() {
  currentPage = 1;
}
