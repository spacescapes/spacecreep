var meta = require("role.meta")

var o = Object.create(meta);

o.run = function(creep) {


if (creep.memory.boost){

    creep.say("boost" + this.boost(creep))
    if (this.boost(creep)){
        return(0)
    }
}
//if (creep.room.name == "W42N35") {return(0); console.log("!!!!!!!!!!hello " + creep.name )}

//        return(0)
if (creep.room.name == 'W48N54x' && creep.ticksToLive > 1000 && (!creep.body.some((a)=>(a.boost))) && Game.getObjectById('5c14300f0bb15c5410d31755').mineralAmount > 100){
    creep.moveTo(Game.flags.L6)
//    creep.moveTo(Game.spawns.Spawn7)
    Game.getObjectById('5c14300f0bb15c5410d31755').boostCreep(creep)
    return(0)
}
       if (creep.room.name == 'W41N44' && creep.pos.x <= 1 ){
        creep.move(BOTTOM_RIGHT)
        return(0)
        }
  if (creep.room.name == 'W45N43' && creep.pos.x <= 5 ){
//    creep.moveTo(11,36)
//return(0)
  }
//return(0)
/*
        if (Game.flags['Dismantle1'] && Game.flags['Dismantle1'].room.name == creep.room.name){
            creep.say('dismantle')
            if (!creep.pos.inRangeTo(Game.flags['Dismantle1'],1)){
                creep.moveTo(Game.flags['Dismantle1'])
            } else {
                var dismantleSite = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            		filter: function(object){
            			return (object.structureType == STRUCTURE_WALL );
        		   }
        		});
        		creep.dismantle(dismantleSite);
        		creep.drop(RESOURCE_ENERGY)
            }
            return(0);
        }
*/

    var buildSite = creep.pos.findInRange(FIND_CONSTRUCTION_SITES,0);
    if (buildSite.length > 0){
        creep.build(buildSite[0])
//                    if (creep.build(buildSite) == ERR_NOT_IN_RANGE) creep.moveTo(buildSite)
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


    if(creep.carry.energy == 0 || creep.memory.state=='') {
        creep.memory.state='Load'
    } else if(creep.carry.energy == creep.carryCapacity) {
        creep.memory.state='Upgrade'
    }



//		console.log(JSON.stringify(containerSite.store.energy))
     if(creep.memory.state=='Load') {
            var energy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {filter: function(object){return object.room.name == creep.room.name && object.resourceType==RESOURCE_ENERGY && object.amount >= 30}});
            if (energy && creep.pos.getRangeTo(energy) <= 2){
                creep.say("U energy")
                if (creep.pickup(energy) == ERR_NOT_IN_RANGE) { creep.moveTo(energy)}
                return(0)}
        var containerSite
		var linkSites = creep.pos.findInRange(FIND_STRUCTURES, 3, {
		filter: function(object){
			return ((object.structureType === STRUCTURE_LINK  ) && (object.energy > 0 ));
		   }
		});
//    		creep.say(linkSites.length)
		if (linkSites.length > 0){
		    containerSite = linkSites[0]
		}
		if (!containerSite) {
//    		containerSite = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
    		containerSite = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    		filter: function(object){
    			return ((object.structureType == STRUCTURE_EXTENSION && object.energy > 0 ) ||  ( object.structureType === STRUCTURE_CONTAINER && object.store.energy > 100) || ( object.structureType === STRUCTURE_TOWER && object.energy > 0) ||  ( object.structureType === STRUCTURE_TERMINAL && object.store.energy > 100) ||  ( object.structureType === STRUCTURE_STORAGE && object.store.energy > 1000) ||  ( object.structureType === STRUCTURE_LINK && object.energy > 0) ||  ( object.structureType === STRUCTURE_SPAWN && object.energy > 0) ||  ( object.structureType === STRUCTURE_POWER_SPAWN && object.energy > 0) || ( object.structureType === STRUCTURE_LAB && object.energy > 0) );
//    			return ((object.structureType == STRUCTURE_EXTENSION && object.energy > 5 ) ||  ( object.structureType === STRUCTURE_TOWER && object.energy > 10) );
    		   }
    		});
		}
        if (!containerSite) {
            containerSite = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    		filter: function(object){
    			return ((object.structureType === STRUCTURE_CONTAINER || object.structureType === STRUCTURE_STORAGE ) && object.store.energy > 0 ) || ((object.structureType === STRUCTURE_LINK  ) && object.energy > 0 );
    		   }
    		});
        }

        if (containerSite){
            if(creep.withdraw(containerSite, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(containerSite);
            }
        } else {
            var source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE)
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#00ffff'}});
            }
        }
    } else if(creep.memory.state=='Upgrade') {
            creep.say(creep.upgradeController(creep.room.controller))
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#00ffff'}});
        }
    } else {
	    creep.memory.state = 'Load'
	}


	}

module.exports = o;
