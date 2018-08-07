var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

//		containerSite = undefined
        if (creep.carry.energy == 0 ) creep.memory.work = false
        if (creep.carry.energy == creep.carryCapacity ) creep.memory.work = true

        if (!creep.memory.work){


            var droppedResources = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 1);
           if (droppedResources.length > 0){
                creep.pickup(droppedResources[0])
            }

            var containerSite = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        		filter: function(object){
        			return (object.structureType === STRUCTURE_CONTAINER && object.store.energy > 0 );
        		   }
        		});
            if (containerSite){

                if(creep.withdraw(containerSite, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containerSite, {visualizePathStyle: {stroke: '#ffd0ff'}});
                }

            } else {

                var source = creep.pos.findClosestByPath(FIND_SOURCES)
    //            var sources = creep.room.find(FIND_SOURCES)
    //            var source = sources[(creep.memory.myId % 2)]

                if (creep.harvest(source) == ERR_NOT_IN_RANGE){
                    let r = creep.pos.getRangeTo(source);
                    if (creep.name == 'Roadworker7841416') console.log("notinrange r", r)
                    if (r < 4 ){
                        let s = creep.pos.findClosestByPath(FIND_SOURCES);
                        if (s && s.id == source.id){
                             creep.moveTo(source, {visualizePathStyle: {stroke: '#00ffff'}})
                        } else {
                            creep.moveTo(47,12, {visualizePathStyle: {stroke: '#00ffff'}})
                        }
                    } else {
                        creep.moveTo(source, {visualizePathStyle: {stroke: '#00ffff'}})
                    }
                }
            }
        } else {
            var target
            if (creep.room.energyAvailable < creep.room.energyCapacityAvailable){
                target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
                            structure.energy < structure.energyCapacity;
                    }
                });

            }

            if(!target){
                target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_TOWER) &&
                                structure.energy < structure.energyCapacity;
                        }
                    });
            }

            if(target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {creep.moveTo(26,12)}
        }





	}
};

module.exports = roleHarvester;
