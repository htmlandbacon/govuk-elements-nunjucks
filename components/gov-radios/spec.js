'use strict';

const nunjucks = require('nunjucks');
const cheerio = require('cheerio');
const expect = require('chai').expect;

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
    expect(inputs).to.be.length(2);
    expect(inputs.get(0).attribs.id).to.equal(`input-${name}-yes`);
    expect(inputs.get(1).attribs.id).to.equal(`input-${name}-no`);
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
    expect(inputs).to.be.length(2);
    expect(inputs.get(0).attribs.id).to.equal(`${id}-yes`);
    expect(inputs.get(1).attribs.id).to.equal(`${id}-no`);
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
    expect(hintText).to.equal(hint);

    const inputs = $('input');
    expect(inputs).to.be.length(2);
    expect(inputs.get(0).attribs.id).to.equal(`my-id-yes`);
    expect(inputs.get(1).attribs.id).to.equal(`my-id-no`);
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
    expect(inputs).to.be.length(2);
    const firstRadio = inputs.get(0).attribs;
    const secondRadio = inputs.get(1).attribs;
    expect(firstRadio.id).to.equal(`my-id-yes`);
    expect(firstRadio.checked).to.equal(undefined);
    expect(secondRadio.id).to.equal(`my-id-no`);
    expect(secondRadio.checked).to.equal('');
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
    expect(inputs).to.be.length(2);
    expect(inputs.get(0).attribs.id).to.equal(`my-id-yes`);
    expect(inputs.get(1).attribs.id).to.equal(`my-id-no`);

    const formGroupClasses = $('.form-group').attr('class');
    const errorMsg = $('legend span.error-message').text();

    expect(formGroupClasses).to.equal('form-group error');
    expect(errorMsg).to.equal(error);
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
      expect(firstLabel.text()).to.contain('label-id');
      expect(firstLabel.get(0).attribs['data-target']).to.equal('data-target');

      const firstRadio = $('input').get(0).attribs;
      expect(firstRadio.id).to.equal('my-id-id');
      expect(firstRadio.name).to.equal('selection');
      expect(firstRadio.value).to.equal('value-id');
      expect(firstRadio['data-journey-click']).to.equal('data-target-click');
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

      expect(labelClasses).to.equal('form-label test-legend-class');
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

      expect(labelClasses).to.equal('inline');
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

      expect(labelClasses).to.equal(undefined);
    });
  });
});

