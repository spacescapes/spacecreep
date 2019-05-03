var roleClaimer = {

    /** @param {Creep} creep **/
    run: function(creep) {


    if (creep.memory.room && (!Game.rooms[creep.memory.room] || creep.room.name != Game.rooms[creep.memory.room].name)){
// Variante 1
//        var exit = creep.room.findExitTo(creep.memory.room);
//        creep.moveTo(creep.pos.findClosestByRange(exit), {visualizePathStyle: {stroke: '#00ffff'}});
// Variante 2
        creep.moveTo(new RoomPosition(25, 20, creep.memory.room), {reusePath: 10, visualizePathStyle: {stroke: '#00ffff'}});
        return(0)
    }



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
}



};

module.exports = roleClaimer;
