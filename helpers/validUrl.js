const { URL } = require('url');

const isValidUrl = (string) => {
  try {
    URL(string);
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = isValidUrl;
