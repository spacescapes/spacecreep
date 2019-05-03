var roleRoadworker = {
    /** @param {Creep} creep **/
    run: function(creep) {


 if ((creep.hits < creep.hitsMax-1000) && Game.rooms[creep.memory.spawnRoomName]) {
     creep.say("flee")
    creep.moveTo(Game.rooms[creep.memory.spawnRoomName].controller)
    return (0)
    }
       if (creep.room.name == 'W41N44' && creep.pos.x <= 1 ){
        creep.move(BOTTOM_RIGHT)
        return(0)
        }
  if (creep.room.name == 'W47N45' && creep.pos.x <= 13 ){
//  creep.moveTo(24,37)
//    return(0)
  }
    creep.memory.moveToController = Math.max(creep.memory.moveToController - 1, 0);

        if (creep.pos.x <= 1 ){
//            if (creep.move(BOTTOM_RIGHT) != OK) creep.move(BOTTOM)
//            return(0)
        }

    if (creep.memory.room && (!Game.rooms[creep.memory.room] || creep.room.name != Game.rooms[creep.memory.room].name)){
        if (_.sum(creep.carry) == 0){
            if (creep.room.storage && _.sum(creep.room.storage) > 100){
                 if (!creep.pos.inRangeTo(creep.room.storage,1)){
                     creep.moveTo(creep.room.storage)
                 } else {
                     creep.withdraw(creep.room.storage, RESOURCE_ENERGY)
                 }
                 return(0)
            }
        }
// Variante 1
//        var exit = creep.room.findExitTo(creep.memory.room);
//        creep.moveTo(creep.pos.findClosestByRange(exit), {visualizePathStyle: {stroke: '#00ffff'}});
// Variante 2
        creep.moveTo(new RoomPosition(25, 20, creep.memory.room), {reusePath: 10, visualizePathStyle: {stroke: '#00ffff'}});


        return(0)
    }


    if (creep.memory.moveToController || (!creep.memory.room && creep.memory.spawnRoomName && creep.room.name != creep.memory.spawnRoomName)) { creep.memory.moveToController = creep.memory.moveToController-1; creep.moveTo(Game.rooms[creep.memory.spawnRoomName].controller); return(0)}
    if ((!creep.memory.room && creep.memory.spawnRoomName && creep.room.name != creep.memory.spawnRoomName)) {creep.memory.moveToController=10;    }


		var site = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
		filter: function(object){
            return (true)
//          return (false)
//			return ( ( object.structureType == STRUCTURE_RAMPART ||  object.structureType == STRUCTURE_WALL ) );
//			return ( (object.structureType == STRUCTURE_TOWER || object.structureType == STRUCTURE_WALL || object.structureType == STRUCTURE_RAMPART || object.structureType == STRUCTURE_SPAWN) );
		   }
		})

		var baseRepairSite = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
		filter: function(object){
			return  ((object.structureType == STRUCTURE_WALL || object.structureType == STRUCTURE_RAMPART) && (object.hits < (10000-creep.pos.getRangeTo(object)*150)));
		   }
		});

		if (( creep.room.name == "W48N46" || creep.room.name == "W47N44" || creep.room.name == "W43N43" || creep.room.name == "W44N43" || creep.room.name == "W45N43" || creep.room.name == "W42N43" || creep.room.name == "W48N46" ) && !repairSite){
        		var repairSites = creep.room.find(FIND_STRUCTURES, {
        		filter: function(object){
        			return  ((object.structureType == STRUCTURE_WALL || ( object.structureType == STRUCTURE_RAMPART && object.my )) );
        		   }
        		});

                var repairSite = _.min( repairSites, (r) => ( r.hits - 10000 + (r.pos.getRangeTo(creep)*2000)))

		}
		if (!repairSite){
    		var repairSite = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
    		filter: function(object){
    			return ((object.structureType == STRUCTURE_ROAD || object.structureType == STRUCTURE_CONTAINER || object.structureType == STRUCTURE_TOWER  ) && (object.hits < (object.hitsMax-300))) || ((object.structureType == STRUCTURE_WALL || object.structureType == STRUCTURE_RAMPART) && (object.hits < (30000)));
    		   }
    		});
		}
		if (!repairSite){
    		var repairSite = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
    		filter: function(object){
    			return  ((object.structureType == STRUCTURE_WALL || object.structureType == STRUCTURE_RAMPART) && (object.hits < (100000)));
    		   }
    		});
		}
		if (!repairSite){
    		var repairSite = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
    		filter: function(object){
    			return  ((object.structureType == STRUCTURE_WALL || object.structureType == STRUCTURE_RAMPART) && (object.hits < (300000)));
    		   }
    		});
		}
		if (!repairSite){
    		var repairSite = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
    		filter: function(object){
    			return  ((object.structureType == STRUCTURE_RAMPART || object.structureType == STRUCTURE_RAMPART) && (object.hits < (2000000)));
    		   }
    		});
		}
		if (!repairSite){
    		var repairSite = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
    		filter: function(object){
    			return  ((object.structureType == STRUCTURE_WALL || object.structureType == STRUCTURE_RAMPART) && (object.hits < (4000000)));
    		   }
    		});
		}




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
		else if (baseRepairSite)
			creep.memory.state = 'Repair'
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
    		var containerFull = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
    		filter: function(object){
    			return (object.structureType == STRUCTURE_EXTENSION && object.energy > 0 );
    		   }

    		});
    		if (!containerFull){
        		containerFull = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
        		filter: function(object){
        			return ((object.structureType == STRUCTURE_EXTENSION && object.energy > 0 ) ||  ( object.structureType === STRUCTURE_CONTAINER && object.store.energy > 100) ||  ( object.structureType === STRUCTURE_TERMINAL && object.store.energy > 100) ||  ( object.structureType === STRUCTURE_STORAGE && object.store.energy > 1000) ||  ( object.structureType === STRUCTURE_LINK && object.energy > 0) ||  ( object.structureType === STRUCTURE_SPAWN && object.energy > 0) ||  ( object.structureType === STRUCTURE_POWER_SPAWN && object.energy > 0) || ( object.structureType === STRUCTURE_LAB && object.energy > 0)  || ( object.structureType === STRUCTURE_TOWER && object.energy > 0) );
    //    			return ((object.structureType == STRUCTURE_EXTENSION && object.energy > 5 ) ||  ( object.structureType === STRUCTURE_TOWER && object.energy > 10) );
        		   }
        		});
    		}
    		if (!containerFull){
        		var containerFull = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        		filter: function(object){
        			return ((object.structureType == STRUCTURE_EXTENSION && object.energy > 500 ) ||  ( object.structureType === STRUCTURE_CONTAINER && object.store.energy > 1000) ||  ( object.structureType === STRUCTURE_STORAGE && object.store.energy > 1000));
    //    			return ((object.structureType == STRUCTURE_EXTENSION && object.energy > 5 ) ||  ( object.structureType === STRUCTURE_TOWER && object.energy > 10) );
        		   }
        		});
    		}
            if (containerFull){
                    if(creep.withdraw(containerFull, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(containerFull, {visualizePathStyle: {stroke: '#00ffff'}});
        		    }
            } else {

                var energies = creep.room.find(FIND_DROPPED_RESOURCES, {filter: function(object){return object.room.name == creep.room.name && object.resourceType==RESOURCE_ENERGY && object.amount >= 50}});
                var energy = energies.reduce((maxEnergy, nextEnergy) => (maxEnergy && maxEnergy.amount > nextEnergy.amount)?maxEnergy:nextEnergy, undefined)
//                energy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
//    energy = undefined
    //            var energy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {filter: function(object){return object.room.name == creep.room.name && object.resourceType==RESOURCE_ENERGY && object.amount >= 50}});
                if (energy && energy.pos.getRangeTo(creep.pos) < 10){
                    if (creep.pickup(energy) == ERR_NOT_IN_RANGE) creep.moveTo(energy,  {visualizePathStyle: {stroke: '#00ffff'}})
                    return(0)
                }

                var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
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

            if (baseRepairSite) repairSite = baseRepairSite
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

    		var containerSite = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    		filter: function(object){
    			return (object.structureType === STRUCTURE_CONTAINER && object.store.energy < object.storeCapacity) || ((object.structureType === STRUCTURE_LINK  ) && object.energy > 0 );
    		   }
    		});
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
