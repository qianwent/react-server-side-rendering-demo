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

var cssLoader = "css-loader";
var stylesheetLoaders = {
    "css": ExtractTextPlugin.extract("style-loader", cssLoader),
    "less": ExtractTextPlugin.extract("style-loader", [cssLoader, "less-loader"].join("!")),
    "styl": ExtractTextPlugin.extract("style-loader", [cssLoader, "stylus-loader"].join("!")),
    "scss|sass": ExtractTextPlugin.extract("style-loader", [cssLoader, "sass-loader"].join("!"))
};

var alias = {jquery: "jquery"};


var plugins = [
    new webpack.PrefetchPlugin("react"),
    new webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment"),
    new StatsPlugin(path.join(__dirname, "build", "stats.prerender.json"), {
        chunkModules: true,
        exclude: [
            /node_modules[\\\/]react(-router)?[\\\/]/,
            /node_modules[\\\/]items-store[\\\/]/
        ]
    }),
    new webpack.DefinePlugin({"global.GENTLY": false}),
    new ExtractTextPlugin("[name].css"),
    new webpack.optimize.UglifyJsPlugin({
        compressor: {
            warnings: false
        },
        mangle: false
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("production")
        }
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
    })
];

var devHost = "http://blog.coding.com";
var devPort = "2992";

module.exports = {
    entry: {
        client: "./config/client"
    },
    output: {
        path: path.join(__dirname, "build"),
        publicPath: "/build/",
        filename: "[name].js",
        chunkFilename: "[id].js",
        sourceMapFilename: "debugging/[file].map",
        pathinfo: true
    },
    target: "web",
    module: {
        loaders: [asyncLoader].concat(loadersByExtension(loaders)).concat(loadersByExtension(stylesheetLoaders))
    },
    node: {
        __dirname: true
    },
    resolveLoader: {
        root: path.join(__dirname, "node_modules")
    },
    resolve: {
        root: root,
        modulesDirectories: ["web_modules", "node_modules"],
        extensions: ["", ".web.js", ".js", ".jsx"],
        alias: {jquery: "jquery"}
    },
    plugins: plugins
}