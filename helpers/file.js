const fs = require('fs');

/**
 * Reads the entire contents of a file.
 *
 * @param {string} path A path to a file. If a URL is provided, it must use the file: protocol.
 * URL support is experimental. If a file descriptor is provided,
 * the underlying file will not be closed automatically.
 * @returns {Promise<any>} file content
 */
const readFile = (path) => {
  let data;
  try {
    data = fs.readFileSync(path, 'utf8');
  } catch (err) {
    console.error(`This file can't be opened: ${path} \n`);
  }
  return data;
};

module.exports = {
  readFile,
};
