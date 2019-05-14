var meta = require("role.meta")

var o = Object.create(meta);

o.run = function(creep) {
//creep.drop(RESOURCE_ENERGY)

    creep.say("labworker")

/*
creep.moveTo(Game.getObjectById("5c1a3ed7669b44092ad44520"))
creep.withdraw(Game.getObjectById("5c1a3ed7669b44092ad44520"), RESOURCE_LEMERGIUM)


creep.moveTo(Game.getObjectById("5c03f60113c57d567e82016a"))
creep.say(creep.transfer(Game.getObjectById("5c03f60113c57d567e82016a"), RESOURCE_LEMERGIUM))
return(0)
*/

    var labs = creep.room.find(FIND_STRUCTURES, {
        filter: (i) => i.structureType == STRUCTURE_LAB
    })

//console.log(creep.name+" "+creep.room.name+" " + Game.rooms[creep.memory.spawnRoomName].storage)
    if (_.sum(creep.carry) == 0){
        var source = creep.room.terminal
        if (!creep.pos.isNearTo(source)){
            creep.moveTo(source)
            return(0)
        }


        var chosenLab = labs.find((lab) => ( lab.energy < 1500  ) )
        if (chosenLab ){
            creep.say("ch energy " + source.store[RESOURCE_ENERGY])
            creep.withdraw(source, RESOURCE_ENERGY);
            return(0)
        }


        for (var resource in source.store){


            if (resource != RESOURCE_ENERGY){
                creep.say(resource+ " " + source.store[resource])
                var chosenLab = labs.find((lab) => ( lab.mineralType == resource  ) )
                if (!chosenLab){
                    chosenLab = labs.find((lab) => (!lab.mineralType)  )
                }
                if (chosenLab && chosenLab.mineralAmount < 1500){
                    creep.say("ch " + resource+ " " + source.store[resource])
                    creep.withdraw(source, resource);
                }

            }
        }

    } else {

        if (creep.carry.energy > 0){
            var chosenLab = labs.find((lab) => ( lab.energy < 1500 ) )
            if (chosenLab ){

    creep.say(creep.pos.isNearTo(chosenLab));


                if (!creep.pos.isNearTo(chosenLab)){
                    creep.moveTo(chosenLab)
                    return(0)
                }
                creep.say("ch > energy " + chosenLab.id + " "  +creep.carry[RESOURCE_ENERGY])

                creep.transfer(chosenLab, RESOURCE_ENERGY)


                return(0)

            }
        }

        for (var resource in creep.carry){


            if (resource != RESOURCE_ENERGY){
                creep.say(resource+ " " + creep.carry[resource])
                var chosenLab = labs.find((lab) => ( lab.mineralType == resource  ) )
                if (!chosenLab){
                    chosenLab = labs.find((lab) => (!lab.mineralType)  )
                }

                if (chosenLab && chosenLab.mineralAmount < 2000){


                    if (!creep.pos.isNearTo(chosenLab)){
                        creep.moveTo(chosenLab)
                        return(0)
                    }
                    creep.say("ch " + resource+ + " " + chosenLab.id + " "  +creep.carry[resource])

                    creep.transfer(chosenLab, resource);



                }

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

creep.drop(RESOURCE_ENERGY)
}


module.exports = o;
