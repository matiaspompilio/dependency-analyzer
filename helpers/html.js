const fs = require('fs');
const cheerio = require('cheerio');
const untildify = require('untildify');
const { isValidUrl, fetchUrl } = require('./url');
const { readFile } = require('./file');

/**
 * This type defines an entity to document a given site with its basic data.
 *
 * @typedef {Object} Site
 * @property {string} title - site title.
 * @property {string} url - site url.
 */

/**
 * Entity that contains html content
 *
 * @typedef {Object} HtmlContent
 * @property {string} title - site title
 * @property {string[]} scripts - site scripts
 * @property {number} length - size of html buffer interpreted as utf-8 file
 */

/**
 * Returns src url
 *
 * @param {string} source source to parse url
 * @returns {string} url
 */
const parseSourceUrl = (source = '') => {
  const sourceSplited = source.split('/');
  return sourceSplited.slice(-1).pop();
};

/**
 * Given a html string gets parsed content
 *
 * @param  {String} title Website title
 * @param  {String} html Html data
 * @return {HtmlContent} Object that contains the html content
 */
const getHtmlContent = (title, html) => {
  /* Load html string in cheerio dom */
  const $ = cheerio.load(html);

  /* Getting script resources */
  const scripts = [];
  $('script').each(function handleScript() {
    const src = $(this).attr('src');
    const sourceParsed = parseSourceUrl(src);
    if (sourceParsed) {
      scripts.push(sourceParsed);
    }
  });

  const length = Buffer.byteLength(html, 'utf-8');

  return {
    title,
    scripts,
    length,
  };
};

/**
 * Returns parsed html
 *
 * @param {Site} site - site data that contains title and url
 * @returns {Promise<HtmlContent>} html content
 */
const parseSiteHtml = async (site) => {
  const { title, url } = site;
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
  if (html) {
    result = getHtmlContent(title, html);
  }
  return result;
};

module.exports = {
  getHtmlContent,
  parseSiteHtml,
};
