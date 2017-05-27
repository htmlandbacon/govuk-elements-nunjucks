'use strict';

const nunjucks = require('nunjucks');
const cheerio = require('cheerio');

describe('gov-date-input', () => {
  it('should use ID attribute value over generated IDs', () => {
    const data = {
      legend: 'Date of birth',
      hint: 'For example, 31 3 1980',
      name: 'birth',
      id: 'egg'
    };

    const output = nunjucks.render('./components/gov-date-input/template.njk', data);

    const $ = cheerio.load(output);
    const dayInputId = $('input#egg-day');
    const monthInputId = $('input#egg-month');
    const yearInputId = $('input#egg-year');
    const dayLabelFor = $('label[for="egg-day"]');
    const monthLabelFor = $('label[for="egg-month"]');
    const yearLabelFor = $('label[for="egg-year"]');
    expect(dayInputId, 'Day ID not found');
    expect(monthInputId, 'Month ID not found');
    expect(yearInputId, 'Year ID not found');
    expect(dayLabelFor, 'Matching label for Day not found');
    expect(monthLabelFor, 'Matching label for Month not found');
    expect(yearLabelFor, 'Matching label for Year not found');
    expect(output).toMatchSnapshot();
  });
  it('should use the maxYear attr to set the max attr on year input', () => {
    const data = {
      legend: 'Date of birth',
      hint: 'For example, 31 3 1980',
      name: 'birth',
      maxYear: '2020'
    };

    const output = nunjucks.render('./components/gov-date-input/template.njk', data);
    const $ = cheerio.load(output);
    const max = $('#input-birth-year').attr('max');

    expect(max).toBe(data.maxYear);
    expect(output).toMatchSnapshot();
  });

  it('should set the values of the inputs using the value attribute', () => {
    const data = {
      name: 'birth',
      legend: 'Date of birth',
      hint: 'For example, 31 3 1980',
      value: {day: '12', month: '12', year: '2015'}
    };

    const output = nunjucks.render('./components/gov-date-input/template.njk', data);
    const $ = cheerio.load(output);
    const dayValue = $('#input-birth-day').attr('value');
    const monthValue = $('#input-birth-month').attr('value');
    const yearValue = $('#input-birth-year').attr('value');

    expect(dayValue).toBe(data.value.day);
    expect(monthValue).toBe(data.value.month);
    expect(yearValue).toBe(data.value.year);
    expect(output).toMatchSnapshot();
  });

  it('should add a form hint using the hint attribute', () => {
    const data = {
      legend: 'Date of birth',
      hint: 'For example, 31 3 1980',
      name: 'birth'
    };

    const output = nunjucks.render('./components/gov-date-input/template.njk', data);
    const $ = cheerio.load(output);

    const formHintText = $('legend span.form-hint').html();

    expect(formHintText).toBe(data.hint);
    expect(output).toMatchSnapshot();
  });

  it('should use the maxYear attr to set the max attr on year input', () => {
    const data = {
      legend: 'Date of birth',
      hint: 'For example, 31 3 1980',
      name: 'birth',
      maxYear: '2020'
    };

    const output = nunjucks.render('./components/gov-date-input/template.njk', data);
    const $ = cheerio.load(output);
    const max = $('#input-birth-year').attr('max');

    expect(max).toBe(data.maxYear);
    expect(output).toMatchSnapshot();
  });
});
