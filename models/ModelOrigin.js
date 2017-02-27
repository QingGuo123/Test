/**
 * Created by GuoJianFeng on 2/25/17.
 */

"use strict";

var ModelOrigin = function() {
    // Set db for object
    this.db = require("../db/db.js");
}

// Set db for class
ModelOrigin.db = require("../db/db.js");

ModelOrigin.prototype.updateDB = function(db) {
    this.db = db;
    ModelOrigin.db = db;
};

module.exports = ModelOrigin;
