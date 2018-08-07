var roleAttacker = {

    /** @param {Creep} creep **/
    run: function(creep) {


        if (creep.name == 'A18' || creep.name=='A22' || creep.name == 'He24'  ){
            creep.memory.sourceflagName = 'A4'
        } else {
            creep.memory.sourceflagName = 'A1'
        }
        if (creep.memory.sourceflagName ) targetFlag = Game.flags[creep.memory.sourceflagName]


        var attackRange = 2

//            console.log("FROOOOM: ", targetFlag.room.name)
        if (targetFlag.room && creep.room.name == targetFlag.room.name && creep.pos.inRangeTo(targetFlag, attackRange) && (creep.hits > creep.hitsMax*0.6)) {
//            console.log("ROOOOOM: ", creep.room.name)
    	        var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            		filter: function(object){
            			return (object.hits > 0) && object.structureType==STRUCTURE_WALL;
            		   }
            		});
    	        var enemy = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
            		filter: function(object){
            			return (object.owner.username != 'badlog' /* || object.getActiveBodyparts(CLAIM) > 0 || object.getActiveBodyparts(WORK) > 0) */);
            		   }
            		});
//    console.log("structure: ", structure)
     console.log("enemy: ", enemy, " att ", creep.attack(enemy))
    //        		var enemy = Game.rooms['E52S28'].controller
    //var enemy = Game.getObjectById('5b4933066b17c216db466747')
                if (enemy){
                    if(creep.attack(enemy) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(enemy, {visualizePathStyle: {stroke: '#00ffff'}});
                    }
                } else if (structure){
                    if(creep.attack(structure) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(structure, {visualizePathStyle: {stroke: '#00ffff'}});
                    }
    //            creep.moveTo(enemy, {visualizePathStyle: {stroke: '#00ffff'}});
                } else {
                    if(!creep.pos.inRangeTo(targetFlag,3)) creep.moveTo(targetFlag, {visualizePathStyle: {stroke: '#00ffff'}})
                }
        } else {
            creep.moveTo(targetFlag, {visualizePathStyle: {stroke: '#00ffff'}})
        }
/*
var targetRoom = "W55S29"
if (creep.hits == creep.hitsMax){
    if (creep.room.name != targetRoom) {
        const exit = creep.pos.findClosestByPath(creep.room.findExitTo(targetRoom));
        creep.moveTo(exit, {visualizePathStyle: {stroke: "#00ffff"}});
    } else {
    }
        creep.moveTo(28,17)
    }
*/
/*} else {
     targetRoom = "W55S2"
    if (creep.room.name != targetRoom) {
        const exitDir = creep.room.findExitTo(targetRoom, ["W55S26"]);
        const exit = creep.pos.findClosestByPath(exitDir);
        creep.moveTo(exit, {visualizePathStyle: {stroke: '#00ffff'}});
    } else {
//        creep.moveTo(10,12)
    }
*/

//if ( creep.name=='Attacker7962583' ) creep.moveTo(49,38)
//if ( creep.name=='Attacker7962793' ) creep.moveTo(49,38)
//if ( creep.name=='Attacker7962673' ) creep.moveTo(49,38)

//if (creep.room.name == targetRoom) { if (creep.hits == creep.hitsMax) creep.moveTo(12,0) }

//creep.moveTo(1,1)

        if (creep.hits == creep.hitsMax){
//            creep.moveTo(Game.flags.A3, {visualizePathStyle: {stroke: '#00ffff'}})

        } else {
            creep.moveTo(Game.flags.A1, {visualizePathStyle: {stroke: '#00ffff'}})
        }
    }



};

module.exports = roleAttacker;
