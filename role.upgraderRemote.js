var roleUpgraderRemote = {

    /** @param {Creep} creep **/
    run: function(creep) {

//        creep.suicide()
//if (creep.name == 'UR16') creep.memory.tf = 'B1'
//if (creep.name == 'UR17') creep.memory.sf = 'B1'
//if (creep.name == 'UR17') creep.memory.tf = 'H1'
        var roomName = creep.memory.room;
        var sourceFlag = Game.flags[creep.memory.sf]
        var targetFlag = Game.flags[creep.memory.tf]
        if (!creep.memory.sf) {
            sourceFlag = Game.getObjectById(creep.memory.sId)
            if (!sourceFlag){
                sourceFlag = new RoomPosition(20,25,creep.memory.room)
            }
        }
        if (!creep.memory.tf) {
            targetFlag = Game.getObjectById(creep.memory.tId)
            if (!targetFlag){
                targetFlag = Game.getObjectById(Game.rooms[creep.memory.room].controller)
            }
        }

        if ((creep.hits < creep.hitsMax) && Game.rooms[creep.memory.spawnRoomName]) {
            creep.say("flee")
            creep.moveTo(Game.rooms[creep.memory.spawnRoomName].controller)
            return (0)
            }

         if(creep.carry.energy == 0) {
//            console.log(Game.getObjectById(creep.memory.sId)+ " "+ creep.memory.sId)


            var energy = creep.pos.findInRange(FIND_DROPPED_RESOURCES,9);

            if ((creep.room.name == creep.memory.spawnRoomName && energy.length && energy[0].amount > 300) || (creep.room.name != creep.memory.spawnRoomName && energy.length && energy[0].amount > 100) ){
                creep.say("energy")


                if (creep.pickup(energy[0]) != OK) creep.moveTo(energy[0])

            } else {
                if(!creep.pos.inRangeTo(sourceFlag,5)) {
                    creep.moveTo(sourceFlag, {visualizePathStyle: {stroke: '#00ffff'}})
                } else {



            		var containerSite = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                		filter: function(object){
                			return (object.structureType === STRUCTURE_CONTAINER && object.store.energy > 0 );
                		   }
            		});
                    if (containerSite){
                        if(creep.withdraw(containerSite, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(containerSite);
                        }
                    } else {
                        if(!creep.pos.inRangeTo(sourceFlag,2)){
                            creep.moveTo(sourceFlag, {visualizePathStyle: {stroke: '#00ffff'}, reusePath: 30})
                        } else {
                            creep.moveTo(20,20)
                        }
                    }
                }
            }
        } else {

//            console.log(JSON.stringify(creep.memory))
            if(creep.pos.inRangeTo(sourceFlag,5)) {

        		var containerSite = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            		filter: function(object){
            			return (object.structureType === STRUCTURE_CONTAINER && object.store.energy > 0 );
            		   }
        		});
        		if (creep.carry.energy <= creep.carryCapacity-10){
                    if (containerSite){
                        creep.say("L container")
                        if (creep.withdraw(containerSite, RESOURCE_ENERGY) != OK) {
                                creep.moveTo(containerSite)
                                return(0)

                        }
                    }
            	}
            }
            if (creep.getActiveBodyparts(WORK) > 0){
            	var buildSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES,1);
                if (buildSite && creep.pos.inRangeTo(buildSite, 1)){
                    if (creep.build(buildSite) == OK){
                        return (0)
                    }
                }
            	var repairSite = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            		filter: function(object){
            			return ((object.structureType == STRUCTURE_ROAD && object.hits < (object.hitsMax) && creep.pos.inRangeTo(object, 0)) ||
            			        ((object.structureType == STRUCTURE_RAMPART || object.structureType == STRUCTURE_CONTAINER ) && object.hits < (object.hitsMax) && creep.pos.inRangeTo(object, 1)) );
            		   }
            		});
                if (repairSite){
                    creep.repair(repairSite)
                    if (repairSite.structureType == STRUCTURE_CONTAINER || repairSite.structureType == STRUCTURE_ROAD) {
                        return(0)
                    }
                }
            }

            if(!targetFlag.room || creep.room.name != targetFlag.room.name) {
                creep.moveTo(targetFlag, {visualizePathStyle: {stroke: '#00ffff'}, reusePath: 30})
            } else {
                var containerSite = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) && structure.store.energy < structure.storeCapacity) || ((structure.structureType == STRUCTURE_LINK || structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity);
//                        return (structure.structureType == STRUCTURE_EXTENSION ||  structure.structureType == STRUCTURE_SPAWN|| structure.structureType == STRUCTURE_TOWER || structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_CONTAINER ) && structure.energy < structure.energyCapacity;
                    }
                });
                if (containerSite){
        		    if(creep.transfer(containerSite, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(containerSite, {visualizePathStyle: {stroke: '#00ffff'}});
                    }
                }
            }
        }

	}
};

module.exports = roleUpgraderRemote;
