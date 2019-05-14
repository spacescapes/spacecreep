var meta = require("role.meta")

let taskTemplate = {}

var o = Object.create(meta);

    /** @param {Creep} creep **/
    o.run = function(creep) {
        if (((creep.memory.lastSeen)  && ((Game.time - creep.memory.lastSeen) < 10 )) || (creep.pos.findInRange(FIND_HOSTILE_CREEPS, 10).length) ){
            creep.say(((Game.time - creep.memory.lastSeen)))
            if (creep.pos.findInRange(FIND_HOSTILE_CREEPS, 15).length) {
                        creep.memory.lastSeen = Game.time
            }

            creep.moveTo(Game.flags.D2)


        } else {
            creep.say("what u do?")
            creep.moveTo(Game.flags.D1)
        }

	}

module.exports = o;
