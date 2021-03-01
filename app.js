const axios = require('axios');
const fs = require('fs');
const { getHtmlContent } = require('./helpers/htmlParser');
const csvReader = require('./helpers/csvReader');
const isValidUrl = require('./helpers/validUrl');
const untildify = require('untildify');

const fetchUrl = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    console.error(`This site can’t be reached: ${url}`);
    return;
  }
};

const readFile = (path) => {
  try {
    const data = fs.readFileSync(path, 'utf8');
    return data;
  } catch (err) {
    console.error(`The file couldn't be opened: ${path}`);
    return;
  }
};

async function parseSiteHtml({ title, url }) {
  let result;
  let html;
  if (isValidUrl(url)) {
    html = await fetchUrl(url);
  } else {
    /* Convert a tilde path to an absolute path */
    const parsedPath = untildify(url);
    if(fs.existsSync(parsedPath)){
      html = readFile(parsedPath);
    }
  }
  if (html) result = getHtmlContent(title, html);
  return result;
}

const websitesLength = (sites) => {
  sites.forEach((site) => {
    if (site) {
      console.log(`${site.title}, ${site.length}`);
    }
  });
};

const websitesDependencies = (sites) => {
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
  const csvSites = await csvReader('sample.csv', ['title', 'url']);
  const results = await Promise.all(csvSites.map(parseSiteHtml));

  websitesLength(results);
  websitesDependencies(results);
  websitesFrequency(results);
}

app();
