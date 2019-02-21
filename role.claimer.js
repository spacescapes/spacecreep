var roleClaimer = {

    /** @param {Creep} creep **/
    run: function(creep) {


    if (creep.memory.follower){
        var follower = Game.creeps[creep.memory.follower]
//        if (!creep.pos.inRangeTo(master)){
          if (follower && !creep.pos.inRangeTo(follower,1)){
            creep.moveTo(follower)
            return(0)
        }

    }

    var roomName = creep.memory.room;
    if (!roomName && Game.flags[creep.memory.sf] && Game.flags[creep.memory.sf].room) {
        roomName = Game.flags[creep.memory.sf].room.name
    }
    if (roomName){
        roomPositionCentral = new RoomPosition(25, 20, roomName)
    }
    creep.say("claim "+creep.name)
    //if (creep.name == 'XC-remoteHarvest1-W48N46-W47N46')    creep.claimController(creep.room.controller)

    if(creep.pos.roomName == roomName) {

        if (creep.pos.isNearTo(creep.room.controller)) {
            creep.signController(creep.room.controller, "helmut found this room interesting")
            if (creep.room.controller.my){
                return(0)
            }
            if (!creep.room.controller.owner){
                if (creep.memory.claim){
                    if (creep.claimController(creep.room.controller)== OK) {
                       // creep.suicide()
                    }
                } else {
                    creep.reserveController(creep.room.controller)
                }
            } else {
                creep.attackController(creep.room.controller)
            }
        } else {
            creep.moveTo(creep.room.controller)
        }
    } else {
        if (creep.memory.sf){
            creep.moveTo(Game.flags[creep.memory.sf])
        } else {
            creep.moveTo(roomPositionCentral, {visualizePathStyle: {stroke: '#00ffff'}})
        }
    }
}



};

module.exports = roleClaimer;
