"use strict";
var language_1 = require("graphql/language");
exports.baseSchema = "\nscalar Date\n";
exports.resolvers = {
    Date: {
        __parseValue: function (value) {
            return new Date(value); // value from the client
        },
        __serialize: function (value) {
            return value.getTime(); // value sent to the client
        },
        __parseLiteral: function (ast) {
            if (ast.kind === language_1.Kind.INT) {
                return parseInt(ast.value, 10); // ast value is always in string format
            }
            return null;
        }
    }
};
//# sourceMappingURL=baseSchema.js.map