const axios = require('axios');
const { getHtmlContent } = require('./helpers/htmlParser');

const fetchUrl = async (url) => {
  const response = await axios.get(url);
  return response;
};

const app = async () => {
  const response = await fetchUrl('https://www.trello.com/');
  const { data } = response;
  getHtmlContent(data);
};

app();
