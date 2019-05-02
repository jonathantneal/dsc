/**
* @func dsc
* @desc Return a newly created DOM structure (with browser support for svgs).
* @param {Node|String} [id] - The tag of the new element node being created (otherwise a new document fragment).
* @param {Object} [props] - The properties or attributes being assigned to the node.
* @param {...Node|String} [children] Additional nodes or text being appended to the node.
* @return {HTMLElement|DocumentFragment}
*/

export default function dsc (id, props) {
	const node = id == null
		// void ids becomes fragments
		? document.createDocumentFragment()
	: id === Object(id)
		// objects are used as-is
		? id
	: id in dsc.ref
		// known nodes are cloned (preserving namespace, boosting performance)
		? dsc.ref[id].cloneNode()
	// new nodes are referenced then cloned
	: (dsc.ref[id] = document.createElement(id)).cloneNode();

	for (const name in props) {
		// conditionally set the node property (as a non-object until Firefox supports `{ viewBox: '0 0 100 100' }`)
		if (name in node && !(node[name] === Object(node[name]))) {
			node[name] = props[name];
		}
		// conditionally remove the node attribute
		else if (props[name] === null && node.removeAttribute) {
			node.removeAttribute(name);
		}
		// conditionally set the node attribute
		else if (node.setAttribute) {
			node.setAttribute(name, props[name]);
		}
	}

	// conditionally assign children
	if (node.append) {
		node.append(...Array.prototype.slice.call(arguments, 2));
	}

	return node;
}

// reference svg elements with the correct namespace
dsc.ref = ['circle', 'ellipse', 'defs', 'g', 'image', 'line', 'path', 'polygon', 'polyline', 'rect', 'svg', 'symbol', 'text', 'use'].reduce(
	(ref, id) => (ref[id] = document.createElementNS('http://www.w3.org/2000/svg', id), ref),
	{}
);
