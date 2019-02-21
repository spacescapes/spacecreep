var meta = require("role.meta")

var o = Object.create(meta);

    /** @param {Creep} creep **/
    o.run = function(creep) {

/*
if (creep.name.startsWith('RE411173C29')){
if (creep.memory.spawnRoomName && creep.room.name != creep.memory.spawnRoomName) {creep.moveTo(Game.rooms[creep.memory.spawnRoomName].controller); return(0)}
}
*/
        if (creep.carry.energy == 0 ) creep.memory.work = false
        if (creep.carry.energy == creep.carryCapacity ) creep.memory.work = true
//creep.say(creep.memory.work)
        if (!creep.memory.work){

//            var energies = creep.room.find(FIND_DROPPED_RESOURCES, {filter: function(object){return object.room.name == creep.room.name && object.resourceType==RESOURCE_ENERGY && object.amount >= 50}});
//            var energy = energies.reduce((maxEnergy, nextEnergy) => (maxEnergy && maxEnergy.amount > nextEnergy.amount)?maxEnergy:nextEnergy, undefined)

            var energy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {filter: function(object){return object.room.name == creep.room.name && object.resourceType==RESOURCE_ENERGY && object.amount >= 300}});
energy = undefined
            if (!creep.memory.onSource && energy){

                if (creep.pickup(energy) == ERR_NOT_IN_RANGE) creep.moveTo(energy)
            } else {

                var containerSite = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            		filter: function(object){
            			return ((object.structureType === STRUCTURE_CONTAINER || object.structureType == STRUCTURE_STORAGE ) && object.store.energy > 0 ) || ((object.structureType === STRUCTURE_LINK  ) && object.energy > 0 );
//            			return ((object.structureType === STRUCTURE_TOWER  ) && object.energy > 0 );
            		   }
            		});
                if (!creep.memory.onSource && containerSite){

                    if(creep.withdraw(containerSite, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(containerSite, {visualizePathStyle: {stroke: '#ffd0ff'}});
                    }

                } else {
                    var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)
                    if (!source){
                        creep.memory.onSource=false
                    } else if (creep.harvest(source) == ERR_NOT_IN_RANGE){
                         creep.moveTo(source, {visualizePathStyle: {stroke: '#00ffff'}})
                        creep.memory.onSource=false
                    } else {
                        creep.memory.onSource=true
                    }
                }
            }
        } else {
            var target
            if (creep.room.energyAvailable < creep.room.energyCapacityAvailable){
                target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_POWER_SPAWN ||  structure.structureType == STRUCTURE_TOWER ) &&
//                        return (structure.structureType == STRUCTURE_TOWER ) &&
                            structure.energy < structure.energyCapacity;
                    }
                });
            }
            if(!target) {
                target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ( structure.structureType == STRUCTURE_TOWER ) &&
                            structure.energy < structure.energyCapacity;
                    }
                });
            }
            if(target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                if (!creep.memory.parkSpawnId){
                    var spawn = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => structure.structureType == STRUCTURE_SPAWN})
                    creep.memory.parkSpawnId = spawn.id
                } else {
                    creep.moveTo(Game.getObjectById(creep.memory.parkSpawnId))
                }


            }
        }




	}

module.exports = o;
