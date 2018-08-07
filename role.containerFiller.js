var roleContainerFiller = {

    /** @param {Creep} creep **/
    run: function(creep) {

        //Memory.nextSourceIndex = ( Memory.nextSourceIndex + 1 ) % 2

        if(creep.name=='ContainerFiller8120659'){ creep.room.memory.nextSourceIndex=1; creep.memory.sourceId = creep.room.find(FIND_SOURCES)[Memory.nextSourceIndex].id;}



        var containerSite = creep.pos.findClosestByPath(FIND_STRUCTURES, {
		        filter: function(object){
			    return (object.structureType === STRUCTURE_CONTAINER /*&& object.store.energy < object.storeCapacity */);
		        }
		    })
        if (!creep.memory.sourceId){
            creep.memory.sourceId = creep.room.find(FIND_SOURCES)[Memory.nextSourceIndex].id;
            Memory.nextSourceIndex = ( Memory.nextSourceIndex + 1 ) % 2
        }
    	var source = Game.getObjectById(creep.memory.sourceId)

         if(creep.carry.energy == 0) {
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        } else {
            if(creep.carry.energy >= 48 || creep.harvest(source) != OK) {
                if (containerSite){
                    if(creep.transfer(containerSite, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(containerSite, {visualizePathStyle: {stroke: '#00ffff'}});
                    }
                    if (containerSite.hits < containerSite.hitsMax){
                        creep.repair(containerSite)
                    }
                }
            }
        }

	}
};

module.exports = roleContainerFiller;
