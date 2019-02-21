var meta = require("role.meta")

var o = Object.create(meta);

o.run = function(creep) {
//creep.drop(RESOURCE_ENERGY)
    var source
    if (!creep.memory.resource) {
        creep.memory.resource = RESOURCE_ENERGY
    }


//console.log(creep.name+" "+creep.room.name+" " + Game.rooms[creep.memory.spawnRoomName].storage)
    if (creep.memory.sf){
        source = Game.flags[creep.memory.sf]
    } else {
        source = Game.rooms[creep.memory.spawnRoomName].storage
        if (!source || source.store[creep.memory.resource] == 0){
            var sources = Game.rooms[creep.memory.spawnRoomName].find(FIND_STRUCTURES, {filter: function(s){return((s.structureType==STRUCTURE_CONTAINER || s.structureType==STRUCTURE_TERMINAL) && s.store[creep.memory.resource] > 0)}})
            if (sources.length > 0) {
                source = sources[0]
            } else {
//                creep.say("no pickup")
//                return(1)
            }
        }
    }


// if (creep.name.startsWith('L431remote')){
//     creep.memory.recycleAfterDelivery = true
// }
 /*
    if (creep.name == 'L31'){
              var spawn = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => structure.structureType == STRUCTURE_SPAWN})
      if (spawn) creep.moveTo(spawn)
      return(0)
    }
    */
//creep.suicide()

//if (creep.name.startsWith('L16')){Game.spawns.Spawn3.recycleCreep(creep); creep.moveTo(Game.spawns['Spawn3']) ; return(0)}

//    creep.memory.sf = 'T1';        creep.memory.tf = 'L1';        creep.memory.resource = RESOURCE_KEANIUM
//    creep.memory.sf = 'T1';        creep.memory.tf = 'L3';        creep.memory.resource = RESOURCE_HYDROGEN
//    creep.memory.sf = 'L2';        creep.memory.tf = 'S1';        creep.memory.resource = RESOURCE_KEANIUM_HYDRIDE
//    creep.memory.sf = 'T1';        creep.memory.tf = 'L1';        creep.memory.resource = RESOURCE_LEMERGIUM

    // oxygen to L3
//        creep.memory.sf = 'T1';        creep.memory.tf = 'L3';        creep.memory.resource = RESOURCE_OXYGEN

//    creep.memory.sf = 'container2';        creep.memory.tf = 'S2';        creep.memory.resource = RESOURCE_ENERGY
//    creep.memory.sf = 'container1';        creep.memory.tf = 'S1';        creep.memory.resource = RESOURCE_ENERGY

    if (creep.name == 'XE-baseLorry-1-W48N54') {
        creep.memory.role = 'labworker'
            creep.memory.sf = 'S6';        creep.memory.tf = 'L6';       /* creep.memory.resource = RESOURCE_CATALYZED_GHODIUM_ACID; */ creep.memory.resource = RESOURCE_ENERGY;
    }


    if (creep.carry[creep.memory.resource] ){
        this.moveAndTransfer(creep, Game.flags[creep.memory.tf], creep.memory.resource)
        creep.memory.onceLoaded = true
    } else {
        if (creep.memory.recycleAfterDelivery && creep.memory.onceLoaded == true){
            var spawn = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => structure.structureType == STRUCTURE_SPAWN})
            if (spawn){
                if (creep.pos.inRangeTo(spawn,1)){
                    spawn.recycleCreep(creep)
                } else {
                     creep.moveTo(spawn)
                }
            } else {

                this.moveAndWithdraw(creep, source, creep.memory.resource)
            }
        } else {

            this.moveAndWithdraw(creep, source, creep.memory.resource)
        }
    }

}


module.exports = o;
