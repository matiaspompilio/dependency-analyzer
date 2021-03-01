const csv = require('csv-parser');
const fs = require('fs');

const csvReader = async (csvFile, options = {}) => new Promise((resolve, reject) => {
  const results = [];
  fs.createReadStream(csvFile)
    .pipe(csv(options))
    .on('data', (data) => results.push(data))
    .on('end', () => resolve(results))
    .on('error', (err) => reject(err));
});
module.exports = csvReader;
