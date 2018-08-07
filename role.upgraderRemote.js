var roleUpgraderRemote = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var sourceFlag = Game.flags[creep.memory.sourceflagName]
        var targetFlag = Game.flags[creep.memory.targetflagName]
         if(creep.carry.energy == 0) {
            if(!creep.pos.inRangeTo(sourceFlag,10)) {
                creep.moveTo(sourceFlag, {visualizePathStyle: {stroke: '#00ffff'}, reusePath: 30})
            } else {
                var energy = creep.pos.findInRange(FIND_DROPPED_RESOURCES,10);
                if (energy.length > 0){
                    if (creep.pickup(energy[0]) != OK) creep.moveTo(energy[0])
                } else {
                    creep.moveTo(sourceFlag, {visualizePathStyle: {stroke: '#00ffff'}, reusePath: 30})
                }
            }
        } else {

            if (creep.getActiveBodyparts(WORK) > 0){
            	var buildSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES,1);
                if (buildSite && creep.pos.inRangeTo(buildSite, 1)){
                    creep.build(buildSite)
                }
            	var repairSite = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            		filter: function(object){
            			return ((object.structureType == STRUCTURE_ROAD ) && (object.hits < (object.hitsMax)));
            		   }
            		});
                if (repairSite && creep.pos.inRangeTo(repairSite, 2)){
                    creep.repair(repairSite)
                }
            }
            if(!creep.pos.inRangeTo(targetFlag,13)) {
                creep.moveTo(targetFlag, {visualizePathStyle: {stroke: '#00ffff'}, reusePath: 30})
            } else {
                target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
                }, 1);
                creep.transfer(target, RESOURCE_ENERGY)
                var containerSite = creep.pos.findClosestByPath(FIND_STRUCTURES, {
	        	filter: function(object){
		        	return (object.structureType === STRUCTURE_CONTAINER && object.store.energy < object.storeCapacity);
		        }
		        });
    		    if(creep.transfer(containerSite, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containerSite, {visualizePathStyle: {stroke: '#00ffff'}});
                }
            }
        }

	}
};

module.exports = roleUpgraderRemote;
