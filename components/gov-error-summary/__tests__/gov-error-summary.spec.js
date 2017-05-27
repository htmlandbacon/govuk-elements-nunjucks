'use strict';

const nunjucks = require('nunjucks');
const cheerio = require('cheerio');

const errors = {'link-1': 'This is an error 1', 'link-2': 'This is an error 2'};

describe('gov-error-summary', () => {
  it('should render h1, p and correct links when data is supplied', () => {
    const output = nunjucks.render('./components/gov-error-summary/template.njk', {
      heading: 'Error Heading',
      summary: 'Details of error',
      errors
    });
    const $ = cheerio.load(output);
    const h1 = $('h1');
    const p = $('p');
    const links = $('a');
    expect(h1.text()).toBe(`Error Heading`);
    expect(p).toHaveLength(1);
    expect(p.text()).toBe(`Details of error`);
    expect(links).toHaveLength(2);
    expect(links.get(0).attribs.href).toBe(`#link-1-form`);
    expect(links.get(0).children[0].data).toBe(`This is an error 1`);
    expect(links.get(1).attribs.href).toBe(`#link-2-form`);
    expect(links.get(1).children[0].data).toBe(`This is an error 2`);
    expect(output).toMatchSnapshot();
  });
  it('should render without summary <p> if no summary is supplied', () => {
    const output = nunjucks.render('./components/gov-error-summary/template.njk', {
      heading: 'Error Heading',
      errors
    });
    const $ = cheerio.load(output);
    const h1 = $('h1');
    const p = $('p');
    const links = $('a');
    expect(h1.text()).toBe(`Error Heading`);
    expect(p).toHaveLength(0);
    expect(h1.text()).toBe(`Error Heading`);
    expect(p).toHaveLength(0);
    expect(links).toHaveLength(2);
    expect(links.get(0).attribs.href).toBe(`#link-1-form`);
    expect(links.get(0).children[0].data).toBe(`This is an error 1`);
    expect(links.get(1).attribs.href).toBe(`#link-2-form`);
    expect(links.get(1).children[0].data).toBe(`This is an error 2`);
    expect(output).toMatchSnapshot();
  });
  it('should render nothing when no errors are supplied', () => {
    const output = nunjucks.render('./components/gov-error-summary/template.njk', {
      heading: 'Error Heading'
    });
    expect(output).toBe(``);
    expect(output).toMatchSnapshot();
  });
});
