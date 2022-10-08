import axios from 'axios';

const KEY = '29541275-d631332db7b3701d55f9f7fc0';

axios.defaults.baseURL = `https://pixabay.com/api`;

export const fetchPhotos = async ({ name, page }) => {
  const response = await axios.get(
    `/?key=${KEY}&image_type=photo&orientation=horizontal&page=${page}&per_page=12&q=${name}`
  );

  return response.data.hits;
};
