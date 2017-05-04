'use strict';

const nunjucks = require('nunjucks');
const cheerio = require('cheerio');
const expect = require('chai').expect;

const checkBoxesTwo = [{id: 'one', label: 'One', value: 'one'}, {id: 'two', label: 'Two', value: 'two'}];

describe('gov-checkBoxes', () => {
  it('should set the ID as input-{name} if ID attr not supplied and generate checkboxes', () => {
    const name = 'selection';
    const output = nunjucks.render('./components/gov-checkboxes/template.njk', {
      legend: 'Select a checkbox',
      checkBoxes: checkBoxesTwo,
      name
    });
    const $ = cheerio.load(output);
    const inputs = $('input');
    expect(inputs).to.be.length(2);
    expect(inputs.get(0).attribs.id).to.equal(`input-${name}-one`);
    expect(inputs.get(1).attribs.id).to.equal(`input-${name}-two`);
  });

  it('should use ID attribute value over generated input-{name} ID and generate check boxes', () => {
    const id = 'my-id';
    const name = 'selection';
    const output = nunjucks.render('./components/gov-checkboxes/template.njk', {
      legend: 'Select a checkbox',
      checkBoxes: checkBoxesTwo,
      name,
      id
    });
    const $ = cheerio.load(output);
    const inputs = $('input');
    expect(inputs).to.be.length(2);
    expect(inputs.get(0).attribs.id).to.equal(`${id}-one`);
    expect(inputs.get(1).attribs.id).to.equal(`${id}-two`);
  });

  it('should add a form hint using the hint attribute', () => {
    const hint = 'select as many or as few as you like';
    const output = nunjucks.render('./components/gov-checkboxes/template.njk', {
      legend: 'Select a checkbox',
      checkBoxes: checkBoxesTwo,
      name: 'selection',
      id: 'my-id',
      hint
    });
    const $ = cheerio.load(output);
    const hintText = $('legend span.form-hint').text();
    expect(hintText).to.equal(hint);

    const inputs = $('input');
    expect(inputs).to.be.length(2);
    expect(inputs.get(0).attribs.id).to.equal(`my-id-one`);
    expect(inputs.get(1).attribs.id).to.equal(`my-id-two`);
  });

  it('should set the check box to selected if value is set', () => {
    const checkBoxesTwoOneSelected = [{id: 'one', label: 'One', value: 'one'}, {id: 'two', label: 'Two', value: 'two', checked: 'true'}];
    const output = nunjucks.render('./components/gov-checkboxes/template.njk', {
      legend: 'Select a checkbox',
      checkBoxes: checkBoxesTwoOneSelected,
      name: 'selection',
      id: 'my-id'
    });
    const $ = cheerio.load(output);
    const inputs = $('input');
    expect(inputs).to.be.length(2);
    const firstCheckBox = inputs.get(0).attribs;
    const secondCheckBox = inputs.get(1).attribs;
    expect(firstCheckBox.id).to.equal(`my-id-one`);
    expect(firstCheckBox.checked).to.equal(undefined);
    expect(secondCheckBox.id).to.equal(`my-id-two`);
    expect(secondCheckBox.checked).to.equal('');
  });

  it('should add error message and classes when passed an error object', () => {
    const error = 'Select an checkbox';
    const output = nunjucks.render('./components/gov-checkboxes/template.njk', {
      legend: 'Select a checkbox',
      checkBoxes: checkBoxesTwo,
      name: 'selection',
      id: 'my-id',
      error
    });
    const $ = cheerio.load(output);

    const inputs = $('input');
    expect(inputs).to.be.length(2);
    expect(inputs.get(0).attribs.id).to.equal(`my-id-one`);
    expect(inputs.get(1).attribs.id).to.equal(`my-id-two`);

    const formGroupClasses = $('.form-group').attr('class');
    const errorMsg = $('legend span.error-message').text();

    expect(formGroupClasses).to.equal('form-group error');
    expect(errorMsg).to.equal(error);
  });
  describe('checkbox options', () => {
    it('should add data fields when supplied', () => {
      const checkBoxWithData = [{id: 'one', label: 'One', value: 'one', dataTarget: 'data-target', dataJourneyClick: 'data-target-click'}];

      const output = nunjucks.render('./components/gov-checkboxes/template.njk', {
        legend: 'Select a check box',
        checkBoxes: checkBoxWithData,
        id: 'my-id',
        name: 'selection'
      });

      const $ = cheerio.load(output);
      const firstLabel = $('label');
      expect(firstLabel.text()).to.contain('One');
      expect(firstLabel.get(0).attribs['data-target']).to.equal('data-target');

      const firstRadio = $('input').get(0).attribs;
      expect(firstRadio.id).to.equal('my-id-one');
      expect(firstRadio.name).to.equal('selection');
      expect(firstRadio.value).to.equal('one');
      expect(firstRadio['data-journey-click']).to.equal('data-target-click');
    });
  });
  describe('class options', () => {
    it('should add classes to legend span', () => {
      const classes = {legend: 'test-legend-class'};
      const output = nunjucks.render('./components/gov-checkboxes/template.njk', {
        legend: 'Select a check box',
        checkBoxes: checkBoxesTwo,
        name: 'selection',
        id: 'my-id',
        classes
      });
      const $ = cheerio.load(output);
      const labelClasses = $('.form-group legend span').attr('class');

      expect(labelClasses).to.equal('form-label test-legend-class');
    });
  });
});

