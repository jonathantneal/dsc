/* Testing Function
/* ========================================================================== */

function test (name, sourceCode, expectCode) {
	/* eslint-disable no-console */

	console.log(name);

	if (expectCode === sourceCode) {
		console.log('  PASSED');
	} else {
		console.log('  FAILED');
		console.log('Expected:', JSON.stringify(expectCode));
		console.log('Recieved:', JSON.stringify(sourceCode));

		process.exit(1);
	}
}

/* Tests
/* ========================================================================== */

test(
	'dsc: test initialization',
	true,
	true
);

const jsdom = require('jsdom');

const dom = new jsdom.JSDOM(`Hello, World!`);

test(
	'dsc: jsdom initialization',
	dom.window.document.documentElement.outerHTML,
	`<html><head></head><body>Hello, World!</body></html>`
);

const getdsc = require('.');
const dsc = getdsc(dom.window);

test(
	'dsc: generate the README example',
	dsc('h3', null,
		'Hello, ', dsc('strong', { title: 'Earthly Planet' },
		'World'
		), '! This is generated content!'
	).outerHTML,
	`<h3>Hello, <strong title="Earthly Planet">World</strong>! This is generated content!</h3>`
);

test(
	'dsc: return the source element',
	dsc(dom.window.document.documentElement).outerHTML,
	`<html><head></head><body>Hello, World!</body></html>`
);

test(
	'dsc: append dom and return the source element',
	dsc(dom.window.document.body, null,
		dsc('h3', null,
			'Hello, ', dsc('strong', { title: 'Earthly Planet' },
			'World'
			), '! This is generated content!'
		)
	).outerHTML,
	`<body>Hello, World!<h3>Hello, <strong title="Earthly Planet">World</strong>! This is generated content!</h3></body>`
);

test(
	'dsc: return an element with an attribute set',
	dsc('h1', { class: 'foo' }).outerHTML,
	`<h1 class="foo"></h1>`
);

test(
	'dsc: return an element with a property set',
	dsc('h1', { className: 'foo' }).outerHTML,
	`<h1 class="foo"></h1>`
);

process.exit(0);
