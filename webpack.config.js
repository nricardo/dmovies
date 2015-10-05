var path = require('path');

module.exports = {
	// entry point
	context: path.join(__dirname, 'src'),
	entry: './bootstrap.js',

	// output definition
	output: {
		publicPath: 'js/',
		filename: 'app.js',
		path: path.join(__dirname, 'public/js')
	},

	// loaders definitions
	module: {
		loaders: [
			// transpiles ES6 into vanilla ES5 code
			{
				test: /\.jsx?$/,
				loader: 'babel',
				exclude: /node_modules/,
		    query: {
		      stage: 1
		    }
			},

			// loads HTML templates
			{
	      test: /\.html$/,
	      loader: 'html',
				exclude: /node_modules/
			},

			// loads JSON files
			{
	      test: /\.json$/,
	      loader: 'json',
				exclude: /node_modules/
			},

			{
	      test: /\.scss$/,
				loaders: ['style', 'css', 'sass']
			},

	    // needed by bootstrap's
	    { test: /\.eot$/,    loader: 'file' },
	    { test: /\.svg$/,    loader: 'url?limit=8192&mimetype=image/svg+xml' },
	    { test: /\.ttf$/,    loader: 'url?limit=8192&mimetype=application/octet-stream' },
	    { test: /\.woff2?$/, loader: 'url?limit=8192&mimetype=application/font-woff' }
	  ]
	}
}
