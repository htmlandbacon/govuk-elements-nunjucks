'use strict';

const nunjucks = require('nunjucks');
const cheerio = require('cheerio');
const {expect, assert} = require('chai');

describe('gov-textarea', () => {
  it.skip('should render the correct markup', () => {
    let output = nunjucks.render('./components/gov-textarea/template.njk', {
      label: 'More details',
      name: 'more-details'
    });
    output.
    expect(output).to.equal(
      '<div class="form-group">' +
        '<label for="textarea-more-details">' +
          '<span class="form-label">More details</span>' +
        '</label>' +
        '<textarea class="form-control" id="textarea-more-details" ' +
          'rows="8" name="more-details"></textarea>' +
      '</div>'
    );
  });

  it('should set the ID as textarea-{name} if ID attr not supplied', () => {
    const name = 'more-details';
    const output = nunjucks.render('./components/gov-textarea/template.njk', {
      label: 'More details',
      name
    });
    const $ = cheerio.load(output);
    const textareaId = $('textarea').attr('id');

    expect(textareaId).to.equal(`textarea-${name}`);
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

    expect(textareaId).to.equal(id);
  });

  it('should add a form hint using the hint attribute', () => {
    const hint = 'Do not include bank details';
    const output = nunjucks.render('./components/gov-textarea/template.njk', {
      label: 'More details',
      name: 'more-details',
      hint
    });
    const $ = cheerio.load(output);
    const formHintText = $('label .form-label + span.form-hint').html();

    expect(formHintText).to.equal(hint);
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

    expect(textareaMaxlength).to.equal(maxlength);
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

    expect(textareaRows).to.equal(rows);
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

    expect(textareaText).to.equal(value);
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
    const errorMsg = $('label .form-label + span.error-message').text();

    expect(formGroupClasses).to.equal('form-group error');
    expect(errorMsg).to.equal(error);
  });
});
