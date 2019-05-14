/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.meta');
 * mod.thing == 'a thing'; // true
 */

module.exports = {


    follow: function (creep){

        if (creep.memory.follower){
            var follower = Game.creeps[creep.memory.follower]
    //        if (!creep.pos.inRangeTo(master)){
              if (creep.fatigue == 0 && (Game.time % 3 == 0) && follower &&  follower.room.name == creep.room.name && !creep.pos.inRangeTo(follower,2)){
                creep.moveTo(follower)
                return(true)
            }

        }
        if (creep.memory.follow){
            var master = Game.creeps[creep.memory.follow]
            if (master && /*master.room.name == creep.room.name && */ !creep.pos.inRangeTo(master,1)){
                if ((creep.hits < (creep.hitsMax*0.4)) || ((creep.hits < creep.hitsMax) && (Game.time % 4 <= 2) && creep.getActiveBodyparts(HEAL) >=1 )) {
                        creep.heal(creep)
                    }
                creep.moveTo(master)
    //            creep.moveByPath(master.memory._move)
                return(true)
            }
        }
        return(false)
    },

    boost: function (creep){

        if (!creep.memory.boost) {
            return (false)
        }

        var bodyparts =  (creep.body.filter((b) => (!b.boost )))
        for (var bodypart of bodyparts){

            var lab = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        		filter: function(object){
            			return (
            			    (bodypart.type == ATTACK && object.structureType==STRUCTURE_LAB && (new Array(RESOURCE_CATALYZED_UTRIUM_ACID).includes(object.mineralType)) ) ||
            			    (bodypart.type == MOVE && object.structureType==STRUCTURE_LAB && (new Array(RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE).includes(object.mineralType)) ) ||
            			    (bodypart.type == HEAL && object.structureType==STRUCTURE_LAB && (new Array(RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE).includes(object.mineralType)) ) ||
            			    (bodypart.type == TOUGH && object.structureType==STRUCTURE_LAB && (new Array(RESOURCE_CATALYZED_GHODIUM_ALKALIDE).includes(object.mineralType)) ) ||
            			    (bodypart.type == WORK && object.structureType==STRUCTURE_LAB && (new Array(RESOURCE_CATALYZED_GHODIUM_ACID).includes(object.mineralType)) )
            			    );

//        			console.log("ZZZZZZZZZZZZZZZZZZZZZZ" + ( (bodypart.type == MOVE) && (object.structureType==STRUCTURE_LAB && object.mineralType == RESOURCE_CATALYZED_UTRIUM_ACID )))
//        			return
//        			    (true )
//        			    ||
//        			    (bodypart.type == ATTACK && (object.structureType==STRUCTURE_LAB && (new Array(RESOURCE_CATALYZED_UTRIUM_ACID).includes(object.mineralType)  )) ) ||
//        			    (bodypart.type == MOVE && (object.structureType==STRUCTURE_LAB && (new Array(RESOURCE_CATALYZED_UTRIUM_ACID).includes(object.mineralType)  )) ) ;
        		   }
        		});
        		console.log(lab)
//            return (lab)

    		if (lab){
    		    if (!creep.pos.isNearTo(lab)){
    		        creep.moveTo(lab)
    		    }
    		    lab.boostCreep(creep)
                return("lab"+bodypart.type)
    		}
        }
        creep.memory.boost = false
        return(false)
    },

    moveAndWithdraw: function (creep, flag, rescode){
                    if (!flag){return(0)}
        if (creep.pos.inRangeTo(flag, 1)){
            var sites = flag.pos.lookFor(LOOK_STRUCTURES).filter((s)=>(s.structureType==STRUCTURE_CONTAINER || s.structureType==STRUCTURE_STORAGE || s.structureType==STRUCTURE_LINK || s.structureType==STRUCTURE_TERMINAL || s.structureType==STRUCTURE_SPAWN))
            if (sites.length > 0){
                var site = sites[0]
//                creep.say("this"+creep.withdraw(site,  rescode))
//                console.log("FOUND: ", site, "    ", (site.structureType))
//                if (site.structureType == 'terminal') {console.log("yeah")}
                if(creep.withdraw(site,  rescode) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(site, {visualizePathStyle: {stroke: '#ffd0ff'}});
                }

            }

        } else {
            creep.moveTo(flag)
        }
    },

    moveAndTransfer: function (creep, flag, rescode){

        if (creep.pos.inRangeTo(flag,1)){

            var sites = flag.pos.lookFor(LOOK_STRUCTURES).filter((s)=>(s.structureType==STRUCTURE_CONTAINER || s.structureType==STRUCTURE_STORAGE || s.structureType == STRUCTURE_LINK || s.structureType == STRUCTURE_TERMINAL || s.structureType == STRUCTURE_LAB))

            if (sites.length > 0){
                var site = sites[0]
//                console.log("FOUND: ", site, "    ", (site.structureType), " transfer: ", (creep.transfer(site,  rescode)))
//                if (site.structureType == 'terminal') {console.log("yeah")}

                if(creep.transfer(site,  rescode) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(site, {visualizePathStyle: {stroke: '#ffd0ff'}});
                }
            }

        } else {
            creep.moveTo(flag)
        }
    }
};