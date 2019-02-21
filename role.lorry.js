var meta = require("role.meta")

var o = Object.create(meta);

    /** @param {Creep} creep **/
    o.run = function(creep) {

creep.say("lorry")
/*
if (creep.name.startsWith('RE411173C29')){memory.ta
if (creep.memory.spawnRoomNameink && creep.room.name != creep.memory.spawnRoomName) {creep.moveTo(Game.rooms[creep.memory.spawnRoomName].contler); return(0)}
}
*/

        if (!creep.memory.harvestThreshold) creep.memory.harvestThreshold = 0
        if (creep.carry.energy == 0 ) creep.memory.work = false
        if (creep.carry.energy == creep.carryCapacity ) creep.memory.work = true
//        if (creep.carry.energy > 0 ) creep.memory.work = true
//creep.say(creep.memory.work)
        if (!creep.memory.work){

//            var energies = creep.room.find(FIND_DROPPED_RESOURCES, {filter: function(object){return object.room.name == creep.room.name && object.resourceType==RESOURCE_ENERGY && object.amount >= 50}});
//            var energy = energies.reduce((maxEnergy, nextEnergy) => (maxEnergy && maxEnergy.amount > nextEnergy.amount)?maxEnergy:nextEnergy, undefined)
                var energy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {filter: function(object){return object.room.name == creep.room.name && object.resourceType==RESOURCE_ENERGY && object.amount >= 30}});
//    energy = undefined
                if (energy && creep.pos.getRangeTo(energy) <= 5){
                    creep.say("L energy")
                    if (creep.pickup(energy) == ERR_NOT_IN_RANGE) { creep.moveTo(energy) } else {creep.memory.task = {}}
                } else {
                    var containerSite
                    if (creep.memory.task && creep.memory.task.id) {
                        containerSite = Game.getObjectById(creep.memory.task.id)
                    }
                    var containerSites = creep.room.find(FIND_STRUCTURES, {
	                    filter: function(object){
            			    return (object.structureType == STRUCTURE_CONTAINER /*|| object.structureType === STRUCTURE_STORAGE */ /*&& object.store.energy < object.storeCapacity */);
        		        }
        		    });
        		    var linkSites = creep.room.find(FIND_STRUCTURES, {
	                    filter: function(object){
            			    return (object.structureType == STRUCTURE_LINK   /*|| object.structureType === STRUCTURE_STORAGE */ /*&& object.store.energy < object.storeCapacity */);
        		        }
        		    });

                    if (creep.room.energyAvailable < creep.room.energyCapacityAvailable-creep.memory.harvestThreshold){
                		containerSite = _.max((_.filter(containerSites, ((a) => a.store.energy > 100))), ((a) => (a.store.energy - (creep.pos.getRangeTo(a)*2))));
if (containerSite== -Infinity) containerSite = undefined
                		linkSite = _.max((_.filter(linkSites, ((a) => Memory.linkMode[a.id]=='receive' && a.energy > 100))), ((a) => (a.energy - (creep.pos.getRangeTo(a)*2))));
if (linkSite== -Infinity) linkSite = undefined
                		if (!containerSite || (containerSite && linkSite && creep.pos.getRangeTo(containerSite) > creep.pos.getRangeTo(linkSite))){
                		    containerSite = linkSite
                		}
                		if (containerSite && creep.room.storage && creep.room.storage.store.energy > 1000 && creep.pos.getRangeTo(containerSite) > (creep.pos.getRangeTo(creep.room.storage)*3)){
                		    containerSite = creep.room.storage
                		}
                    } else {
                		containerSite = _.max((_.filter(containerSites, ((a) => a.store.energy > 1200))), ((a) => (a.store.energy - (creep.pos.getRangeTo(a)*2))));
if (containerSite== -Infinity) containerSite = undefined
if (creep.name == 'XO-baseLorry-3-W48N54'){console.log(containerSite)}
                		linkSite = _.max((_.filter(linkSites, ((a) => (!Memory.linkMode[a.id] || Memory.linkMode[a.id]=='receive') && a.energy > 300))), ((a) => (a.energy - (creep.pos.getRangeTo(a)*2))));
if (linkSite== -Infinity) linkSite = undefined
                		if (!containerSite  || (containerSite && linkSite && creep.pos.getRangeTo(containerSite) > creep.pos.getRangeTo(linkSite))){
                		    containerSite = linkSite
                		}

                	}



/*
containerSite = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    		filter: function(object){
                    			return ((object.structureType === STRUCTURE_CONTAINER || object.structureType == STRUCTURE_STORAGE ) && object.store.energy > 0 ) || ((object.structureType === STRUCTURE_LINK  ) && object.energy > 0 );
        //            			return ((object.structureType === STRUCTURE_TOWER  ) && object.energy > 0 );
                    		   }
                    	});
*/
//                    }

                    if (!containerSite){
                        containerSite = creep.pos.findClosestByRange(FIND_TOMBSTONES, {
                    		filter: function(object){
                    			return (object.store.energy > 10 ) ;
        //            			return ((object.structureType === STRUCTURE_TOWER  ) && object.energy > 0 );
                    		   }
                    		});
                     }
                    if (!containerSite){
                        containerSite = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    		filter: function(object){
                    			return ((object.structureType === STRUCTURE_CONTAINER  ) && ( object.store.energy > 1200 )
                                && ( !Memory.ta[object.id] || ( Memory.ta[object.id][1]==creep.name ) || (Game.time - Memory.ta[object.id][0]) > 5));
        //            			return ((object.structureType === STRUCTURE_TOWER  ) && object.energy > 0 );
                    		   }
                    		});
                     }
                    if (!containerSite){
                        var energy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {filter: function(object){return object.room.name == creep.room.name && object.resourceType==RESOURCE_ENERGY && object.amount >= 20}});
                        creep.say("L any energy")
                        if (creep.pickup(energy) == ERR_NOT_IN_RANGE) creep.moveTo(energy)

                    }
