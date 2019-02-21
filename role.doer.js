var meta = require("role.meta")

let taskTemplate = {}

var o = Object.create(meta);

    /** @param {Creep} creep **/
    o.run = function(creep) {
        creep.say('I am here')

	}

module.exports = o;
