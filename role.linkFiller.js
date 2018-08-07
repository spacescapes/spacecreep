var roleLinkFiller = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(!creep.pos.inRangeTo(Game.flags.Flag1, 3)){
            creep.moveTo(Game.flags.Flag1, {visualizePathStyle: {stroke: '#00ffff'}})
        } else if (creep.carry.energy < creep.carryCapacity){
            var source = creep.pos.findClosestByRange(FIND_SOURCES)
            if (creep.harvest(source) == ERR_NOT_IN_RANGE){
                creep.moveTo(source)
            }
        } else {
            var link = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            		filter: function(object){
            			return (object.structureType == STRUCTURE_LINK);
            		   }
            		});
                if (creep.transfer(link,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(link, {visualizePathStyle: {stroke: '#00ffff'}})
                }
            const linkTo = link.pos.findInRange(FIND_MY_STRUCTURES, 50,
                {filter: {structureType: STRUCTURE_LINK}})[1];
    //            console.log()
//            console.log("LinkFrom: ", link, " energy: ", link.energy, "linkTo: ", linkTo.id)
            if (link.cooldown == 0){
                link.transferEnergy(linkTo)
            }
        }
    }
};

module.exports = roleLinkFiller;
