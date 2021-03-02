const path = require('path');
const { readCSV } = require('../helpers/csv');

describe('Csv parser tests', () => {
  test('Return webpage title from csv', async () => {
    const csvPath = path.resolve(__dirname, 'test.csv');
    const csv = await readCSV(csvPath, ['title', 'url']);

    expect(csv[1].title).toEqual('Trello');
  });

  test('Return webpage title from url', async () => {
    const csvPath = path.resolve(__dirname, 'test.csv');
    const csv = await readCSV(csvPath, ['title', 'url']);

    expect(csv[1].url).toEqual('~/trello/index.html');
  });

  test('Test csv readed length', async () => {
    const csvPath = path.resolve(__dirname, 'test.csv');
    const csv = await readCSV(csvPath, ['title', 'url']);

    expect(csv.length).toEqual(5);
  });
});
