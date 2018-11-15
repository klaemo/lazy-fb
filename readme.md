# lazy-fb [![Travis][build-badge]][build] [![npm package][npm-badge]][npm]

[build-badge]: https://img.shields.io/travis/klaemo/lazy-fb/master.svg?style=flat-square
[build]: https://travis-ci.org/klaemo/lazy-fb
[npm-badge]: https://img.shields.io/npm/v/lazy-fb.svg?style=flat-square
[npm]: https://www.npmjs.org/package/lazy-fb

[![NPM](https://nodei.co/npm/lazy-fb.png)](https://nodei.co/npm/lazy-fb/)

[`lazy-fb`](https://www.npmjs.com/package/lazy-fb) let's you load Facebook's JS SDK lazily.
It's just a very thin (~700 bytes) layer on top of Facebook's snippet.

Now, why would you want to do that? Well, you might only need the SDK in a few places of your
app/site like your login or signup flow. So there's no need to load it in all the other places
and force the user to download and evaluate all that JavaScript for nothing (~200kb).

## Installation

Using [npm](https://www.npmjs.com/):

    $ npm install --save lazy-fb

Then with a module bundler like [webpack](https://webpack.github.io/), use as you would anything
else:

```js
// using ES modules
import lazyFB from 'lazy-fb'

// using CommonJS modules
const lazyFB = require('lazy-fb')
```

The UMD build is also available on [unpkg](https://unpkg.com):

```html
<script src="https://unpkg.com/lazy-fb/lazy-fb.min.js"></script>
```

You can find the library on `window.lazyFB`.

## Usage

The exported function returns a `Promise` which resolves with the SDK. So you can use it with promises or async/await. The SDK will also be globally available on `window.FB`. Calling the function multiple times will only load the SDK once.

```jsx
const lazyFB = require('lazy-fb')

// Promises
lazyFB({ appId: 'your-app-id' }).then(FB => FB.getLoginStatus())

// async/await
const FB = await lazyFB({ appId: 'your-app-id' })
FB.getLoginStatus()
```

### Options

On top of all the standard options for `FB.init()` like `appId`, `xfbml`, `status`, etc. you can pass the following options to change what will get loaded:

```js
{
  lang: 'en_US', // the language of the SDK
  debug: false, // whether to load the debug build or not
  sdkModule: '' // Facebook recently separated some modules from SDK. Other values are ['xfbml.customerchat'] 
}
```

Take a look at https://developers.facebook.com/docs/javascript/advanced-setup for more options.



## License
[ISC](https://tldrlegal.com/license/-isc-license)
