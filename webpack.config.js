var path = require("path");

module.exports = {
    context: __dirname,
    entry: ['babel-polyfill',"./robotic_anomia.jsx"],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: [/\.jsx?$/, /\.js?$/],
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'react']
                }
            }
        ]
    },
    devtool: 'source-map',
    resolve: {
        extensions: [".js", ".jsx", "*"]
    }
};
