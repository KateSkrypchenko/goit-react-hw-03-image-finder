import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

export const fetchSearchImage = async (searchQuery, page) => {
  const response = await axios.get('/', {
    params: {
      key: '31749564-17a32f2ca24bf9158a5d3e6cb',
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      page: page,
    },
  });
  return response.data;
};
