var webpack = require("webpack");
var path = require("path");

module.exports = {
    entry: './src/app-client',
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'src/static'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js']
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                },
                exclude: /node_modules/
            }
        ]
    }
};
