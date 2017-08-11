# govuk-elements-nunjucks

GOVUK elements, nunjucks style.

This includes a selection form macros from [GOV.UK elements](http://govuk-elements.herokuapp.com/), these are using [nunjucks](https://mozilla.github.io/nunjucks/) and provide a component that can be configured, this encapsulates - text, data, error state, classes and values.

This is a mirror of [govuk-elelemt-marko](https://github.com/gunjam/govuk-elements-marko) in nunjucks.

This currently is to work with old style radio buttons and checkboxes. (GOV.UK elements v2.1.2 or  GOV.UK Frontend Toolkit pre 4.17.0)

## Tests

Tests can be ran by running 'npm run test' this will run [xo linter](https://github.com/sindresorhus/xo) and the specs against each component.

## Information

Components with defined schemas.

Current components:

- gov-checkboxes
- gov-date-input
- gov-error-summary
- gov-input
- gov-radio
- gov-select
- gov-textarea

Things to add/improve

- common approach to data-attributes
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

## Documentation

- [gov-checkboxes](./components/gov-checkboxes/README.md)
- [gov-date-input](./components/gov-date-input/README.md)
- [gov-error-summary](./components/gov-error-summary/README.md)
- [gov-input](./components/gov-input/README.md)
- [gov-radios](./components/gov-radios/README.md)
- [gov-select](./components/gov-select/README.md)
- [gov-textarea](./components/gov-textarea/README.md)


## Contributing

Notice something wrong? Or a feature that is missing?

Feel free to open an [issue](https://github.com/htmlandbacon/govuk-elements-nunjucks), or fork and do a pull request.

## Links

- [nunjucks](https://mozilla.github.io/nunjucks/)
- [Jest](https://facebook.github.io/jest/)
- [GOVUK elements nunjucks](https://github.com/htmlandbacon/govuk-elements-nunjucks)
- [GOVUK elements](https://github.com/alphagov/govuk_elements)
- [GOV.UK frontend toolkit](https://github.com/alphagov/govuk_frontend_toolkit)