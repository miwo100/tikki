"use strict";
//other models might have more than one connector
var Awt = (function () {
    function Awt() {
    }
    Awt.prototype.getAll = function (context) {
        return context.connectors.mysql.awt.all({ raw: true, order: [["id", "DESC"]], limit: 5 });
    };
    Awt.prototype.add = function (args, context) {
        return context.connectors.mysql.awt.create(args);
    };
    return Awt;
}());
exports.Awt = Awt;
//# sourceMappingURL=awt.js.map