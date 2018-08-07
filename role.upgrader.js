var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

//		console.log(JSON.stringify(containerSite.store.energy))
         if(creep.carry.energy == 0) {
    		var containerSite = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    		filter: function(object){
    			return (object.structureType === STRUCTURE_CONTAINER && object.store.energy > 0 );
    		   }
    		});
//            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
//                creep.moveTo(source, {visualizePathStyle: {stroke: '#00ffff'}});
            if(creep.withdraw(containerSite, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(containerSite);
//                                creep.moveTo(32,7);
            }
        } else {
            var source = creep.pos.findClosestByRange(FIND_SOURCES)
//            console.log(creep.harvest(source) == OK)
            if(creep.carry.energy == creep.carryCapacity || creep.harvest(source) != OK) {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#00ffff'}});
                }
            }
        }


	}
};

module.exports = roleUpgrader;
