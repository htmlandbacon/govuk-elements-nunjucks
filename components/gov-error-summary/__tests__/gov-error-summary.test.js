'use strict';

const nunjucks = require('nunjucks');

const errors = {'link-1': 'This is an error 1', 'link-2': 'This is an error 2'};

describe('gov-error-summary render', () => {
  it('should render h1, p and correct links when data is supplied', () => {
    const output = nunjucks.render('./components/gov-error-summary/template.njk', {
      heading: 'Error Heading',
      summary: 'Details of error',
      errors
    });
    expect(output).toMatchSnapshot();
  });
  it('should render without summary <p> if no summary is supplied', () => {
    const output = nunjucks.render('./components/gov-error-summary/template.njk', {
      heading: 'Error Heading',
      errors
    });
    expect(output).toMatchSnapshot();
  });
  it('should render nothing when no errors are supplied', () => {
    const output = nunjucks.render('./components/gov-error-summary/template.njk', {
      heading: 'Error Heading'
    });
    expect(output).toMatchSnapshot();
  });
});
