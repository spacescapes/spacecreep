var meta = require("role.meta")

var o = Object.create(meta);

o.run = function(creep) {


    if (creep.carry.energy == 0){

        if (creep.memory.room && Game.rooms[creep.memory.room] && creep.room.name == Game.rooms[creep.memory.room].name){
            var spawn = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => structure.structureType == STRUCTURE_SPAWN})
            if (spawn){
                if (creep.pos.inRangeTo(spawn,1)){
                    spawn.recycleCreep(creep)
                } else {
                     creep.moveTo(spawn)
                }
            } else {
                creep.say("suicide")
            }
        } else {
            this.moveAndWithdraw(creep, creep.room.storage, RESOURCE_ENERGY)
        }
    } else {
        if (creep.memory.room && (!Game.rooms[creep.memory.room] || creep.room.name != Game.rooms[creep.memory.room].name)){
            creep.moveTo(Game.rooms[creep.memory.room].storage)
        } else if (creep.memory.room && (!Game.rooms[creep.memory.room] || creep.room.name == Game.rooms[creep.memory.room].name)) {
            this.moveAndTransfer(creep, creep.room.storage, RESOURCE_ENERGY)
        } else {
            creep.suicide()
        }
    }

}


module.exports = o;
