# GOV-ERROR-SUMMARY Documentation

This macro generates an h1, p (optional) and a list of error links

## Variables

```
heading
summary
errors
```

## Descriptions of variables

| Name          | Description                                                   |
| ------------- |---------------------------------------------------------------|
| heading       | sets the h1                                                   |
| summary       | sets an optional p                                            |
| errors        | object of key value pairs for links                           |

If no errors are supplied then the macro response will be empty.

## errors

You have to pass these as an object of key value pairs

```javascript
{
one: 'two',
three: 'four'
}
```

The above will generate two links the first link as an example will have a href of #one-form and text of two.

## Using with express

You will need to expose the views to the nunjucks config, an example is below.

```javascript

const appViews = [path.join(__dirname, '/app/views/'),
                  path.join(__dirname, '/node_modules/govuk-elements-nunjucks/components/'),
                  path.join(__dirname, '/lib/')]

const nunjucksAppEnv = nunjucks.configure(appViews, {
  autoescape: true,
  express: app,
  noCache: true,
  watch: true
})
```

## Example in use
Include the nunjucks macro and render it like so:

```
{% from 'gov-error-summary/macro.njk' import govErrorSummary %}

{{ govErrorSummary('Heading', '', {test: 'test 1'}) }}
```

## Links

- [nunjucks](https://mozilla.github.io/nunjucks/)
- [nunjucks with node](https://mozilla.github.io/nunjucks/getting-started.html)
- [GOVUK elements](https://github.com/alphagov/govuk_elements)
- [GOV.UK frontend toolkit](https://github.com/alphagov/govuk_frontend_toolkit)