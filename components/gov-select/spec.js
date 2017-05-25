'use strict';

const nunjucks = require('nunjucks');
const cheerio = require('cheerio');
const expect = require('chai').expect;

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
    expect(selectID).to.equal(`select-${name}`);
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
    expect(selectID).to.equal(`my-id`);

    const selectOptions = $('option');
    expect(selectOptions).to.be.length(3);
    expect(selectOptions.get(0).attribs.value).to.equal(`one`);
    expect(selectOptions.get(1).attribs.value).to.equal(`two`);
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
    expect(hintText).to.equal(hint);

    const selectOptions = $('option');
    expect(selectOptions).to.be.length(3);
    expect(selectOptions.get(0).attribs.value).to.equal(`one`);
    expect(selectOptions.get(1).attribs.value).to.equal(`two`);
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
    expect(selectOption).to.be.length(3);
    const firstOption = selectOption.get(0).attribs;
    const secondOption = selectOption.get(1).attribs;
    expect(firstOption.value).to.equal(`one`);
    expect(firstOption.selected).to.equal(undefined);
    expect(secondOption.value).to.equal(`two`);
    expect(secondOption.selected).to.equal('');
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

    expect(formGroupClasses).to.equal('form-group error');
    expect(errorMsg).to.equal(error);
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
      expect(selectOption).to.be.length(4);
      const firstOption = selectOption.get(0).attribs;
      const secondOption = selectOption.get(1).attribs;
      const thirdOption = selectOption.get(2).attribs;
      const forthOption = selectOption.get(3).attribs;
      expect(firstOption.value).to.equal(``);
      expect(firstOption.selected).to.equal(undefined);
      expect(secondOption.value).to.equal(`one`);
      expect(secondOption.selected).to.equal(undefined);
      expect(thirdOption.value).to.equal(`two`);
      expect(thirdOption.selected).to.equal(undefined);
      expect(forthOption.value).to.equal(`three`);
      expect(forthOption.selected).to.equal('');
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

      expect(labelClasses).to.equal('test-label-class');
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
      expect(formGroupClasses).to.equal('form-group test-group-class');
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
      expect(selectClasses).to.equal('form-control test-select-class');
    });
  });
});
