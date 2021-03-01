const axios = require('axios');
const fs = require('fs');
const untildify = require('untildify');
const { program } = require('commander');
const { getHtmlContent } = require('./helpers/htmlParser');
const csvReader = require('./helpers/csvReader');
const isValidUrl = require('./helpers/validUrl');

program
  .version('0.0.1')
  .option('-l, --length', 'Returns each website name with its length in bytes')
  .option('-d, --dependencies', 'Returns each js with the website where it belongs')
  .option('-r, --resources', 'Returns how often resources appear on the websites')
  .option('-f, --file <path>', 'Csv file where the website data is read');

program.parse(process.argv);

const fetchUrl = async (url) => {
  let data;
  try {
    const response = await axios.get(url);
    data = response.data;
    return data;
  } catch (err) {
    console.error(`This site can’t be reached: ${url} \n`);
  }
  return data;
};

const readFile = (path) => {
  let data;
  try {
    data = fs.readFileSync(path, 'utf8');
  } catch (err) {
    console.error(`This file can't be opened: ${path} \n`);
  }
  return data;
};

async function parseSiteHtml({ title, url }) {
  let result;
  let html;
  if (isValidUrl(url)) {
    html = await fetchUrl(url);
  } else {
    /* Convert a tilde path to an absolute path */
    const parsedPath = untildify(url);
    if (fs.existsSync(parsedPath)) {
      html = readFile(parsedPath);
    }
  }
  if (html) result = getHtmlContent(title, html);
  return result;
}

const websitesLength = (sites) => {
  console.log('Websites length are:');
  sites.forEach((site) => {
    if (site) {
      console.log(`${site.title}, ${site.length}`);
    }
  });
};

const websitesDependencies = (sites) => {
  console.log('Websites dependencies are:');
  sites.forEach((site) => {
    if (site) {
      site.scripts.forEach((script) => {
        console.log(`${site.title}, ${script}`);
      });
    }
  });
};

const websitesFrequency = (sites) => {
  const result = {};
  console.log('Resources frequency is:');
  sites.forEach((site) => {
    if (site) {
      site.scripts.forEach((script) => {
        if (script in result) {
          result[script] += 1;
        } else {
          result[script] = 1;
        }
      });
    }
  });
  Object.keys(result).forEach((key) => {
    console.log(`${key}, ${result[key]}`);
  });
};

async function app() {
  const options = program.opts();
  if (!options.length && !options.dependencies && !options.resources) {
    console.log("Try '--help' command for more information.");
    return;
  }
  const { file } = options;
  const csvSites = await csvReader(file, ['title', 'url']);
  const results = await Promise.all(csvSites.map(parseSiteHtml));

  if (options.length) websitesLength(results);
  if (options.dependencies) websitesDependencies(results);
  if (options.resources) websitesFrequency(results);
}

app();
