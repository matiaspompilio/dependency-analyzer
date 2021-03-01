const cheerio = require('cheerio');

const parseSourceUrl = (source = '') => {
  const sourceSplited = source.split('/');
  return sourceSplited.slice(-1).pop();
};

/**
 * Given a html string gets parsed content
 * @param  {String} title Website title
 * @param  {String} html Html data
 * @return {Object}      Object containing the html content
 */
const getHtmlContent = (title, html) => {
  /* Load html string in cheerio dom */
  const $ = cheerio.load(html);

  /* Getting script resources */
  const scripts = [];
  $('script').each(function () {
    const src = $(this).attr('src');
    const sourceParsed = parseSourceUrl(src);
    if (sourceParsed) {
      scripts.push(sourceParsed);
    }
  });

  const length = Buffer.byteLength(html, 'utf-8');

  const content = {
    title,
    scripts,
    length,
  };
  return content;
};

module.exports = {
  getHtmlContent,
};
