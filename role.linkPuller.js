var roleLinkPuller = {

    /** @param {Creep} creep **/
    run: function(creep) {
    creep.say("pull")
		var containerSite = creep.pos.findClosestByPath(FIND_STRUCTURES, {
		filter: function(object){
			return ((/* object.structureType === STRUCTURE_CONTAINER || */ object.structureType === STRUCTURE_STORAGE )&& object.store.energy < object.storeCapacity);
		   }
		});

        var source = creep.pos.findClosestByRange(FIND_SOURCES)
        var link = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        		filter: function(object){
        			return (object.structureType == STRUCTURE_LINK );
        		   }
        		});

//        console.log(creep.memory.role, "link ", link.id, " ", link.energy + " mem " + link.memory )

        if (creep.carry.energy < creep.carryCapacity){
            if (link && link.energy >= 0){
                if (creep.withdraw(link,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(link, {visualizePathStyle: {stroke: '#00ffff'}})
                }
            }
        } else {
            if(creep.transfer(containerSite, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(containerSite, {visualizePathStyle: {stroke: '#00ffff'}})
            }
        }
    }
};

module.exports = roleLinkPuller;
