var roleClaimer = {

    /** @param {Creep} creep **/
    run: function(creep) {


            if(creep.pos.inRangeTo(Game.flags.C1,10)) {

                if (creep.pos.isNearTo(creep.room.controller)) {
//                    creep.attackController(creep.room.controller)
                    console.log("attacking", creep.claimController(creep.room.controller))
                    console.log("attacking", creep.reserveController(creep.room.controller))
                } else {
                    creep.moveTo(creep.room.controller)
                }
            } else {
                creep.moveTo(Game.flags.C1, {visualizePathStyle: {stroke: '#00ffff'}})
            }

//creep.moveTo(1,1)


    }



};

module.exports = roleClaimer;
