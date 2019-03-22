var meta = require("role.meta")

var o = Object.create(meta);

    /** @param {Creep} creep **/
    o.run = function(creep) {

        var terminal = creep.room.terminal

        if (!terminal) return(0)

        if (!creep.room.storage) return(0)
        var resourceList = [RESOURCE_ENERGY, RESOURCE_LEMERGIUM, RESOURCE_KEANIUM]
        for (var r in resourceList){
//            creep.say(">>> "+resourceList[r])
            var resource = resourceList[r]

            if ((resource == RESOURCE_ENERGY && creep.room.storage.store[resource] > 515000) || (resource != RESOURCE_ENERGY && creep.room.storage.store[resource] > 120000) ){
                if (!creep.carry[resource] || creep.carry[resource] < creep.carryCapacity){
                    creep.say(">s> "+resource)
                    this.moveAndWithdraw(creep, creep.room.storage, resource)
                } else {
                    creep.say(resource + " >t>")
                    for(const resourceType in creep.carry) {
                        this.moveAndTransfer(creep, terminal, resourceType)
                    }
                    return(0)
                }
            } else if (terminal.store[resource] > 130000 ){
                if (!creep.carry[resource] || creep.carry[resource] < creep.carryCapacity){
                    creep.say(">t> "+resource)
                    this.moveAndWithdraw(creep, terminal, resource)
                } else {
                    creep.say(resource + " >s>")
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
