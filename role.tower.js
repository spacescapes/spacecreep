var roleTower = {

    /** @param {Creep} creep **/
    run: function(towerId) {

//            Memory.repair=true
        const targets = Game.getObjectById(towerId).room.find(FIND_HOSTILE_CREEPS);
        if(targets.length > 0) {
            var attackResult = Game.getObjectById(towerId).attack(targets[0]);
            console.log("Attack: ", attackResult)
        } else if(Memory.repair){
    		var repairSite = Game.getObjectById(towerId).pos.findClosestByPath(FIND_STRUCTURES, {
    		filter: function(object){
    			return ((object.structureType === STRUCTURE_ROAD || object.structureType === STRUCTURE_CONTAINER || object.structureType == STRUCTURE_TOWER ) && (object.hits < (object.hitsMax-200)) || ( object.structureType == STRUCTURE_RAMPART) && (object.hits < (35000))  || ( object.structureType == STRUCTURE_WALL) && (object.hits < (7000)));
    		   }
    		})
            if (!repairSite) Memory.repair = false
    	} else {
    		var repairSite = Game.getObjectById(towerId).pos.findClosestByPath(FIND_STRUCTURES, {
    		filter: function(object){
    			return ((object.structureType === STRUCTURE_ROAD || object.structureType === STRUCTURE_CONTAINER || object.structureType == STRUCTURE_TOWER ) && (object.hits < (object.hitsMax-500)) || (object.structureType == STRUCTURE_WALL || object.structureType == STRUCTURE_RAMPART) && (object.hits < (7000)));
    		   }
    		});
            if (repairSite) Memory.repair = true
    	}

//    console.log("repair: ", Memory.repair)

    Game.getObjectById(towerId).repair(repairSite)


	}
};

module.exports = roleTower;
