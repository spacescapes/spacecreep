var meta = require("role.meta")

var o = Object.create(meta);

o.run = function(creep)  {

if (creep.name == 'Co6'){
      if (_.sum(creep.carry) == 0){
        var resource = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES,
            {filter: function(object){return object.room.name == creep.room.name /*&& object.resourceType!=RESOURCE_ENERGY*/}});

//        creep.moveTo(resource);

         var containerSite = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: function(object){
                        return (( object.structureType == STRUCTURE_STORAGE   ) && ((Object.keys(object.store).filter((r) => r != RESOURCE_ENERGY).length)>0));
                    }
                });
//            var containerSite = containerSites[0];
        if (containerSite){
            creep.moveTo(containerSite);
            for(var r in containerSite.store){
                if (r != RESOURCE_ENERGY){
                    creep.withdraw(containerSite, r)
    //            if (containerSite.store[res]){
    //                creep.say()
                }
            }
            creep.say(JSON.stringify(Object.keys(containerSite.store).filter((r) => r != RESOURCE_ENERGY).length))

        }
    } else {
        if (creep.pos.isNearTo(creep.room.terminal)){
            for(var r in creep.carry){
                creep.say(creep.transfer(creep.room.terminal, r))
            }
        } else {
            creep.moveTo(creep.room.terminal)
        }
    }
} else {
    if (_.sum(creep.carry) == 0){
        var resource = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES,
            {filter: function(object){return object.room.name == creep.room.name /*&& object.resourceType!=RESOURCE_ENERGY*/}});

//        creep.moveTo(resource);

         var containerSite = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: function(object){
                        return (( object.structureType == STRUCTURE_CONTAINER  || object.structureType == STRUCTURE_TERMINAL ) && ((Object.keys(object.store).filter((r) => r != RESOURCE_ENERGY).length)>0));
                    }
                });
//            var containerSite = containerSites[0];
        if (containerSite){
            creep.moveTo(containerSite);
            for(var r in containerSite.store){
                if (r != RESOURCE_ENERGY){
                    creep.withdraw(containerSite, r)
    //            if (containerSite.store[res]){
    //                creep.say()
                }
            }
            creep.say(JSON.stringify(Object.keys(containerSite.store).filter((r) => r != RESOURCE_ENERGY).length))

        }
    } else {
        if (creep.pos.isNearTo(creep.room.storage)){
            for(var r in creep.carry){
                creep.say(creep.transfer(creep.room.storage, r))
            }
        } else {
            creep.moveTo(creep.room.storage)
        }
    }
}
}


module.exports = o;
