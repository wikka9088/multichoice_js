const path = require('path');

module.exports = [
    {
        entry: './src/ts/editor.ts',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
            libraryTarget: "this",
        },
        resolve: {
            extensions: ['.webpack.js', '.web.js', '.ts', '.js']
        },
        externals: {
            "jquery": "jQuery",
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: 'ts-loader'
                },
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                    }
                },
                {
                    test: /\.scss$/,
                    use: [{
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader'
                    }, {
                        loader: 'sass-loader'
                    }]
                }
            ]
        }
    }
];