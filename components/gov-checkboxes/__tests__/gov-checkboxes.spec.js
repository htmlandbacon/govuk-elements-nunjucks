'use strict';

const nunjucks = require('nunjucks');
const cheerio = require('cheerio');

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
    expect(inputs).toHaveLength(2);
    expect(inputs.get(0).attribs.id).toBe(`input-${name}-one`);
    expect(inputs.get(1).attribs.id).toBe(`input-${name}-two`);
    expect(output).toMatchSnapshot();
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
    expect(inputs).toHaveLength(2);
    expect(inputs.get(0).attribs.id).toBe(`${id}-one`);
    expect(inputs.get(1).attribs.id).toBe(`${id}-two`);
    expect(output).toMatchSnapshot();
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
    expect(hintText).toBe(hint);

    const inputs = $('input');
    expect(inputs).toHaveLength(2);
    expect(inputs.get(0).attribs.id).toBe(`my-id-one`);
    expect(inputs.get(1).attribs.id).toBe(`my-id-two`);
    expect(output).toMatchSnapshot();
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
    expect(inputs).toHaveLength(2);
    const firstCheckBox = inputs.get(0).attribs;
    const secondCheckBox = inputs.get(1).attribs;
    expect(firstCheckBox.id).toBe(`my-id-one`);
    expect(firstCheckBox.checked).toBe(undefined);
    expect(secondCheckBox.id).toBe(`my-id-two`);
    expect(secondCheckBox.checked).toBe('');
    expect(output).toMatchSnapshot();
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
    expect(inputs).toHaveLength(2);
    expect(inputs.get(0).attribs.id).toBe(`my-id-one`);
    expect(inputs.get(1).attribs.id).toBe(`my-id-two`);

    const formGroupClasses = $('.form-group').attr('class');
    const errorMsg = $('legend span.error-message').text();

    expect(formGroupClasses).toBe('form-group form-group-error');
    expect(errorMsg).toBe(error);
    expect(output).toMatchSnapshot();
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

      const firstDivContainer = $('div.multiple-choice');
      expect(firstDivContainer.get(0).attribs['data-target']).toBe('data-target');
      expect(firstDivContainer.get(0).attribs['data-journey-click']).toBe('data-target-click');

      const firstLabel = $('label');
      const oneCheck = expect.stringContaining('One');
      expect(firstLabel.text()).toEqual(oneCheck);
      const firstRadio = $('input').get(0).attribs;
      expect(firstRadio.id).toBe('my-id-one');
      expect(firstRadio.name).toBe('selection');
      expect(firstRadio.value).toBe('one');
      expect(output).toMatchSnapshot();
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

      expect(labelClasses).toBe('form-label test-legend-class');
      expect(output).toMatchSnapshot();
    });
  });
});

