/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.meta');
 * mod.thing == 'a thing'; // true
 */

module.exports = {

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