# Multiple Emails Input
A JavaScript component to convert any form input element into a multiple emails input.

Features include:

- Email element can be added by pressing `Enter`, `,` , or by losing focus on the input field.
- An email element can be deleted by the `X` sign in each block.
- Pasted emails will be converted into blocks immediately.
- `getEmails` method return valid emails by default. You can pass `all`,`valid`,`invalid` type to get emails based on type.   
- Duplicated emails will not be added to the list.
- Supported by `ie11` and the latest versions of `Chrome`, `Safari`, `Firefox`, `Edge`.

See [eraykose.github.io/multiple-emails-input/](https://eraykose.github.io/multiple-emails-input/) for live demo.

## Buildings

If you use yarn

```
yarn && yarn build
```

If you use npm

```
npm i && npm run build
```

## How to use

Add the JavaScript file into html.

```html
<script src="<PATH>/emails-input.js"></script>
```

Add the CSS file into your head tag

```html
<link rel="stylesheet" src="<PATH>/emails-input.css" />
```

Then call `EmailsInput` function with passing `div` element you want to convert to it :

```html
<div id="emails-input"></div>
<script>
  var inputContainerNode = document.querySelector('#emails-input');
  var emailsInput = EmailsInput(inputContainerNode,...);
</script>
```

This will convert the div element into a multi emails input.

## EmailsInput Args

```js
var emailsInput = EmailsInput(element,props);
```

- `element:HTMLDivElement` - Div element to convert EmailsInput

### Props

- `initialValues:string[]` - Initial email values 
- `placeholder:string` - Provide a different placeholder

## Methods

EmailsInput exposes two public methods:

- `getEmails(type:string='valid'):string[]` - Return valid emails by default. You can pass `all`,`valid` or `invalid` type to get emails based on type.
- `add(value:string)` - Add an email to the list.
