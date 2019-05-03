var meta = require("role.meta")

var o = Object.create(meta);

    /** @param {Creep} creep **/
    o.run = function(creep) {
        var terminal = creep.room.terminal
        if (!terminal) {
            if (creep.room.storage){
                if (!creep.pos.inRangeTo(creep.room.storage)){
    		        creep.moveTo(creep.room.storage)
                }
            } else {
                return(0)
            }
        }

        if (!creep.room.storage) return(0)
        var resourceList = Object.keys(creep.room.storage.store)

        if ((_.sum(creep.room.storage.store) < 960000) &&  (_.sum(creep.carry)<creep.carryCapacity) ){
            var containerSites = creep.pos.findInRange(FIND_STRUCTURES, 1, {
		    filter: function(object){
		    	return ( ( object.structureType === STRUCTURE_LINK && object.energy > 0) );
		       }
		    });
    		if (containerSites.length){

    		    containerSite = containerSites[0]
    		    creep.say("L > energy")

    		    this.moveAndWithdraw(creep, containerSite, RESOURCE_ENERGY)
    		    return(0)
    		}
        }
        if (_.sum(creep.room.storage.store) >= (950000) && (_.sum(creep.room.terminal) <= 230000)){
//            var max = _.max(creep.room.storage.store)
//            var max = _.maxBy(creep.room.storage.store, function(o) { return o.n; });

            if (_.sum(creep.carry)>0){
                for(const resourceType in creep.carry) {
                    creep.say(resourceType + " > T")

                    if (terminal) this.moveAndTransfer(creep, terminal, resourceType)
                }
            } else {
                var resource
                if (creep.room.terminal && creep.room.terminal.store.energy < 11000){
                    resource = RESOURCE_ENERGY
                } else {
                    resource = _.max( Object.keys(creep.room.storage.store), (r) => creep.room.storage.store[r])
                }
                creep.say("S > "+resource)
                this.moveAndWithdraw(creep, creep.room.storage, resource)
            }
            return(0)
        }

        if (terminal && _.sum(terminal.store) >= 220000 && _.sum(creep.room.storage.store) <= 930000){

            if (_.sum(creep.carry)>0){
                for(const resourceType in creep.carry) {
                    creep.say(resourceType + " > S")
                    this.moveAndTransfer(creep, creep.room.storage, resourceType)
                }
            } else {
                var resource = _.max( Object.keys(terminal.store), (r) => terminal.store[r])
                creep.say("T > "+resource)
                this.moveAndWithdraw(creep, terminal, resource)
            }
            return(0)
        }



        if (_.sum(creep.carry)<creep.carryCapacity){
            var containerSites = creep.pos.findInRange(FIND_STRUCTURES, 3, {
		        filter: function(object){
			    return ( ( object.structureType === STRUCTURE_LINK && object.energy > 0) );
		        }
		    });
    		if (containerSites.length){

    		    containerSite = containerSites[0]
    		    creep.say("L > " + creep.carry)

    		    this.moveAndWithdraw(creep, containerSite, RESOURCE_ENERGY)
    		    return(0)
    		}
    		if (!creep.pos.inRangeTo(creep.room.storage)){
    		    creep.moveTo(creep.room.storage)
    		}
        }
        for(const resourceType in creep.carry) {

            if (creep.carry[resourceType]){
                this.moveAndTransfer(creep, creep.room.storage, resourceType)
                creep.say(resourceType + " > S")
                return(0)
            }
        }
		creep.say("end")


	}

module.exports = o;
