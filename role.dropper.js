var roleDropper = {

    /** @param {Creep} creep **/
    run: function(creep) {




        if ((creep.hits < creep.hitsMax-200) && Game.rooms[creep.memory.spawnRoomName]) {
            creep.say("flee")
            creep.moveTo(Game.rooms[creep.memory.spawnRoomName].controller)
            return (0)
        }
  if (creep.room.name == 'W47N45' && creep.pos.x <= 13 ){
//  creep.moveTo(24,37)
//    return(0)
  }
        var mineral = creep.memory.mineral?creep.memory.mineral:false
//    creep.say(mineral)

        var flag = Game.flags[creep.memory.sf]
        if (!creep.memory.sf){
            flag = Game.getObjectById(creep.memory.sId)
            if (!flag){
                flag = new RoomPosition(25, 20, creep.memory.room)
            }

        }
        if (!flag){
            creep.say("Panik")
            return(0)
        }
        if(!creep.pos.inRangeTo(flag,2)) {

             creep.say("inrange")
            creep.moveTo(flag, {visualizePathStyle: {stroke: '#00ffff'}})
            if (creep.room.controller && !creep.room.controller.my){
                creep.room.createConstructionSite(creep.pos.x,creep.pos.y, STRUCTURE_ROAD)
            }
        } else  {
            let source
            if (mineral){
                source = creep.pos.findClosestByRange(FIND_MINERALS)
            } else {
                source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE)
            }

            var harvestResult = creep.harvest(source)

            if(harvestResult == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#00ffff'}});
            }
            if(creep.carry[RESOURCE_ENERGY] >= 30 ){
            	var buildSite = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES,3);
                if (buildSite){
                    creep.build(buildSite)
//                    if (creep.build(buildSite) == ERR_NOT_IN_RANGE) creep.moveTo(buildSite)
                }
            }
//            creep.drop(RESOURCE_ENERGY)
            if(creep.carry[RESOURCE_ENERGY] >= 10){

                if(creep.carry[RESOURCE_ENERGY] > (creep.carryCapacity-creep.getActiveBodyparts(WORK)*2)){

                    var containerSite = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            		        filter: function(object){
            			    return  (object.structureType === STRUCTURE_LINK && object.energy < 800 ) || (object.structureType === STRUCTURE_CONTAINER && object.store.energy < object.storeCapacity );
            		        }
            		    })


                    if (containerSite && creep.pos.getRangeTo(containerSite) < 3){

                        if ((containerSite.hits < containerSite.hitsMax) && creep.pos.inRangeTo(containerSite,5)){
                            creep.repair(containerSite)
                        } else {
//creep.say("store")
                            if(creep.transfer(containerSite, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            		            creep.moveTo(containerSite, {visualizePathStyle: {stroke: '#00ffff'}});
                            }
                        }
                    } else {
                        var buildSites = creep.pos.findInRange(FIND_CONSTRUCTION_SITES,3)
                        if (buildSites.length == 0 && creep.pos.findInRange(FIND_STRUCTURES,3, {filter: function(a){return (a.structureType == STRUCTURE_CONTAINER || a.structureType == STRUCTURE_LINK)}}).length==0){
                            creep.say("construct")
//                            console.log("construct", creep.name)
                            creep.room.createConstructionSite(creep.pos, STRUCTURE_CONTAINER)

                        } else {
                            var containerSite = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            		            filter: function(object){
            			         return  (object.structureType === STRUCTURE_CONTAINER && object.hits < object.hitsMax );
            		            }
            		         })
            		         if (containerSite){
            		             creep.repair(containerSite)
            		         } else {
    //                            creep.repair(creep.pos.findInRange(FIND_STRUCTURES,3, {filter: function(a){return (a.structureType == STRUCTURE_CONTAINER)}})[0])
                                creep.say("drop")
    //                            console.log("drop", creep.name)
                                creep.drop(RESOURCE_ENERGY,5)
            		         }

                        }

                    }
                }
            } else if(_.sum(creep.carry) >= 10){
                for(var r in creep.carry){
                 creep.say(creep.transfer(creep.room.storage, r))
                }
            }

      }

    }
};

module.exports = roleDropper;
