var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var StatsPlugin = require("stats-webpack-plugin");
var loadersByExtension = require("./config/ext-loader");


var root = path.join(__dirname, "app");

var asyncLoader = {
    test: path.join(__dirname, "app", "route-handlers"),
    loader: "react-proxy-loader/unavailable"
};

var loaders = {
    "jsx": "babel-loader?stage=0",
    "js": {
        loader: "babel-loader?stage=0",
        include: [path.join(__dirname, "app"), path.join(__dirname, "config")]
    },
    "json": "json-loader",
    "coffee": "coffee-redux-loader",
    "json5": "json5-loader",
    "txt": "raw-loader",
    "png|jpg|jpeg|gif|svg": "url-loader?limit=10000",
    "woff|woff2": "url-loader?limit=100000",
    "ttf|eot": "file-loader",
    "wav|mp3": "file-loader",
    "html": "html-loader",
    "md|markdown": ["html-loader", "markdown-loader"]
};

var cssLoader = "css-loader/locals?localIdentName=[path][name]---[local]---[hash:base64:5]";
var stylesheetLoaders = {
    "css": cssLoader,
    "less": [cssLoader, "less-loader"],
    "styl": [cssLoader, "stylus-loader"],
    "scss|sass": [cssLoader, "sass-loader"]
};

var alias = {jquery: "jquery"};


var plugins = [
    new webpack.PrefetchPlugin("react"),
    new webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment"),
    new StatsPlugin(path.join(__dirname, "build", "stats.json"), {
        chunkModules: true,
        exclude: [
            /node_modules[\\\/]react(-router)?[\\\/]/,
            /node_modules[\\\/]items-store[\\\/]/
        ]
    }),
    new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1}),
    new webpack.DefinePlugin({"global.GENTLY": false})
];


module.exports = {
    entry: {
        server: "./config/server"
    },
    output: {
        path: path.join(__dirname, "build"),
        publicPath: "/build/",
        filename: "[name].js",
        chunkFilename: "[name].js",
        libraryTarget: "commonjs2"
    },
    target: "node",
    module: {
        loaders: [asyncLoader].concat(loadersByExtension(loaders)).concat(loadersByExtension(stylesheetLoaders))
    },
    node: {
        __dirname: true
    },
    resolveLoader: {
        root: path.join(__dirname, "node_modules"),
        alias: {
            "react-proxy$": "react-proxy/unavailable",
            "react-proxy-loader$": "react-proxy-loader/unavailable"
        }
    },
    externals: [/^react(\/.*)?$/, /^reflux(\/.*)?$/, "superagent", "async"],
    resolve: {
        root: root,
        modulesDirectories: ["web_modules", "node_modules"],
        extensions: ["", ".web.js", ".js", ".jsx"],
        alias: {jquery: "jquery"}
    },
    plugins: plugins
}