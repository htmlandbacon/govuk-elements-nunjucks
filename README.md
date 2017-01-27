# govuk-elements-nunjucks

GOVUK elements, nunjucks style

This is a mirror of [govuk-elelemt-marko](https://github.com/gunjam/govuk-elements-marko) in nunjucks.

## Tests

Tests can be ran by running 'npm run test' this will run [xo linter](https://github.com/sindresorhus/xo) and the specs against each component.

## Information

Components with defined schemas.

Work in progress.

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
