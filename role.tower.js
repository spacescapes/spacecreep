var roleTower = {

    /** @param {Creep} creep **/
    run: function(tower) {
//if (tower.room.name=='W55S41') {return(0)}

        const healTargets = tower.room.find(FIND_MY_CREEPS,{filter: function(creep){return creep.hits<(creep.hitsMax)} });

     if(healTargets.length > 0) {
         tower.heal(healTargets[0])
         return(0)

     }
//            tower.room.memory.repair=true
        var targets = tower.room.find(FIND_HOSTILE_CREEPS,{filter: function(creep){return (!(creep.owner.username == 'iceburg') && !creep.name.startsWith('siege') )} });
//         targets = tower.room.find(FIND_STRUCTURES,{filter: function(creep){return creep.id == '5bd8939bd059f7206dd54772'} });
        if(targets.length > 0) {
            var attackResult = tower.attack(targets[0]);

            console.log("Attack: ", attackResult, targets[0], " ",  JSON.stringify(tower.owner))
        } else if(tower.room.memory.repair){
    		var repairSite = tower.pos.findClosestByRange(FIND_STRUCTURES, {
    		filter: function(object){
    			return ((object.structureType === STRUCTURE_ROAD || object.structureType == STRUCTURE_TOWER ) && (object.hits < (object.hitsMax-1000)) || ((object.structureType === STRUCTURE_CONTAINER) && (object.hits < (object.hitsMax-10000))) || ( object.structureType == STRUCTURE_RAMPART) && (object.hits < (100000))  || ( object.structureType == STRUCTURE_WALL) && (object.hits < (5900)));
    		   }
    		})


            if (repairSite) {
                tower.repair(repairSite)
            } else {
                tower.room.memory.repair = false
            }
    	}

	}
};

module.exports = roleTower;
