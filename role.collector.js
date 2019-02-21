var roleCollector = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.carry.energy < creep.carryCapacity*0.5){
            if (creep.memory.source && !Game.getObjectById(creep.memory.source.id)) {
                creep.memory.source = null
            }
            if (!creep.memory.source){
                var energy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {filter: (object) => object.amount >= 50 && object.resourceType==RESOURCE_ENERGY});
                var containerSite = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            		filter: function(object){
            			return (object.structureType === STRUCTURE_CONTAINER  && object.store.energy > 1600 );
            		   }
        		});
        		if (energy && ( !containerSite || containerSite.store.energy < 1950 )) {
                    creep.memory.source = {type: 'energy', id: energy.id}
                } else if (containerSite){
                    creep.memory.source = {type: 'container', id: containerSite.id}
                }
            }

            if (creep.memory.source){
                if (creep.memory.source.type=='energy'){
                    if (creep.pickup(Game.getObjectById(creep.memory.source.id)) == ERR_NOT_IN_RANGE) creep.moveTo(Game.getObjectById(creep.memory.source.id), {visualizePathStyle: {stroke: '#ffd0ff'}})
                } else if (creep.memory.source.type=='container'){
                    if(creep.withdraw(Game.getObjectById(creep.memory.source.id), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.getObjectById(creep.memory.source.id), {visualizePathStyle: {stroke: '#ffd0ff'}});
                    }
                }
            } else {
                var spawn = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => structure.structureType == STRUCTURE_SPAWN})
                if (spawn) creep.moveTo(spawn)
            }
        } else {
            creep.memory.source = null
            var storage =  creep.pos.findClosestByRange(FIND_STRUCTURES, {
        		filter: function(object){
        			return (object.structureType === STRUCTURE_STORAGE);
        		   }
        		});
        		var containerSiteMin
            if (storage) containerSiteMin = storage
            if (!containerSiteMin) {
                containerSiteMin = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        		filter: function(object){
        			return (object.structureType === STRUCTURE_CONTAINER && object.store[RESOURCE_ENERGY] < 1600);
        		   }
        		});
            }
            if (containerSiteMin){
                if(creep.transfer(containerSiteMin, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containerSiteMin, {visualizePathStyle: {stroke: '#00ffff'}});
                } else {
                    creep.memory.containerSiteMinId = undefined
                }
            }
        }

	}
};

module.exports = roleCollector;
