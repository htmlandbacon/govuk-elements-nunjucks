'use strict';

const nunjucks = require('nunjucks');
const cheerio = require('cheerio');

describe('gov-textarea', () => {
  it('should set the ID as textarea-{name} if ID attr not supplied', () => {
    const name = 'more-details';
    const output = nunjucks.render('./components/gov-textarea/template.njk', {
      label: 'More details',
      name
    });
    const $ = cheerio.load(output);
    const textareaId = $('textarea').attr('id');

    expect(textareaId).toBe(`textarea-${name}`);
  });

  it('should use ID attribute value over generated textarea-{name} ID', () => {
    const id = 'my-id';
    const output = nunjucks.render('./components/gov-textarea/template.njk', {
      label: 'More details',
      name: 'more-details',
      id
    });
    const $ = cheerio.load(output);
    const textareaId = $('textarea').attr('id');

    expect(textareaId).toBe(id);
  });

  it('should add a form hint using the hint attribute', () => {
    const hint = 'Do not include bank details';
    const output = nunjucks.render('./components/gov-textarea/template.njk', {
      label: 'More details',
      name: 'more-details',
      hint
    });
    const $ = cheerio.load(output);
    const formHintText = $('label .form-label-bold + span.form-hint').html();

    expect(formHintText).toBe(hint);
  });

  it('should add maxlength to textarea using the maxlength attribute', () => {
    const maxlength = '1200';
    const output = nunjucks.render('./components/gov-textarea/template.njk', {
      label: 'More details',
      name: 'more-details',
      maxlength
    });
    const $ = cheerio.load(output);
    const textareaMaxlength = $('textarea').attr('maxlength');

    expect(textareaMaxlength).toBe(maxlength);
  });

  it('should add rows attribute to textarea using the rows attribute', () => {
    const rows = '12';
    const output = nunjucks.render('./components/gov-textarea/template.njk', {
      label: 'More details',
      name: 'more-details',
      rows
    });
    const $ = cheerio.load(output);
    const textareaRows = $('textarea').attr('rows');

    expect(textareaRows).toBe(rows);
  });

  it('should set the value of the textarea using the value attribute', () => {
    const value = 'I really loved this service, it was great';
    const output = nunjucks.render('./components/gov-textarea/template.njk', {
      label: 'More details',
      name: 'more-details',
      value
    });
    const $ = cheerio.load(output);
    const textareaText = $('textarea').text();

    expect(textareaText).toBe(value);
  });

  it('should add error message and classes when passed an error object', () => {
    const error = 'Put something in the box';
    const name = 'more-details';
    const output = nunjucks.render('./components/gov-textarea/template.njk', {
      label: 'More details',
      name,
      error
    });
    const $ = cheerio.load(output);
    const formGroupClasses = $('.form-group').attr('class');
    const errorMsg = $('label .form-label-bold + span.error-message').text();

    expect(formGroupClasses).toBe('form-group error');
    expect(errorMsg).toBe(error);
  });
  describe('class options', () => {
    it('should add classes to textarea/label when supplied', () => {
      const classes = {label: 'test-label-class', input: 'test-input-class'};
      const output = nunjucks.render('./components/gov-textarea/template.njk', {
        label: 'Full name',
        classes
      });
      const $ = cheerio.load(output);
      const labelClasses = $('.form-group label span').attr('class');
      const inputClasses = $('.form-group textarea').attr('class');

      expect(labelClasses).toBe('test-label-class');
      expect(inputClasses).toBe('form-control test-input-class');
    });
    it('should default to class form-label-bold when label class is not supplied', () => {
      const classes = {input: 'test-input-class'};
      const output = nunjucks.render('./components/gov-textarea/template.njk', {
        label: 'Full name',
        classes
      });
      const $ = cheerio.load(output);
      const labelClasses = $('.form-group label span').attr('class');
      const inputClasses = $('.form-group textarea').attr('class');

      expect(labelClasses).toBe('form-label-bold');
      expect(inputClasses).toBe('form-control test-input-class');
    });
  });
});
