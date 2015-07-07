#!/usr/bin/env node

var pkgInfo = require("./package.json");
var util = require("util");
var optimist = require("optimist");
var path = require("path");
var fs = require("fs");
var Lacomp = require("./lib/Lacomp");

console.log(util.format("%s %s", pkgInfo.name, pkgInfo.version));

var argv = optimist
    .usage("Usage:\n  "+pkgInfo.name+" --meta <filename> --target <directory> --library <directory> --template <filename>")
    .demand(["meta", "dest", "library", "template"])
    .alias({
        "meta": "c",
        "target": "d",
        "template": "t",
        "library": "l"
    })
    .argv;

var cfg = {
    "meta": path.resolve(argv.meta),
    "target": path.resolve(argv.target),
    "library": path.resolve(argv.library),
    "template": path.resolve(path.join(argv.library, argv.template))
};

var lacomp = new Lacomp(cfg);
lacomp.run();
