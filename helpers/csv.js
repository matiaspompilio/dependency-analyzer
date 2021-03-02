const csv = require('csv-parser');
const fs = require('fs');

/**
 * Returns the rows of a given csv file.
 *
 * @param {string} csvFilePath A path to a csv file
 * @param {optionsOrHeaders} options As an alternative to passing an options object,
 * you may pass an Array[String] which specifies the headers to use.
 * If you need to specify options and headers,
 * please use the the object notation with the headers property.
 *
 * @returns {Promise<any[]>} a promise that contains an array of rows values
 */
const readCSV = async (csvFilePath, options = {}) => new Promise((resolve, reject) => {
  const results = [];
  fs.createReadStream(csvFilePath)
    .pipe(csv(options))
    .on('data', (data) => results.push(data))
    .on('end', () => resolve(results))
    .on('error', (err) => reject(err));
});

module.exports = {
  readCSV,
};
