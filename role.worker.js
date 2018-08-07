var roleWorker = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.carry.energy == creep.carryCapacity) { creep.memory.sourceId=undefined }
        if (!creep.memory.sourceId){
    		var newSources = creep.room.find(FIND_SOURCES)
            creep.memory.sourceId=newSources[Math.floor(Math.random()*newSources.length)].id
        }

		var containerSite = creep.pos.findClosestByRange(FIND_STRUCTURES, {
		filter: function(object){
			return (object.structureType === STRUCTURE_CONTAINER && object.store.energy > 300 );
		   }
		});
         if(creep.carry.energy == creep.carryCapacity) { creep.memory.useContainer=((containerSite) && (Math.random()<containerSite.store.energy/containerSite.storeCapacity)) }


//            console.log(creep.memory.useContainer)
//console.log(containerSite.store.energy/containerSite.storeCapacity)
//console.log(Math.random()<containerSite.store.energy/containerSite.storeCapacity)
//        console.log("my source: ", creep.memory.sourceId)

//		console.log(JSON.stringify(containerSite.store.energy))
        var source = Game.getObjectById(creep.memory.sourceId)
         if(creep.carry.energy == 0) {
            if (creep.memory.useContainer && containerSite){
                if(creep.withdraw(containerSite, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containerSite, {visualizePathStyle: {stroke: '#ffd0ff'}});
                }

            } else if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffd0ff'}});
//            if(creep.withdraw(containerSite, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
//                creep.moveTo(containerSite);
//                                creep.moveTo(32,7);
            }
        } else {
//            console.log(creep.harvest(source) == OK)
            if(creep.carry.energy == creep.carryCapacity || creep.harvest(source) != OK) {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#00ffff'}});
                }
            }
        }

	}
};

module.exports = roleWorker;
