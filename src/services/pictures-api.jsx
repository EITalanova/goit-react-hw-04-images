export const BASE_URL = 'https://pixabay.com/api/',
  API_KEY = '33345344-6416458ee2baf9633eccc50a4',
  SEARCH_PARAMS = new URLSearchParams({
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
  });