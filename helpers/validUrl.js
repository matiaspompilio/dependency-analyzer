const { URL } = require('url');

const isValidUrl = (string) => {
  try {
    /* eslint-disable no-new */
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = isValidUrl;
