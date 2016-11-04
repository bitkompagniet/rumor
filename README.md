A simple logging module that sports 5 levels of logging:

- trace
- debug
- info
- warn
- error

The level shown in stdout is determined by the `rumor` env var. Set it,
and everything of that level or higher will be shown. It will default to
**info**.

Output is colored / formatted (using [chalk](https://www.npmjs.com/package/chalk)), 
and will show level, namespace, date and message:

```bash
info   rumor 2016-11-04 12:29:06  info
warn   rumor 2016-11-04 12:29:06  warn
error  rumor 2016-11-04 12:29:06  error
```

The namespace will default to the current package name, but can be overridden.

## Install

```
npm install --save rumor
```

## Usage

```javascript
const rumor = require('rumor');

rumor.debug('This is a debugging message');

// debug  mymodule 2016-11-04 12:29:06  This is a debugging message

rumor.info('This is an info message', 'my namespace');

// info   my namespace 2016-11-04 12:29:06  This is an info message
```
