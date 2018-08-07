var roleRoadworker = {
    /** @param {Creep} creep **/
    run: function(creep) {


		var site = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES)
		var repairSite = creep.pos.findClosestByPath(FIND_STRUCTURES, {
		filter: function(object){
//			return (/*object.structureType == STRUCTURE_ROAD ||*/ (object.structureType == STRUCTURE_CONTAINER || object.structureType == STRUCTURE_TOWER  ) && (object.hits < (object.hitsMax-500))/* || (object.structureType == STRUCTURE_WALL|| object.structureType == STRUCTURE_RAMPART) && (object.hits < (1000))*/);
			return ((object.structureType == STRUCTURE_ROAD || object.structureType == STRUCTURE_CONTAINER || object.structureType == STRUCTURE_TOWER  ) && (object.hits < (object.hitsMax-400))) || ((object.structureType == STRUCTURE_WALL|| object.structureType == STRUCTURE_RAMPART) && (object.hits < (100)));
		   }
		});

                         if (creep.name == 'Roadworker8142292') console.log("test", repairSite, " hits ", repairSite.hits )


		var containerSite = creep.pos.findClosestByPath(FIND_STRUCTURES, {
		filter: function(object){
			return (object.structureType === STRUCTURE_CONTAINER && object.store.energy < object.storeCapacity);
		   }
		});
		var containerFull = creep.pos.findClosestByPath(FIND_STRUCTURES, {
		filter: function(object){
			return ((object.structureType == STRUCTURE_EXTENSION && object.energy > 0 ) ||  ( object.structureType === STRUCTURE_CONTAINER && object.store.energy > 0) ||  ( object.structureType === STRUCTURE_STORAGE && object.store.energy > 0));
		   }
		});
//		containerFull=undefined
//	console.log(creep.memory.state)
//console.log(creep.memory.state)
		if (!creep.memory.state)
			creep.memory.state = 'Load'
		creep.memory.lastState = creep.memory.state

		if (creep.carry.energy == 0)
			creep.memory.state = 'Load'
		else if (creep.memory.state == 'Load' && creep.carry.energy < creep.carryCapacity)
			creep.memory.state = 'Load'
		else if (site)
			creep.memory.state = 'Build'
		else if (repairSite)
			creep.memory.state = 'Repair'
		else if (creep.carry.energy == creep.carryCapacity)
			creep.memory.state = 'Park'
		else
			creep.memory.state = 'Load'

            if (creep.name == 'Roadworker8142292') console.log("test", creep.memory.state)

		if (creep.memory.state == 'Load'){

            if (containerFull){
                    if(creep.withdraw(containerFull, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(containerFull, {visualizePathStyle: {stroke: '#00ffff'}});
        		    }
            } else {
                var source = creep.pos.findClosestByPath(FIND_SOURCES);
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                     creep.moveTo(source, {visualizePathStyle: {stroke: '#00ffff'}})
                }
            }

		}
		else if (creep.memory.state == 'Build'){

        if (site)
                if (creep.build(site) == ERR_NOT_IN_RANGE)
                      creep.moveTo(site, {visualizePathStyle: {stroke: '#00ffff'}})
		}
		else if (creep.memory.state == 'Repair'){

            if (creep.repair(repairSite) == ERR_NOT_IN_RANGE)
             creep.moveTo(repairSite, {visualizePathStyle: {stroke: '#00ffff'}})

		}
	    else if (creep.memory.state == 'Park'){
//	        creep.moveTo(25,33)
//            if (creep.transfer(containerSite, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
//                if (creep.transfer(containerSite, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
//                    creep.moveTo(containerSite)
//                }
                creep.moveTo(24,38)
//            }

            if (creep.repair(containerSite) == ERR_NOT_IN_RANGE)
             creep.moveTo(containerSite)
	    }
		//creep.moveTo(49,22)
//       if (creep.memory.state != 'Load' && creep.room.name == 'E53S29') { creep.moveTo(0,23) }

//if(!creep.pos.inRangeTo(Game.flags.A1,25)) creep.moveTo(Game.flags.A1, {visualizePathStyle: {stroke: '#00ffff'}})
/*
if(creep.room.name == "W55S27" && creep.carry.energy == creep.carryCapacity) creep.moveTo(Game.flags.B3, {visualizePathStyle: {stroke: '#00ffff'}})
if(creep.room.name == "W54S27" && creep.carry.energy >= 0) {
    var energy = creep.pos.findInRange(
            FIND_DROPPED_RESOURCES,
            10
        );
        console.log("ENERGY: ", energy)
        if (energy.length > 0){
            if (creep.pickup(energy[0]) != OK) creep.moveTo(energy[0])

        } else {
            creep.moveTo(Game.flags.H1, {visualizePathStyle: {stroke: '#00ffff'}})

        }
}
*/
//creep.moveTo(Game.flags.H1, {visualizePathStyle: {stroke: '#00ffff'}})

        if (Game.flags.R1 && creep.room.name != Game.flags.R1.room.name)  creep.moveTo(Game.flags.R1, {visualizePathStyle: {stroke: '#00ffff'}})


    }


};
module.exports = roleRoadworker;
