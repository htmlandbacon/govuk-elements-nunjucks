# GOV-RADIOS Documentation

This macro generates a `<select>` with `<label>` based on what you supply..

## Variables

```
name
id
label
hint
value
error
options
classes
```

## Descriptions of variables

| Name          | Description                                                   |
| ------------- |---------------------------------------------------------------|
| name          | sets the name of the select                                   |
| id            | sets the base id for each  label                              |
| label         | sets the text of the label                                    |
| hint          | sets hint text within the label                               |
| value         | sets the select to selected when matched                      |
| error         | sets the error message within the legend                      |
| placeholder   | sets the first option to this text                            |
| options       | object of values to generate options in the select            |
| classes       | object used for styling elements                              |

With placeholder, hint and error if the values are empty, then they are not displayed in the render.

## options

You have to pass these as an array of objects, there is no set order to this.

| Name             | Description                                                   |
| ---------------- |---------------------------------------------------------------|
| value            | sets value of the option                                      |
| display          | sets value of the display                                     |

An example of one, two three options array:

```javascript
[
  {value: 'one', display: 'One'},
  {value: 'two', display: 'Two'},
  {value: 'three', display: 'Three'}
]
```

## Classes

You can add various styles to the elements within the macro.

| Name          | Description                                                   |
| ------------- |---------------------------------------------------------------|
| fromGroup     | add a class to the parent div of the whole thing              |
| label         | adds addtional classes to the label                           |
| selectClass   | adds a class to the select                                    |

These are supplied as a string i.e `{label: 'new-class new-class-two'}`.

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

```javascript
{% from 'gov-select/macro.njk' import govSelect %}

{{ govSelect('selectBox',
              'selectBox',
              'Please select an option',
              '',
              'one',
              '',
              '-- select a number',
              [{value: 'one', display: 'One'},
              {value: 'two', display: 'Two'},
              {value: 'three', display: 'Three'}]
              ) }}
```

## Links

- [nunjucks](https://mozilla.github.io/nunjucks/)
- [nunjucks with node](https://mozilla.github.io/nunjucks/getting-started.html)
- [GOVUK elements](https://github.com/alphagov/govuk_elements)
- [GOV.UK frontend toolkit](https://github.com/alphagov/govuk_frontend_toolkit)