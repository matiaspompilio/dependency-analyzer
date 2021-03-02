#!/usr/bin/env node

const { program } = require('commander');
const { readCSV } = require('./helpers/csv');
const { parseSiteHtml } = require('./helpers/html');
const { version } = require('./package.json');

program
  .version(version)
  .option('-l, --length', 'Returns each website name with its length in bytes')
  .option(
    '-d, --dependencies',
    'Returns each js with the website where it belongs',
  )
  .option(
    '-r, --resources',
    'Returns how often resources appear on the websites',
  )
  .option('-f, --file <path>', 'Csv file where the website data is read')
  .parse(process.argv);

/**
 * Entity that contains html content
 *
 * @typedef {Object} HtmlContent
 * @property {string} title - site title
 * @property {string[]} scripts - site scripts
 * @property {number} length - size of html buffer interpreted as utf-8 file
 */

/**
 * Prints title and size for each site
 * @param {HtmlContent[]} sites array that contains data for each site
 */
const websitesLength = (sites) => {
  console.log('Websites length is:');
  sites.forEach((site) => {
    console.log(`${site.title}, ${site.length}`);
  });
  console.log('\n');
};

/**
 * Prints title and scripts for each site
 * @param {HtmlContent[]} sites array that contains data for each site
 */
const websitesDependencies = (sites) => {
  console.log('Websites dependencies are:');
  sites.forEach((site) => {
    site.scripts.forEach((script) => {
      console.log(`${site.title}, ${script}`);
    });
  });
  console.log('\n');
};

/**
 * Prints resources frequency
 * @param {HtmlContent[]} sites array that contains data for each site
 */
const websitesFrequency = (sites) => {
  const result = {};
  console.log('Resources frequency is:');
  sites.forEach((site) => {
    site.scripts.forEach((script) => {
      if (script in result) {
        result[script] += 1;
      } else {
        result[script] = 1;
      }
    });
  });
  Object.entries(result).forEach(([key, value]) => {
    console.log(`${key}, ${value}`);
  });
  console.log('\n');
};

const app = async () => {
  const options = program.opts();

  if (
    (!options.length && !options.dependencies && !options.resources)
    || !options.file
  ) {
    console.log("Try '--help' command for more information.");
    return;
  }

  const sites = await readCSV(options.file, ['title', 'url']);
  const parsedSites = await Promise.all(sites.map(parseSiteHtml));
  const results = parsedSites.filter(Boolean);

  if (options.length) websitesLength(results);
  if (options.dependencies) websitesDependencies(results);
  if (options.resources) websitesFrequency(results);
};

app();
