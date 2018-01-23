module.exports = function (options) {

    var express = require("express");
    var bodyParser = require("body-parser");
    var path = require("path");

    // require the page rendering logic
    var Renderer = require("./build/server.js");

    // load bundle information from stats
    var stats = require("./build/stats.json");

    var publicPath = stats.publicPath;

    var renderer = new Renderer();

    var app = express();


    app.use("/build", express.static(path.join(__dirname, ".", "build"), {}));

    app.get("/api/data", function (req, res) {

        res.send(require("./data/data.json"))
    });


    app.get("/*", function (req, res) {
        renderer.render(req, res);
    });


    app.use(bodyParser.json());


    var port = process.env.PORT || options.defaultPort || 8080;
    app.listen(port, function () {
        console.log("Server listening on port " + port);
    });
};
