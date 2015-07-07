var handlebars = require("handlebars");
var fs = require("fs");
var path = require("path");
var _ = require("underscore");

function Lacomp (cfg) {
    this.cfg = cfg;
}

Lacomp.prototype.renderTemplate = function (filename, globals, locals) {
    var template_source = fs.readFileSync(filename, "utf-8");
    var tpl = handlebars.compile(template_source);
    var ctx = _.extend(globals || {}, locals || {});
    return tpl(ctx);
};

Lacomp.prototype.run = function () {
    var self = this;
    var meta = JSON.parse(fs.readFileSync(this.cfg.meta), "utf-8");
    var chunks = {};

    Object.keys(meta.seq).forEach(function (id) {
        var defs = meta.seq[id];
        var tpl_filename = path.resolve(path.join(self.cfg.library, defs[0]));
        var locals = _.extend(defs[1] || {}, { id: id });
        chunks[id] = self.renderTemplate(tpl_filename, meta.glob, locals);
    });

    var result = this.renderTemplate(this.cfg.template, meta.glob, chunks);
    fs.writeFileSync(path.resolve(path.join(self.cfg.target, "index.html")), result);
};

module.exports = Lacomp;
