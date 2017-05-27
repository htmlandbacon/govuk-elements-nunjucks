'use strict';

const nunjucks = require('nunjucks');
const cheerio = require('cheerio');

const options = [{value: 'one', display: 'One'}, {value: 'two', display: 'Two'}, {value: 'three', display: 'Three'}];

describe('gov-select', () => {
  it('should set the ID as select-{name} if ID attr not supplied and generate a select', () => {
    const name = 'selection';
    const output = nunjucks.render('./components/gov-select/template.njk', {
      label: 'select an option',
      options,
      name
    });
    const $ = cheerio.load(output);
    const selectID = $('select').attr('id');
    expect(selectID).toBe(`select-${name}`);
  });

  it('should use ID attribute value over generated select-{name} ID and generate select with three options', () => {
    const id = 'my-id';
    const output = nunjucks.render('./components/gov-select/template.njk', {
      label: 'select an option',
      options,
      name: 'selection',
      id
    });
    const $ = cheerio.load(output);
    const selectID = $('select').attr('id');
    expect(selectID).toBe(`my-id`);

    const selectOptions = $('option');
    expect(selectOptions).toHaveLength(3);
    expect(selectOptions.get(0).attribs.value).toBe(`one`);
    expect(selectOptions.get(1).attribs.value).toBe(`two`);
  });

  it('should add a form hint using the hint attribute', () => {
    const hint = 'Select one of the below';
    const output = nunjucks.render('./components/gov-select/template.njk', {
      label: 'select an option',
      options,
      name: 'selection',
      id: 'my-id',
      hint
    });
    const $ = cheerio.load(output);
    const hintText = $('label span.form-hint').text();
    expect(hintText).toBe(hint);

    const selectOptions = $('option');
    expect(selectOptions).toHaveLength(3);
    expect(selectOptions.get(0).attribs.value).toBe(`one`);
    expect(selectOptions.get(1).attribs.value).toBe(`two`);
  });

  it('should set the option to selected if the value matches', () => {
    const value = 'two';
    const output = nunjucks.render('./components/gov-select/template.njk', {
      label: 'select an option',
      options,
      name: 'selection',
      id: 'my-id',
      value
    });
    const $ = cheerio.load(output);
    const selectOption = $('option');
    expect(selectOption).toHaveLength(3);
    const firstOption = selectOption.get(0).attribs;
    const secondOption = selectOption.get(1).attribs;
    expect(firstOption.value).toBe(`one`);
    expect(firstOption.selected).toBe(undefined);
    expect(secondOption.value).toBe(`two`);
    expect(secondOption.selected).toBe('');
  });

  it('should add error message and classes when passed an error object', () => {
    const error = 'Select an option';
    const output = nunjucks.render('./components/gov-select/template.njk', {
      label: 'select an option',
      options,
      name: 'selection',
      id: 'my-id',
      error
    });
    const $ = cheerio.load(output);

    const formGroupClasses = $('.form-group').attr('class');
    const errorMsg = $('label span.error-message').text();

    expect(formGroupClasses).toBe('form-group error');
    expect(errorMsg).toBe(error);
  });
  describe('select options', () => {
    it('should add mutiple options based on options and placeholder', () => {
      const value = 'three';
      const placeholder = 'placeholder';
      const output = nunjucks.render('./components/gov-select/template.njk', {
        label: 'select an option',
        options,
        placeholder,
        name: 'selection',
        id: 'my-id',
        value
      });
      const $ = cheerio.load(output);
      const selectOption = $('option');
      expect(selectOption).toHaveLength(4);
      const firstOption = selectOption.get(0).attribs;
      const secondOption = selectOption.get(1).attribs;
      const thirdOption = selectOption.get(2).attribs;
      const forthOption = selectOption.get(3).attribs;
      expect(firstOption.value).toBe(``);
      expect(firstOption.selected).toBe(undefined);
      expect(secondOption.value).toBe(`one`);
      expect(secondOption.selected).toBe(undefined);
      expect(thirdOption.value).toBe(`two`);
      expect(thirdOption.selected).toBe(undefined);
      expect(forthOption.value).toBe(`three`);
      expect(forthOption.selected).toBe('');
    });
  });
  describe('class options', () => {
    it('should add classes to label span', () => {
      const classes = {label: 'test-label-class'};
      const output = nunjucks.render('./components/gov-select/template.njk', {
        label: 'select an option',
        options,
        name: 'selection',
        id: 'my-id',
        classes
      });
      const $ = cheerio.load(output);
      const labelClasses = $('.form-group label span').attr('class');

      expect(labelClasses).toBe('test-label-class');
    });
    it('should add classes to form-group div', () => {
      const classes = {fromGroup: 'test-group-class'};
      const output = nunjucks.render('./components/gov-select/template.njk', {
        label: 'select an option',
        options,
        name: 'selection',
        id: 'my-id',
        classes
      });
      const $ = cheerio.load(output);
      const formGroupClasses = $('.form-group').attr('class');
      expect(formGroupClasses).toBe('form-group test-group-class');
    });
    it('should add classes to select span', () => {
      const classes = {selectClass: 'test-select-class'};
      const output = nunjucks.render('./components/gov-select/template.njk', {
        label: 'select an option',
        options,
        name: 'selection',
        id: 'my-id',
        classes
      });
      const $ = cheerio.load(output);
      const selectClasses = $('.form-control').attr('class');
      expect(selectClasses).toBe('form-control test-select-class');
    });
  });
});