//                    if (!containerSite.structureType) console.log(containerSite)
                    if (containerSite){
                        Memory.ta[containerSite.id] = [Game.time, creep.name]
                        if (!creep.memory.task) creep.memory.task = {}
                        creep.memory.task.id = containerSite.id
                        creep.say("L "+ (containerSite.structureType?containerSite.structureType:containerSite))
                        if(creep.withdraw(containerSite, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(containerSite, {visualizePathStyle: {stroke: '#ffd0ff'}});
                        } else {
                            creep.memory.task = {}
                            Memory.ta[containerSite.id] = undefined
                        }
                    } else {
                        creep.say("no pickup")
                        if (creep.carry.energy > 0 ) creep.memory.work = true
//                        const target = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
//                        creep.moveTo(target);
                    }
                }

        } else {

            var target
            if (creep.room.energyAvailable < Math.max(creep.room.energyCapacityAvailable-creep.memory.harvestThreshold, 300)){
                target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_POWER_SPAWN/*  || structure.structureType == STRUCTURE_TOWER */) &&
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
            if (!target){
                target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function(structure) {
                        return (( structure.structureType == STRUCTURE_CONTAINER )
                            && (structure.store.energy < 300)
//                            && ( !Memory.ta[structure.id] || ( Memory.ta[structure.id][1]==creep.name ) || (Game.time - Memory.ta[structure.id][0]) > 5)
                            );
                    }
                });
            }
            if (!target){
                target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return (( structure.structureType == STRUCTURE_LINK )
                            && Memory.linkMode[structure.id]=='send'
                            && structure.energy < structure.energyCapacity
                            && creep.pos.inRangeTo(structure, 5)
//                            && ( !Memory.ta[structure.id] || ( Memory.ta[structure.id][1]==creep.name ) || (Game.time - Memory.ta[structure.id][0]) > 15)
                            );
                    }
                });

            }
            if (!target){
                target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {filter:function(a){if (a.structureType==STRUCTURE_LAB){console.log(a.structureType+" "+a.energy)};return(a.structureType==STRUCTURE_LAB && a.energy < a.energyCapacity)}});
            }
            if (!target){
                if (creep.room.storage && creep.room.storage.store.energy < 1000000){
                    target = creep.room.storage
                } else {
//                    target = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
                }
            }

            if(target) {
                creep.say("W "+ target.structureType)
                Memory.ta[target.id] = [Game.time, creep.name]
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                } else {
                   Memory.ta[target.id] = undefined
                }
            } else {
                if (creep.room.storage && creep.room.storage.store.energy < 1000)
                target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return ( structure.structureType == STRUCTURE_STORAGE ) &&
//                        return (structure.structureType == STRUCTURE_TOWER ) &&
                            structure.energy < structure.energyCapacity;
                    }
                });

                if (false && !creep.memory.parkSpawnId){
                    var spawn = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => structure.structureType == STRUCTURE_SPAWN})
                    creep.memory.parkSpawnId = spawn.id
                } else {
                    creep.moveTo(Game.getObjectById(creep.memory.parkSpawnId))
                }
            }
        }




	}

module.exports = o;
