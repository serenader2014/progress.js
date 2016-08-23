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

### Instance

#### progress.start(algorithm)

Start loading the progress bar. Progress bar will increase automatically.

**Parameters:**

- *algorithm*: `String`
  Progress bar increase algorithm. Supported algorithm is(will add more in the future):
  - `linear`

**Returns:**

- Current Progress instance

**Example:**

```javascript
const progress = new Progress()
progress.start()
```

#### progress.stop()

Stop increase the progress bar.

**Parameters:** none

**Returns:**

- Current Progress instance

**Examples:**

```javascript
const progress = new Progress()
const stopBtn = document.querySelector('button')
progress.start()

stopBtn.addEventListener('click', function () {
  progress.stop()
})
```

#### progress.end()

Finish loading. Progress bar will immediately increase to 100%, and fade away slowly.

**Parameters:** none

**Returns:**

- Current Progress instance

**Examples:**

```javascript
const progress = new Progress()
const finishBtn = document.querySelector('button')
progress.start()

finishBtn.addEventListener('click', function () {
  progress.end()
})
```

#### progress.set(percentage)

Set the current progress bar's percentage.

**Parameters:**

- *percentage*: `Number`
  Progress bar's percentage value. The valid value is between 0 and 100.

**Returns:**

- Current Progress instance

**Examples:**

```javascript
const progress = new Progress()
progress.start()

setTimeout(function () {
  progress.set(50)
}, 1000)
```

#### progress.setColor(Color)

Change the progress bar's color.

**Parameters:**

- *Color*: `String`
  Target color. Color format can be a hex value or a RGB value

**Returns:**

- Current Progress instance

**Examples:**

```javascript
const progress = new Progress()
const changeColorBtn = document.querySelector('button')
progress.start()

changeColorBtn.addEventListener('click', function () {
  progress.setColor('#234567')
})
```

#### progress.on(eventName, fn[, context])

Listen to Progress instance's event.

**Parameters:**

- *eventName*: `String`
  Target event name. Supported events are:

    * progress: will be fired when the progress bar is loading
    * start: will be fired when the progress bar starting loading
    * stop: will be fired when stopping loading
    * set: will be fired when manually setting the percentage
    * end: will be fired when progress is ending
    * setColor: will be fired when setting color

- *fn*: `Function`
  Function that will be called when the event is fired.

- *context*: `Object`, optional
  Callback function's context.

**Returns:**

- Current Progress instance

**Examples:**

```javascript
const progress = new Progress()
progress.on('progress', function () {
  console.log('in progress')
})
progress.start()
```

#### progress.trigger(eventName[, ...argN])

Manually trigger an event.

**Parameters:**

- *eventName*: `String`
  Event name to triggered.

- *argN*: `Any`
  Arguments to pass to the callback function.

**Returns:**

- Current Progress instance

**Examples:**

```javascript
const progress = new Progress()
progress.start()

progress.on('progress', function (percentage) {
  if (percentage == 50) {
    progress.trigger('customEvent', percentage)
  }
})

progress.on('customEvent', function (arg) {
  console.log(arg)
})
```

#### Property

- **percent**
    Current progress value. The value in between 0 and 100.
- **id**
    Current Progress instance id.
- **status**
    Current Progress instance status, value can be `waiting`, `loading`.
- **options**
    Progress instance's configuration object.

## Development

- Clone this project to your local machine.
- Run `npm install`
- Run `npm start`

## Licence

MIT
