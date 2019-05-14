var meta = require("role.meta")

var o = Object.create(meta);

o.run = function(creep) {

    if (this.boost(creep)){
        creep.say("boost" + this.boost(creep))
        return(0)
    }

    if (this.follow(creep)){
        creep.say("follow" + this.boost(creep))
        return(0)
    }


    if (creep.memory.healOthers){
        var enemy = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
    		filter: function(object){
    			return (object.hits < object.hitsMax);
    		   }
		})
        if (enemy){
            creep.moveTo(enemy)
            creep.heal(enemy)
            return(0)
        }


    }

//creep.moveTo(Game.flags.A1)
/*
if (creep.room.name == "W44N42" || creep.room.name == "W43N42") {
    creep.moveTo(49,32)
    return(0)

}

if (creep.room.name == "W42N33") {
    creep.moveTo(16, 49)
    return(0)

}
if (creep.room.name == "W42N41") {
    creep.moveTo(49,23)
    return(0)

}
if (creep.room.name == "W41N41" || creep.room.name == "W40N40" || creep.room.name == "W40N39" || creep.room.name == "W40N38" || creep.room.name == "W40N37" ) {
    creep.moveTo(21,49)
    return(0)

}
if (creep.room.name == "W41N40") {
    creep.moveTo(49,37)
    return(0)

}

*/
//return(0)
//creep.moveTo(34,20)

//return(0)

    if (creep.memory.follower){
        var follower = Game.creeps[creep.memory.follower]
//        if (!creep.pos.inRangeTo(master)){
          if (follower && !creep.pos.inRangeTo(follower,5) && creep.pos.x > 1 && creep.pos.y > 1 && creep.pos.x < 48 && creep.pos.y < 48){
//            creep.moveTo(follower)
//            return(0)
        }

    }

      if (creep.memory.followedBy){
        var followers = Object.keys(creep.memory.followedBy)
        if (followers.length ){
            var follower = Game.creeps[followers[0]]
        }
        follower = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: function(object) {
            return object.memory.follow==creep.name;
        }
        });

//        if (!creep.pos.inRangeTo(master)){
          if (follower && !creep.pos.inRangeTo(follower,1) && creep.pos.x > 1 && creep.pos.y > 1 && creep.pos.x < 48 && creep.pos.y < 48){
            creep.moveTo(follower)

            creep.say(follower.name)

        }
        creep.memory.followedBy = undefined

    }
    var ar = 10
    if (creep.memory.ar) {ar = creep.memory.ar}
    var targetFlag

        if (creep.ticksToLive < 50 && creep.room && creep.room.controller && creep.room.controller.my)
            {creep.memory.renewing = true}
            else {creep.memory.renewing = false}


        if (creep.memory.sf) targetFlag = Game.flags[creep.memory.sf]
        if (creep.memory.room) {

            if (creep.memory.room == creep.room.name){
                targetFlag = creep.room.controller
            } else {
                targetFlag = new RoomPosition(20, 20, creep.memory.room)
            }
        }


        if ((creep.hits < (creep.hitsMax*0.2)) ) {
            if (creep.getActiveBodyparts(HEAL) >=1 ) {
                creep.heal(creep)
            }
            creep.moveTo(Game.rooms[creep.memory.spawnRoomName])
            return(0)
        }

//creep.suicide()
        if ((creep.hits == creep.hitsMax)) { creep.memory.flee = undefined }

        var safeFlag
        if (creep.memory.sf && Game.flags[creep.memory.sf+"Safe"] && !creep.pos.inRangeTo(Game.flags[creep.memory.sf+"Safe"],1))
            {safeFlag = Game.flags[creep.memory.sf+"Safe"]}

           if (!safeFlag){
               safeFlag = Game.rooms[creep.memory.spawnRoomName].controller
           }
                if (safeFlag && creep.hits < (creep.hitsMax*0.2)) {
                    creep.heal(creep)
                    creep.moveTo(safeFlag);
                    creep.memory.flee = true
                    targetFlag = safeFlag
//                    return(0)
                } else if (creep.hits < creep.hitsMax){
//                    creep.heal(creep)
//                    targetFlag = safeFlag
            }

//creep.memory.flee = undefined
//        creep.say ("flee "+creep.memory.flee);

