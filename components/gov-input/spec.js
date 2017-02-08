'use strict';

const nunjucks = require('nunjucks');
const cheerio = require('cheerio');
const expect = require('chai').expect;

describe('gov-input', () => {
  it('should set the ID as input-{name} if ID attr not supplied', () => {
    const name = 'full-name';
    const output = nunjucks.render('./components/gov-input/template.njk', {
      label: 'Full name',
      name
    });
    const $ = cheerio.load(output);
    const inputId = $('input').attr('id');

    expect(inputId).to.equal(`input-${name}`);
  });

  it('should use ID attribute value over generated input-{name} ID', () => {
    const id = 'my-id';
    const output = nunjucks.render('./components/gov-input/template.njk', {
      label: 'Full name',
      name: 'full-name',
      id
    });
    const $ = cheerio.load(output);
    const inputId = $('input').attr('id');

    expect(inputId).to.equal(id);
  });

  it('should add a form hint using the hint attribute', () => {
    const hint = 'All your names';
    const output = nunjucks.render('./components/gov-input/template.njk', {
      label: 'Full name',
      name: 'full-name',
      hint
    });
    const $ = cheerio.load(output);
    const formHintText = $('label span.form-hint').html();

    expect(formHintText).to.equal(hint);
  });

  it('should add maxlength to input using the maxlength attribute', () => {
    const maxlength = '20';
    const output = nunjucks.render('./components/gov-input/template.njk', {
      label: 'Full name',
      name: 'full-name',
      maxlength
    });
    const $ = cheerio.load(output);
    const inputMaxlength = $('input').attr('maxlength');

    expect(inputMaxlength).to.equal(maxlength);
  });

  it('should set the value of the input using the value attribute', () => {
    const value = 'Testy McTesterson';
    const output = nunjucks.render('./components/gov-input/template.njk', {
      label: 'Full name',
      name: 'full-name',
      value
    });
    const $ = cheerio.load(output);
    const inputValue = $('input').attr('value');

    expect(inputValue).to.equal(value);
  });

  it('should add error message and classes when passed an error object', () => {
    const error = 'Name is wrong';
    const name = 'full-name';
    const output = nunjucks.render('./components/gov-input/template.njk', {
      label: 'Full name',
      name,
      error
    });
    const $ = cheerio.load(output);
    const formGroupClasses = $('.form-group').attr('class');
    const errorMsg = $('label span.error-message').text();

    expect(formGroupClasses).to.equal('form-group error');
    expect(errorMsg).to.equal(error);
  });
  describe('class options', () => {
    it('should add classes to input/label when supplied', () => {
      const classes = {label: 'test-label-class', input: 'test-input-class'};
      const output = nunjucks.render('./components/gov-input/template.njk', {
        label: 'Full name',
        classes
      });
      const $ = cheerio.load(output);
      const labelClasses = $('.form-group label span').attr('class');
      const inputClasses = $('.form-group input').attr('class');

      expect(labelClasses).to.equal('test-label-class');
      expect(inputClasses).to.equal('form-control test-input-class');
    });
    it('should default to class form-label-bold when label class is not supplied', () => {
      const classes = {input: 'test-input-class'};
      const output = nunjucks.render('./components/gov-input/template.njk', {
        label: 'Full name',
        classes
      });
      const $ = cheerio.load(output);
      const labelClasses = $('.form-group label span').attr('class');
      const inputClasses = $('.form-group input').attr('class');

      expect(labelClasses).to.equal('form-label-bold');
      expect(inputClasses).to.equal('form-control test-input-class');
    });
  });
});

