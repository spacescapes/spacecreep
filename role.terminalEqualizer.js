var meta = require("role.meta")

var o = Object.create(meta);

    /** @param {Creep} creep **/
    o.run = function(creep) {
        var terminals = creep.room.find(FIND_STRUCTURES, {filter: ((s)=>(s.structureType == STRUCTURE_TERMINAL))})
        var terminal
        if (terminals.length > 0) terminal = terminals[0]
        creep.say("E")
        if (!terminal) return(0)
        creep.say("F")
        if (!creep.room.storage) return(0)
        var resourceList = [RESOURCE_ENERGY, RESOURCE_LEMERGIUM]
        for (var r in resourceList){
            creep.say(resourceList[r])
            var resource = resourceList[r]

            if (terminal.store[resource] < 120000 ){
                if (!creep.carry[resource] || creep.carry[resource] < creep.carryCapacity){
                    creep.say("E withdraw")
                    this.moveAndWithdraw(creep, creep.room.storage, resource)
                } else {
                    creep.say("E load")
                    for(const resourceType in creep.carry) {
                        this.moveAndTransfer(creep, terminal, resourceType)
                    }
                    return(0)
                }
            } else if (terminal.store[resource] > 130000 ){
                if (!creep.carry[resource] || creep.carry[resource] < creep.carryCapacity){
                    creep.say("E withdraw")
                    this.moveAndWithdraw(creep, terminal, resource)
                } else {
                    creep.say("E l "+creep.carry[resource])
                    for(const resourceType in creep.carry) {
                        this.moveAndTransfer(creep, creep.room.storage, resourceType)
                    }
                    return(0)
                }
            }
            for(const resourceType in creep.carry) {
                this.moveAndTransfer(creep, creep.room.storage, resourceType)
            }
        }

	}

module.exports = o;
