# GOV-DATE-INPUT Documentation

This macro generates an a day month and year `<input>` with `<label>`, and a `<legend>`.

## Variables

```
name
id
legend
hint
value
maxYear
error

```

## Descriptions of variables

Both name and id are used as a pre-fix for generating each input name and id.

Providing the name as 'dob' will generate inputs with labels in the following format:

```
dob-day
dob-month
dob-year
```


| Name          | Description                                                   |
| ------------- |---------------------------------------------------------------|
| name          | sets the base of name of the input                            |
| id            | sets the id of the input, and the for of the label            |
| legend        | sets the legend of the overall fiel                           |
| hint          | sets hint text within the legend                              |
| value         | object of {day, month, year}                                  |
| maxYear       | sets the max year, min is defaulted to 0                      |
| error         | sets the error message  in the legend                         |

With hint, error and maxlength if the values are empty, then they are not displayed in the render.

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
{% from 'gov-date-input/macro.njk' import govDate %}

{{ govDate('dob', 'dob', 'Date of birth', '', {day: 01, month: 02, year: 2010}) }}
```

## Links

- [nunjucks](https://mozilla.github.io/nunjucks/)
- [nunjucks with node](https://mozilla.github.io/nunjucks/getting-started.html)
- [GOVUK elements](https://github.com/alphagov/govuk_elements)
- [GOV.UK frontend toolkit](https://github.com/alphagov/govuk_frontend_toolkit)