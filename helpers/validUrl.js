const { URL } = require('url');

const isValidUrl = (string) => {
  try {
    const url = new URL(string);
    return !!url;
  } catch (err) {
    return false;
  }
};

module.exports = isValidUrl;
