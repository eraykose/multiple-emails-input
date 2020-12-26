const path = require('path');

module.exports = (env) => ({
    // Bundling mode
    mode: env.development ? 'development' : 'production',

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
            // TypeScript loader
            {
                test: /\.tsx?/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
});
