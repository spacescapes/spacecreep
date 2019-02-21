var roleContainerDistributor = {

    /** @param {Creep} creep **/
    run: function(creep) {

		var containerSites = creep.room.find(FIND_STRUCTURES, {
		filter: function(object){

			return (object.structureType == STRUCTURE_CONTAINER  /*|| object.structureType === STRUCTURE_STORAGE */ /*&& object.store.energy < object.storeCapacity */);
		   }
		});

         if(creep.carry.energy == 0) {
    		var containerSiteMax = _.max((_.filter(containerSites, ((a) => a.store.energy > 0))), ((a) => (a.store.energy - (creep.pos.getRangeTo(a)*2))));
            if(creep.withdraw(containerSiteMax, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containerSiteMax, {visualizePathStyle: {stroke: '#ffd0ff'}});
                }

        } else {

            if(!creep.memory.containerSiteMinId){
                creep.memory.containerSiteMinId = _.min((_.filter(containerSites, ((a) => a.store.energy < 1700))), ((a) => (a.store.energy - (creep.pos.getRangeTo(a)*2)))).id;
            }

            var containerSiteMin = Game.getObjectById(creep.memory.containerSiteMinId)

            if (!containerSiteMin)    {
                containerSiteMin =  creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
            		filter: function(object){
            			return (object.structureType === STRUCTURE_STORAGE );
            		   }
            		});
            }

            var storage =  creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
        		filter: function(object){
        			return (object.structureType === STRUCTURE_STORAGE && object.store.energy < 100000);
        		   }
        		});
            if (storage) containerSiteMin = storage

            if(creep.transfer(containerSiteMin, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(containerSiteMin, {visualizePathStyle: {stroke: '#00ffff'}});
            } else {
                creep.memory.containerSiteMinId = undefined
            }

        }
//if(!creep.pos.inRangeTo(Game.flags.A1,20)) creep.moveTo(Game.flags.A1, {visualizePathStyle: {stroke: '#00ffff'}})

	}
};

module.exports = roleContainerDistributor;
