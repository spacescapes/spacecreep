var roleDropper = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var flag = Game.flags[creep.memory.sourceflagName]
//      console.log(creep.name, " flag: ", flag)
        if(!creep.pos.inRangeTo(flag,2)) {
            creep.moveTo(flag, {visualizePathStyle: {stroke: '#00ffff'}, reusePath: 30})
        } else {
            var source = creep.pos.findClosestByRange(FIND_SOURCES)
/*            if (!creep.pos.inRangeTo(source, 2)){
                source = creep.pos.findClosestByRange(FIND_MINERALS)
            }
*/
            var harvestResult = creep.harvest(source)

//            console.log("HARVEST", harvestResult, " of source: ", source)
            if(harvestResult == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#00ffff'}});
            }
            if(creep.carry.energy >= 40 ){
            	var buildSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES,2);
                if (buildSite){
                    creep.build(buildSite)
//                    if (creep.build(buildSite) == ERR_NOT_IN_RANGE) creep.moveTo(buildSite)
                }
            }
            if(creep.carry.energy == creep.carryCapacity){
                var containerSite = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        		        filter: function(object){
        			    return (object.structureType === STRUCTURE_CONTAINER /*&& object.store.energy < object.storeCapacity */);
        		        }
        		    })

                if (containerSite){
                    if (containerSite.hits < containerSite.hitsMax){
                        creep.repair(containerSite)
                    }
                    if(creep.transfer(containerSite, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(containerSite, {visualizePathStyle: {stroke: '#00ffff'}});
                    }
                } else {
                    creep.drop(RESOURCE_ENERGY)
                }
            }

      }

    }
};

module.exports = roleDropper;
