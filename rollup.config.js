import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

const isNode = process.env.NODE_ENV === 'node';

export default {
	input: 'src/index.js',
	output: isNode
		? [
			{ file: 'index.js', format: 'cjs', sourcemap: true, strict: false },
			{ file: 'index.mjs', format: 'esm', sourcemap: true, strict: false }
		]
	: { file: 'browser.js', format: 'cjs', name: 'dsc', sourcemap: false, strict: false },
	plugins: [
		babel({
			plugins: [].concat(
				isNode
					? [
						['transform-globals', {
							replace: {
								document: 'window.document'
							}
						}],
						['func-wrap', {
							name: 'default',
							format: 'esm',
							args: ['window']
						}]
					]
				: []
			),
			presets: [
				['@babel/env', {
					corejs: 3,
					loose: true,
					modules: false,
					targets: { node: 8 },
					useBuiltIns: 'entry'
				}]
			]
		})
	].concat(isNode
		? []
	: [
		terser(),
		compressCJS()
	])
}

function compressCJS () {
	return {
		name: 'compress-cjs',
		renderChunk (code, chunk, options) {
			if (options.format === 'cjs') {
				return code.replace(/,module\.exports=dsc;?$/, '');
			}

			return null;
		}
	};
}
