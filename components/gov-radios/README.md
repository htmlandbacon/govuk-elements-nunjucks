# GOV-RADIOS Documentation

This macro generates a selection of `<input>` with `<label>` based on what you supply, and a `<legend>` all in a `<fieldset>`.

## Variables

```
name
id
legend
hint
value
error
radioButtons
classes
```

## Descriptions of variables

| Name          | Description                                                   |
| ------------- |---------------------------------------------------------------|
| name          | sets the name of each input                                   |
| id            | sets the base id for each  label                              |
| legend        | sets the text of the legend                                   |
| hint          | sets hint text within the legend                              |
| value         | sets the radio button to checked when matched                 |
| error         | sets the error message within the legend                      |
| radioButtons  | object of values to generate a radio button                   |
| classes       | object used for styling elements                              |

With hint and error if the values are empty, then they are not displayed in the render.

## radioButtons

You have to pass these as an array of objects, there is no set order to this.

| Name             | Description                                                   |
| ---------------- |---------------------------------------------------------------|
| id               | this is prefixed by the main id                               |
| value            | sets value of the radio button                                |
| label            | sets value of the label                                       |
| dataTarget       | sets the dataTarget, this is used to with show/hide javascript|
| dataJourneyClick | sets a dataJourneyClick to be used with stage prompt          |

if two radio buttons are provided then they appear side by side, else it will appear as a list.

An example of yes/no radio buttons array:

```javascript
[
  {id: 'yes', value: 'yes', label: 'Yes'},
  {id: 'no', value: 'no', label: 'Yno'}
]
```

## Classes

You can add various styles to the elements within the macro.

| Name          | Description                                                   |
| ------------- |---------------------------------------------------------------|
| legend        | adds addtional classes to the legend                          |

These are supplied as a string i.e `{legend: 'new-class new-class-two'}`.

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
{% from 'gov-radios/macro.njk' import govRadios %}

{{ govRadios('yes-or-no',
              'yes-or-no',
              'Please select an option',
              '',
              'yes',
              '',
              [{id: 'yes', value: 'yes', label: 'Yes'},
                {id: 'no', value: 'no', label: 'Yno'}]
              ) }}
```

## Links

- [nunjucks](https://mozilla.github.io/nunjucks/)
- [nunjucks with node](https://mozilla.github.io/nunjucks/getting-started.html)
- [GOVUK elements](https://github.com/alphagov/govuk_elements)
- [GOV.UK frontend toolkit](https://github.com/alphagov/govuk_frontend_toolkit)