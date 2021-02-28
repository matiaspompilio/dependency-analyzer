const cheerio = require('cheerio');

const parseSourceUrl = (source = '') => {
  const regex = /[\w.]*\.js/i;
  let result = '';
  const sourceParsed = regex.exec(source);
  if (sourceParsed) {
    [result] = sourceParsed;
  }
  return result;
};

/**
 * Given a html string gets parsed content
 * @param  {String} html The html data
 * @return {Object}      Object containing the html content
 */
const getHtmlContent = (html) => {
  /* Load html string in cheerio dom */
  const $ = cheerio.load(html);

  /* Getting page title from the html loaded */
  const title = $('title').text();

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
  console.log(content);
  return content;
};

module.exports = {
  getHtmlContent,
};
