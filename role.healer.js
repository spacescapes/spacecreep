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

        var maxDistance = 40
        let viaFlags = Object.keys(Game.flags).filter((f) => f.startsWith('via')).sort()
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


        if (!creep.memory.viaPassed) creep.memory.viaPassed = {}

        if (creep.memory.fromVia) {
            for (viaFlagIndex in viaFlags){
                let viaFlagname = viaFlags[viaFlagIndex]
                if (viaFlagname == creep.memory.fromVia) break
                creep.memory.viaPassed[viaFlagname] = true
            }
        }

        for (viaFlagIndex in viaFlags){
                let viaFlagname = viaFlags[viaFlagIndex]
                let viaFlag = Game.flags[viaFlagname]
//                console.log(JSON.stringify(viaFlagname)+ " " + creep.pos.getRangeTo(viaFlag) + " " + creep.pos.getRangeTo(targetFlag) + " " + creep.memory.viaPassed[viaFlagname])
                if (!creep.memory.viaPassed[viaFlagname]){
//                    console.log("not yet passed " + viaFlagname)
                    if (viaFlag.room && viaFlag.room.name == creep.room.name) {
                        if (creep.room.controller && creep.room.controller.owner && creep.room.controller.owner.username == 'helmut'){
                            if (creep.ticksToLive < 1230){
                                var spawn = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => structure.structureType == STRUCTURE_SPAWN})
                                if (creep.pos.inRangeTo(spawn, 1)){
                                    creep.moveTo(1,1)
                                    return (0)
                                } else {
                                    creep.moveTo(spawn)
                                    return (0)
                                }
                            } else {
                                if (creep.pos.inRangeTo(viaFlag, 1)){
                                    creep.memory.viaPassed[viaFlagname] = true
//                                    console.log(creep.name + " via " + viaFlagname + " passed!")
                                } else {
                                    creep.moveTo(viaFlag, {visualizePathStyle: {stroke: '#00ffff'}, reusePath: 20})
                                    return (0)
                                }
                            }
                        } else {
                            if (creep.pos.inRangeTo(viaFlag, 1)){
                                creep.memory.viaPassed[viaFlagname] = true
//                                console.log(creep.name + " via " + viaFlagname + " passed!")
                            } else {
                                creep.moveTo(viaFlag, {visualizePathStyle: {stroke: '#00ffff'}, reusePath: 20})
                                return (0)
                            }
                        }
                    } else {
                        if (creep.pos.inRangeTo(viaFlag, 1)){
                            creep.memory.viaPassed[viaFlagname] = true
//                                console.log(creep.name + " via " + viaFlagname + " passed!")
                        } else {
                            creep.moveTo(viaFlag, {visualizePathStyle: {stroke: '#00ffff'}, reusePath: 20})
                            return (0)
                        }
                    }
                }
        }




        var targetFlag
        if (creep.memory.sf) targetFlag = Game.flags[creep.memory.sf]
        if (!targetFlag) targetFlag = Game.flags.Healer1
        if (!targetFlag) targetFlag = Game.flags.A1

        var safeFlag
        if (creep.memory.sf && Game.flags[creep.memory.sf+"Safe"] && !creep.pos.inRangeTo(Game.flags[creep.memory.sf+"Safe"],1))
            {safeFlag = Game.flags[creep.memory.sf+"Safe"];
                if (creep.hits < (creep.hitsMax*0.7)) {
                    creep.heal(creep)
                    creep.moveTo(safeFlag);
                    creep.memory.flee = true
                    targetFlag = safeFlag
//                    return(0)
                } else if (creep.hits < creep.hitsMax){
                    creep.heal(creep)
//                    targetFlag = safeFlag
                }

            }



        var enemy = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
    		filter: function(object){
    			return (object.hits < object.hitsMax);
    		   }
		})
        if (enemy){
            enemy.memory.healedBy = creep.id
        }
        if (creep.memory.follow){
            if (!enemy || (Game.creeps[creep.memory.follow] && (enemy && Game.creeps[creep.memory.follow].hits < Game.creeps[creep.memory.follow].hitsMax ))) {
                enemy = Game.creeps[creep.memory.follow]
            }

            if (enemy && !enemy.memory.followedBy) enemy.memory.followedBy = {}
            if (enemy) enemy.memory.followedBy[creep.name] = true
        }

        if (enemy){
            if(creep.heal(enemy) == ERR_NOT_IN_RANGE) {
                creep.moveTo(enemy, {visualizePathStyle: {stroke: '#00ffff'}});
            }
        } else {
            creep.say("HHH")
            if(!creep.pos.inRangeTo(targetFlag,4)) creep.moveTo(targetFlag, {visualizePathStyle: {stroke: '#00ffff'}})
        }
        if(!creep.pos.inRangeTo(targetFlag,maxDistance)) creep.moveTo(targetFlag, {visualizePathStyle: {stroke: '#00ffff'}})

        if (creep.hits == creep.hitsMax){
//                creep.moveTo(Game.flags.A3, {visualizePathStyle: {stroke: '#00ffff'}}); return (0)
        } else {
//                creep.moveTo(Game.flags.A1, {visualizePathStyle: {stroke: '#00ffff'}, reusePath: 1}); return (0)
        }

}


module.exports = o;
