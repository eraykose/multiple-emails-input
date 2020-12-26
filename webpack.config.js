const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => ({
    // Bundling mode
    mode: env && env.development ? 'development' : 'production',

    // Entry files
    entry: './src/index.ts',

    // Output bundles (location)
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'emails-input.js',
        library: 'EmailsInput',
    },

    // Serving options
    devServer: {
        publicPath: '/dist/',
        // It is a workaround to solve library output problem on dev server
        injectClient: false,
    },

    // File resolutions
    resolve: {
        extensions: ['.ts', '.js'],
    },

    // source-map
    devtool: 'source-map',

    // Loaders
    module: {
        rules: [
            // CSS loaders
            {
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.tsx?/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            // TypeScript loader
            {
                test: /\.tsx?/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },

    //Plugins
    plugins: [new MiniCssExtractPlugin({ filename: 'emails-input.css' })],
});
