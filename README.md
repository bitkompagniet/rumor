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

rumor('This will default to `debug` level (default shown level is `info`).');
rumor.debug('This is a debugging message');

// debug  mymodule 2016-11-04 12:29:06  This is a debugging message

rumor.info('This is an info message', 'my namespace');

// info   my namespace 2016-11-04 12:29:06  This is an info message
```

rumor will expand objects and arrays using util.inspect, to an arbitrary
depth.

All of the methods return the message object, which can be used to log
an object inside a promise chain and continue:

```javascript
return Promise.resolve({ name: 'John Smith', born: 1980 })
	.then(rumor.trace)
	.then(person => /* do something */)
	.catch(rumor.error);
```