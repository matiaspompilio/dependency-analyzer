const axios = require('axios');
const { URL } = require('url');

/**
 * This function tells if a string is a valid url or not.
 * @param {string} str string that may or not be a valid url
 * @returns {boolean} true if str is a valid url. Otherwise, false.
 */
const isValidUrl = (str) => {
  try {
    const url = new URL(str);
    return !!url;
  } catch (err) {
    return false;
  }
};

/**
 * Fetch data for a given url.
 * @param {string} url valid url
 * @returns {Promise<any>} fetch response content
 */
const fetchUrl = async (url) => {
  let data;
  try {
    const response = await axios.get(url);
    data = response.data;
  } catch (err) {
    console.error(`This site can’t be reached: ${url} \n`);
  }
  return data;
};

module.exports = {
  isValidUrl,
  fetchUrl,
};