//creep.say(targetFlag)
    if (!targetFlag) {
        targetFlag = creep.room.controller.pos
    }
//    creep.say(creep.memory.sf)
        if (creep.room && targetFlag.room && creep.room.name == targetFlag.room.name && creep.pos.inRangeTo(targetFlag, ar) && (creep.hits > creep.hitsMax*0.1) && (!creep.memory.flee)) {

    	        var structure = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
            		filter: function(object){
            			return (object.hits > 0) && (object.structureType==STRUCTURE_TOWER) && (object.structureType!=STRUCTURE_POWER_BANK) ;
            		   }
            		});

                var structure2 = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
            		filter: function(object){
            			return (object.hits > 0)  && (object.structureType!=STRUCTURE_STORAGE)  && (object.structureType!=STRUCTURE_TERMINAL) && (object.structureType!=STRUCTURE_LAB) /* && (object.structureType!=STRUCTURE_POWER_BANK) */;
            		   }
            		});
    	        var enemy = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
            		filter: function(object){
            			return (object.owner.username != 'iceburg' && object.owner.username != 'GimmeCookies' && object.id != "5cbdb0d67e3ff8587a3e2a8d"/* && object.getActiveBodyparts(ATTACK) == 0 && object.getActiveBodyparts(HEAL) == 0 */);
            		   }
            		});
//if (creep.name != "5cc6d3bd9298c2068a0cf7af")
//if (!enemy && creep.room.name == "W42N44") enemy = Game.getObjectById("5cc44dd5fbfaca34082b68a5")

//            		enemy = undefined
//")
//    console.log("structure: ", structure)
//     console.log("enemy: ", enemy, " att ", creep.attack(enemy))
    //        		var enemy = Game.rooms['E52S28'].controller
//    if (creep.name == 'A1C' || creep.name == 'A1B') {var enemy = Game.getObjectById('5cb410a1e9517709f1d2715f'); if (!enemy){var enemy = Game.getObjectById('')}}
//enemy = undefined
                var attackResult
                if (enemy && enemy.pos.getRangeTo(targetFlag) <= ar){
                    creep.say("go away!")

                    if (creep.getActiveBodyparts(RANGED_ATTACK) > 0){
                        var rangedAttackResult = creep.rangedAttack(enemy)
                        console.log(creep.name+" Ranged Attack ", rangedAttackResult)
                        if(rangedAttackResult == ERR_NOT_IN_RANGE) {
                            creep.moveTo(enemy, {visualizePathStyle: {stroke: '#00ffff'}});
                        }
                        if ((creep.getActiveBodyparts(ATTACK) == 0) && creep.pos.inRangeTo(enemy, 1)){
                           creep.moveTo(safeFlag)
                        } else {
                            creep.moveTo(enemy)
                        }
                    }
                    attackResult = creep.attack(enemy)
                    if(attackResult == ERR_NOT_IN_RANGE) {
                        creep.moveTo(enemy, {visualizePathStyle: {stroke: '#00ffff'}});
                    }


                } else if (structure){
                    if(creep.rangedAttack(structure) == ERR_NOT_IN_RANGE || creep.attack(structure) == ERR_NOT_IN_RANGE ) {
                        creep.moveTo(structure, {visualizePathStyle: {stroke: '#00ffff'}});
                    }
    //            creep.moveTo(enemy, {visualizePathStyle: {stroke: '#00ffff'}});
                } else if (structure2){
                    if(creep.attack(structure2) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(structure2, {visualizePathStyle: {stroke: '#00ffff'}});
                    }
    //            creep.moveTo(enemy, {visualizePathStyle: {stroke: '#00ffff'}});
                }  else {
                    if(!creep.pos.inRangeTo(targetFlag,1))
                        { creep.moveTo(targetFlag, {visualizePathStyle: {stroke: '#00ffff'}}) }
                     if (targetFlag == creep.room.controller && (Game.time%3 <= 5)) { if (creep.move(TOP)!= OK) if (creep.move(BOTTOM)!= OK) creep.move(LEFT)}

                }
                if (attackResult != OK) {
                    if (creep.getActiveBodyparts(HEAL) >=1 ) {
                        creep.heal(creep)
                    }

                }

        } else {
            creep.moveTo(targetFlag, {visualizePathStyle: {stroke: '#00ffff'}})
        }


    }



module.exports = o;
