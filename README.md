# dsc [<img src="https://jonneal.dev/dom-logo.svg" alt="Babel" width="90" height="90" align="right">][dsc]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

[dsc] is a JavaScript function for defining DOM structures. It takes an
element, properties or attributes, children, and returns a DOM structure. It
will add up to 358 bytes to your project.

```
dsc(element, attributes, ...children)
```

## Usage

Add **dsc** to your page.

```html
<script src="https://unpkg.com/dsc"></script>
<body>
  <script>
  dsc(document.body, null,
    // append <h3>Hello, <strong title="Earthly Planet">World</strong>! This is generated content!</h3>
    dsc('h3', null,
      'Hello, ', dsc('strong', { title: 'Earthly Planet' },
        'World'
      ), '! This is generated content!'
    ),

    // append a hidden svg symbol
    dsc('svg', { width: 0, height: 0 },
      dsc('symbol', { id: 'foo', viewBox: '0 0 32 32' },
        dsc('path', { d: 'M0 0h12L8 4l6 6-4 4-6-6-4 4M32 0H20l4 4-6 6 4 4 6-6 4 4M0 32V20l4 4 6-6 4 4-6 6 4 4m20 0V20l-4 4-6-6-4 4 6 6-4 4' })
      )
    ),

    // append a visible svg using the previous symbol
    dsc('svg', { width: 32, height: 32 },
      dsc('use', { href: '#foo' })
    )
  );
  </script>
</body>
```

Alternatively, add **dsc** to your project:

```sh
npm install dsc
```

```js
import getdsc from 'dsc';

const dsc = getdsc(window);

// append <h3>Hello, <strong title="Earthly Planet">World</strong>!</h3>
dsc(document.body, null,
  dsc('h3', null,
    'Hello, ', dsc('strong', { title: 'Earthly Planet' },
      'World'
    ), '! This is generated content!')
);
```

When `document` is an assumed global, use the browser version.

```js
import dsc from 'dsc/browser';

// append <h3>Hello, <strong title="Earthly Planet">World</strong>!</h3>
dsc(document.body, null,
  dsc('h3', null,
    'Hello, ', dsc('strong', { title: 'Earthly Planet' },
      'World'
    ), '! This is generated content!')
);
```

When using dsc alongside [jsdom], initialize dsc with the appropriate
`window` object.

```js
import jsdom from 'jsdom';
import getdsc from 'dsc';

const dom = new jsdom.JSDOM(`YOUR HTML`);
const dsc = getdsc(dom.window);

// append <h3>Hello, <strong title="Earthly Planet">World</strong>!</h3>
dsc(dom.window.document.body, null,
  dsc('h3', null,
    'Hello, ', dsc('strong', { title: 'Earthly Planet' },
      'World'
    ), '! This is generated content!')
);
```

---

When converting JSX to JS, **dsc** can be used to generate DOM Elements.

```jsx
/** @jsx dsc */

<h3>Hello, <strong title="Earthly Planet">World</strong>! This is generated content!</h3>;

/* becomes */

dsc('h3', null,
  'Hello, ', dsc('strong', { title: 'Earthly Planet' },
    'World'
  ), '! This is generated content!'
);
```

> Read the
> [@babel/plugin-transform-react-jsx documentation](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx)
> for more information about transforming JSX.

## Arguments

### element

The first argument represents the Element being referenced or created. String
arguments create new Elements using the string as the tag name.

```js
// create <h3> using the "h3" string
dsc('h3');
```

```js
// use the created <h3>
dsc(document.createElement('h3'));
```

### attributes

The second argument represents the properties or attributes being assigned to
the element. When a name exists on the element as a property then the property
is assigned. Otherwise, the attribute is assigned. Attributes with a `null`
value are removed from the element.

```js
// create <h3 class="foo"> using the "className" property
dsc('h3', { className: 'foo' });
```

```js
// create <h3 class="foo"> using the "class" attribute
dsc('h3', { class: 'foo' });
```

```js
// create <h3> with a click event using the "onclick" property
dsc('h3', { onclick(event) {} });
```

### children

The third argument and all arguments afterward are children to be appended to
the element.

```js
// append "Hello World" as a text node to <h3>
dsc('h3', null, 'Hello World');
```

```js
// append "Hello World" as 3 text nodes to <h3>
dsc('h3', null, 'Hello', ' ', 'World');
```

```js
// append a new <h3> to the fragment
dsc(document.createDocumentFragment(), null, dsc('h3'));
```

## Return

Create returns the element referenced or created by [element](#element).

```js
// h3 is <h3>
const h3 = dsc('h3');

// h3ish3 is true
const ish3h3 = h3 === dsc(h3);
```

[dsc]: https://github.com/jonathantneal/dsc
[jsdom]: https://github.com/jsdom/jsdom

[cli-img]: https://img.shields.io/travis/jonathantneal/dsc.svg
[cli-url]: https://travis-ci.org/jonathantneal/dsc
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[npm-img]: https://img.shields.io/npm/v/dsc.svg
[npm-url]: https://www.npmjs.com/package/dsc
