import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '40669815-ddee3a6f9b1f436f62d81fac2';
export async function fetchImages(query, page, perPages) {
  const response = await axios
    .get(
      `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPages}`
    )
    .then(response => response.data);
  // .catch(console.error);
  return response;
}
