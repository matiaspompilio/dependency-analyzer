const cheerio = require('cheerio');
const axios = require('axios');

const fetchUrl = async (url) => {
  const response = await axios.get(url);
  return response;
};

const urlLenght = async () => {
  const response = await fetchUrl('https://www.facebook.com/');
  const { data } = response;
  console.log(Buffer.byteLength(data, 'utf-8'));
};

const getScripts = async () => {
  const response = await fetchUrl('https://www.trello.com/');
  const { data } = response;
  const $ = cheerio.load(data);
  const scripts =  $("script").attr("src");
  console.log(scripts);
};

urlLenght();
