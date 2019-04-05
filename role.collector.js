var meta = require("role.meta")

var o = Object.create(meta);

o.run = function(creep)  {


    if (_.sum(creep.carry) == 0){
        if (creep.memory.room && (creep.room.name != creep.memory.room)){
            var exit = creep.room.findExitTo(creep.memory.room);
            creep.moveTo(creep.pos.findClosestByRange(exit), {visualizePathStyle: {stroke: '#00ffff'}});
            return(0)
        }
        var resource = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES,
            {filter: function(object){return object.room.name == creep.room.name /*&& object.resourceType!=RESOURCE_ENERGY*/}});

//        creep.moveTo(resource);

         var containerSite = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: function(object){
                        return ( object.structureType == STRUCTURE_CONTAINER  || object.structureType == STRUCTURE_TERMINAL ) && ((Object.keys(object.store).filter((r) => r != RESOURCE_ENERGY).length)>0);
                    }
                });
        if (!containerSite){
            containerSite = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
                    filter: function(object){
            			return ((object.structureType == STRUCTURE_EXTENSION && object.energy > 0 ) ||  ( object.structureType === STRUCTURE_CONTAINER && object.store.energy > 100) || ( object.structureType === STRUCTURE_TOWER && object.energy > 0) ||  ( object.structureType === STRUCTURE_TERMINAL && object.store.energy > 100) ||  ( object.structureType === STRUCTURE_STORAGE && object.store.energy > 1000) ||  ( object.structureType === STRUCTURE_LINK && object.energy > 0) ||  ( object.structureType === STRUCTURE_SPAWN && object.energy > 0) ||  ( object.structureType === STRUCTURE_POWER_SPAWN && object.energy > 0) || ( object.structureType === STRUCTURE_LAB && object.energy > 0) );
                    }
                });
        }
//            var containerSite = containerSites[0];
        if (containerSite){
            creep.say(containerSite.structureType)
            creep.moveTo(containerSite);
            if (containerSite.structureType == STRUCTURE_LINK || containerSite.structureType == STRUCTURE_EXTENSION || containerSite.structureType == STRUCTURE_TOWER || containerSite.structureType == STRUCTURE_LAB || containerSite.structureType == STRUCTURE_SPAWN ){
                creep.withdraw(containerSite, RESOURCE_ENERGY)
            } else {
                for(var r in containerSite.store){
                    if (r != RESOURCE_ENERGY){
                        creep.withdraw(containerSite, r)
        //            if (containerSite.store[res]){
        //                creep.say()
                    }
                }
            }
//            creep.say(JSON.stringify(Object.keys(containerSite.store).filter((r) => r != RESOURCE_ENERGY).length))

        }
    } else {
        if (creep.memory.spawnRoomName && (creep.room.name != creep.memory.spawnRoomName)){
            creep.moveTo(Game.rooms[creep.memory.spawnRoomName].controller, {visualizePathStyle: {stroke: '#00ffff'}});
            return(0)
        }

        if (creep.pos.isNearTo(creep.room.storage)){
            for(var r in creep.carry){
                creep.say(creep.transfer(creep.room.storage, r))
            }
        } else {
            creep.moveTo(creep.room.storage)
        }
    }

}


module.exports = o;
