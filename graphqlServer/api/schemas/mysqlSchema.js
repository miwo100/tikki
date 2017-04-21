"use strict";
var mysqlSchema = "\ntype Awt {\n  id: Int\n  collaborator: String\n  issue: String\n  description: String\n  duration: Float\n  workdate: Date\n  start: Date\n  end: Date\n  paid: Boolean\n  consolidated: Boolean\n  created_at: Date\n  updated_at: Date\n}\n\ninput AwtInput {\n  collaborator: String\n  issue: ID\n  description: String\n  duration: Float\n  workdate: Date\n  start: Date\n  end: Date\n  paid: Boolean\n  consolidated: Boolean\n}\n";
exports.mysqlSchema = mysqlSchema;
exports.resolvers = {};
//# sourceMappingURL=mysqlSchema.js.map