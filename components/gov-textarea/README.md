# GOV-TEXTAREA Documentation

This macro generates an `<textarea>` and `<label>`.

## Variables

```
name
id
label
hint
value
error
rows
maxlength
```

## Descriptions of variables

| Name          | Description                                                   |
| ------------- |---------------------------------------------------------------|
| name          | sets the name of the input                                    |
| id            | sets the id of the input, and the for of the label            |
| label         | sets the text of the label                                    |
| hint          | sets hint text within the label                               |
| value         | sets the value of the input                                   |
| error         | sets the error message                                        |
| rows          | sets the rows of the textarea                                 |
| maxlength     | sets the max length of the textarea                           |

With hint, error and maxlength if the values are empty, then they are not displayed in the render.

Rows will default to 8.

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
{% from 'gov-textarea/macro.njk' import govTextArea %}

{{ govTextArea('example-name', 'example-id', 'Example label') }}
```

## Links

- [nunjucks](https://mozilla.github.io/nunjucks/)
- [nunjucks with node](https://mozilla.github.io/nunjucks/getting-started.html)
- [GOVUK elements](https://github.com/alphagov/govuk_elements)
- [GOV.UK frontend toolkit](https://github.com/alphagov/govuk_frontend_toolkit)