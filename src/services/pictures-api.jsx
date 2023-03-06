import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '28143013-44919de38ad9e5402793063fb';
const SEARCH_PARAMS = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 12,
});

const getData = ({ searchQuery = '', page = 1 }) => {
  const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&page=${page}&${SEARCH_PARAMS}`;
  return axios.get(url).then(({ data }) => data);
};

export default getData;
