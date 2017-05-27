'use strict';

const nunjucks = require('nunjucks');
const cheerio = require('cheerio');

const yesNoRadios = [{id: 'yes', label: 'Yes', value: 'yes'}, {id: 'no', label: 'No', value: 'no'}];
const yesNoMaybeRadios = [{id: 'yes', label: 'Yes', value: 'yes'}, {id: 'no', label: 'No', value: 'no'}, {id: 'maybe', label: 'Maybe', value: 'maybe'}];
describe('gov-radios', () => {
  it('should set the ID as input-{name} if ID attr not supplied and generate radio buttons', () => {
    const name = 'selection';
    const output = nunjucks.render('./components/gov-radios/template.njk', {
      legend: 'Select a radio button',
      radioButtons: yesNoRadios,
      name
    });
    const $ = cheerio.load(output);
    const inputs = $('input');
    expect(inputs).toHaveLength(2);
    expect(inputs.get(0).attribs.id).toBe(`input-${name}-yes`);
    expect(inputs.get(1).attribs.id).toBe(`input-${name}-no`);
    expect(output).toMatchSnapshot();
  });

  it('should use ID attribute value over generated input-{name} ID and generate radio buttons', () => {
    const id = 'my-id';
    const output = nunjucks.render('./components/gov-radios/template.njk', {
      legend: 'Select a radio button',
      radioButtons: yesNoRadios,
      name: 'selection',
      id
    });
    const $ = cheerio.load(output);
    const inputs = $('input');
    expect(inputs).toHaveLength(2);
    expect(inputs.get(0).attribs.id).toBe(`${id}-yes`);
    expect(inputs.get(1).attribs.id).toBe(`${id}-no`);
    expect(output).toMatchSnapshot();
  });

  it('should add a form hint using the hint attribute', () => {
    const hint = 'Select one of the below';
    const output = nunjucks.render('./components/gov-radios/template.njk', {
      legend: 'Select a radio button',
      radioButtons: yesNoRadios,
      name: 'selection',
      id: 'my-id',
      hint
    });
    const $ = cheerio.load(output);
    const hintText = $('legend span.form-hint').text();
    expect(hintText).toBe(hint);

    const inputs = $('input');
    expect(inputs).toHaveLength(2);
    expect(inputs.get(0).attribs.id).toBe(`my-id-yes`);
    expect(inputs.get(1).attribs.id).toBe(`my-id-no`);
    expect(output).toMatchSnapshot();
  });

  it('should set the radio button to checked if the value matches', () => {
    const value = 'no';
    const output = nunjucks.render('./components/gov-radios/template.njk', {
      legend: 'Select a radio button',
      radioButtons: yesNoRadios,
      name: 'selection',
      id: 'my-id',
      value
    });
    const $ = cheerio.load(output);
    const inputs = $('input');
    expect(inputs).toHaveLength(2);
    const firstRadio = inputs.get(0).attribs;
    const secondRadio = inputs.get(1).attribs;
    expect(firstRadio.id).toBe(`my-id-yes`);
    expect(firstRadio.checked).toBe(undefined);
    expect(secondRadio.id).toBe(`my-id-no`);
    expect(secondRadio.checked).toBe('');
    expect(output).toMatchSnapshot();
  });

  it('should add error message and classes when passed an error object', () => {
    const error = 'Select an option';
    const output = nunjucks.render('./components/gov-radios/template.njk', {
      legend: 'Select a radio button',
      radioButtons: yesNoRadios,
      name: 'selection',
      id: 'my-id',
      error
    });
    const $ = cheerio.load(output);

    const inputs = $('input');
    expect(inputs).toHaveLength(2);
    expect(inputs.get(0).attribs.id).toBe(`my-id-yes`);
    expect(inputs.get(1).attribs.id).toBe(`my-id-no`);

    const formGroupClasses = $('.form-group').attr('class');
    const errorMsg = $('legend span.error-message').text();

    expect(formGroupClasses).toBe('form-group error');
    expect(errorMsg).toBe(error);
    expect(output).toMatchSnapshot();
  });
  describe('radio button options', () => {
    it('should add data fields when supplied', () => {
      const radioButton = [{id: 'id',
        value: 'value-id',
        label: 'label-id',
        dataTarget: 'data-target',
        dataJourneyClick: 'data-target-click'}];

      const output = nunjucks.render('./components/gov-radios/template.njk', {
        legend: 'Select a radio button',
        radioButtons: radioButton,
        id: 'my-id',
        name: 'selection'
      });

      const $ = cheerio.load(output);
      const firstLabel = $('label');
      const labelCheck = expect.stringContaining('label-id');
      expect(firstLabel.text()).toEqual(labelCheck);
      expect(firstLabel.get(0).attribs['data-target']).toBe('data-target');

      const firstRadio = $('input').get(0).attribs;
      expect(firstRadio.id).toBe('my-id-id');
      expect(firstRadio.name).toBe('selection');
      expect(firstRadio.value).toBe('value-id');
      expect(firstRadio['data-journey-click']).toBe('data-target-click');
      expect(output).toMatchSnapshot();
    });
  });
  describe('class options', () => {
    it('should add classes to legend span', () => {
      const classes = {legend: 'test-legend-class'};
      const output = nunjucks.render('./components/gov-radios/template.njk', {
        legend: 'Select a radio button',
        radioButtons: yesNoRadios,
        name: 'selection',
        id: 'my-id',
        classes
      });
      const $ = cheerio.load(output);
      const labelClasses = $('.form-group legend span').attr('class');

      expect(labelClasses).toBe('form-label test-legend-class');
      expect(output).toMatchSnapshot();
    });
    it('should add inline class to form to fieldset when two radio buttons are supplied', () => {
      const classes = {legend: 'test-legend-class'};
      const output = nunjucks.render('./components/gov-radios/template.njk', {
        legend: 'Select a radio button',
        radioButtons: yesNoRadios,
        name: 'selection',
        id: 'my-id',
        classes
      });
      const $ = cheerio.load(output);
      const labelClasses = $('fieldset').attr('class');

      expect(labelClasses).toBe('inline');
      expect(output).toMatchSnapshot();
    });
    it('should have no classes on fieldset when two or more radio buttons are supplied', () => {
      const classes = {legend: 'test-legend-class'};
      const output = nunjucks.render('./components/gov-radios/template.njk', {
        legend: 'Select a radio button',
        radioButtons: yesNoMaybeRadios,
        name: 'selection',
        id: 'my-id',
        classes
      });
      const $ = cheerio.load(output);
      const labelClasses = $('fieldset').attr('class');

      expect(labelClasses).toBe(undefined);
      expect(output).toMatchSnapshot();
    });
  });
});

