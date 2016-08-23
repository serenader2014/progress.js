# Progress.js

A simple but powerful progress bar indicator for web.

## How to use

### Use as a npm dependency:

`npm install --save progress.js`

And include it in your project:

```javascript
var Progress = require('progress.js')
```

### Use an umd version

Clone or install this project to your local machine, and include `lib/progress.min.js` to your HTML file.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Progress.js Demo</title>
    <script src="/path/to/progress.min.js"></script>
    <script>
        // place to create a Progress instance
    </script>
</head>
<body>
    
</body>
</html>
```

## API

### Class

#### Uploader

Creating an uploader instance.

**Parameters:**

- `options`
    A configuration object. Default options are:

```javascript
const defaultOption = {
  // element which the progress bar element will append to
  element: body, 

  // progress bar's position
  position: 'top', 

  // progress bar's color, accepts two kinds of format:
  // `#ffffff` and `rgb(255,255,255)`
  color: 'rgb(2, 141, 192)' 
}
```

**Returns:**

- Progress instance

**Examples:**

```javascript
const progress = new Progress({
  element: document.querySelector('.progress'),
  color: 'rgb(0,0,0)'
})
```

## Development

- Clone this project to your local machine.
- Run `npm install`
- Run `npm start`

## Licence

MIT
