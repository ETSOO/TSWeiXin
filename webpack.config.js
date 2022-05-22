const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './src/web.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx|ts)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                { modules: false, targets: 'defaults' }
                            ],
                            '@babel/preset-typescript'
                        ],
                        plugins: [
                            '@babel/plugin-transform-runtime',
                            '@babel/proposal-class-properties',
                            '@babel/proposal-object-rest-spread'
                        ]
                    }
                }
            }
        ]
    },
    externals: ['wx'],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false
            })
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx']
    },
    output: {
        filename: 'wxutils.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'development',
    devServer: {
        watchFiles: ['src/**/*', 'public/**/*'],
        static: {
            directory: path.join(__dirname, 'public')
        },
        hot: true,
        compress: true,
        open: {
            target: ['index.html']
        },
        port: 9000,
        allowedHosts: 'all' //for ngrok
    }
};
