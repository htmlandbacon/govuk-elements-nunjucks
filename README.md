# govuk-elements-nunjucks

GOVUK elements, nunjucks style

This is a mirror of [govuk-elelemt-marko](https://github.com/gunjam/govuk-elements-marko) in nunjucks.

This currently is to work with old style radio buttons and checkboxes. (GOV.UK elements v2.1.2 or  GOV.UK Frontend Toolkit pre 4.17.0)

## Tests

Tests can be ran by running 'npm run test' this will run [xo linter](https://github.com/sindresorhus/xo) and the specs against each component.

## Information

Components with defined schemas.

Current components:

- gov-checkboxes
- gov-date-input
- gov-input
- gov-radio
- gov-textarea

Things to add/improve

- gov-select
- gov-error-summary

- clean up testing
- common approach to data-attributes
- documentation
- update radios to be new style

## Examples

gov-input has the following inputs

```
name
id
label
hint
value
error
maxlength
```

This will need to be exposed in the nunjuck render and can be called like this:

```
{% from 'gov-input/macro.njk' import govInput %}

{{ govInput(name='input', label='This is a label') }}
```


## Links

- [nunjucks](https://mozilla.github.io/nunjucks/)
- [nunjucks-helpers](https://github.com/htmlandbacon/nunjucks-helpers)
- [GOVUK elements](https://github.com/alphagov/govuk_elements)
- [GOV.UK frontend toolkit](https://github.com/alphagov/govuk_frontend_toolkit)