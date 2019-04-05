var meta = require("role.meta")

var o = Object.create(meta);

    /** @param {Creep} creep **/
    o.run = function(creep) {

        var terminal = creep.room.terminal

        if (!terminal) return(0)

        if (!creep.room.storage) return(0)
        var resourceList = Object.keys(creep.room.storage.store)



        if (_.sum(creep.carry)<creep.carryCapacity){
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

        if (_.sum(creep.room.storage.store) >= 950000 && (_.sum(creep.room.terminal) <= 230000)){
            creep.say("full")
//            var max = _.max(creep.room.storage.store)
            var resource = _.max( Object.keys(creep.room.storage.store), (r) => creep.room.storage.store[r])
//            var max = _.maxBy(creep.room.storage.store, function(o) { return o.n; });
            creep.say(resource)
            if (!creep.carry[resource] || creep.carry[resource] < creep.carryCapacity){
                creep.say("S > "+resource)
                this.moveAndWithdraw(creep, creep.room.storage, resource)
            } else {
                creep.say(resource + " > T")
                for(const resourceType in creep.carry) {
                    this.moveAndTransfer(creep, terminal, resourceType)
                }
            }
            return(0)
        }
        if (_.sum(creep.room.terminal) >= 250000 && _.sum(creep.room.storage.store) <= 930000){
            var resource = _.max( Object.keys(creep.room.storage.store), (r) => creep.room.storage.store[r])
            if (!creep.carry[resource] || creep.carry[resource] < creep.carryCapacity){
                creep.say("T > "+resource)
                this.moveAndWithdraw(creep, terminal, resource)
            } else {
                creep.say(resource + " > S")
                for(const resourceType in creep.carry) {
                    this.moveAndTransfer(creep, creep.room.storage, resourceType)
                }
                return(0)
            }
        }

        var containerSites = creep.pos.findInRange(FIND_STRUCTURES, 3, {
		filter: function(object){
			return ( ( object.structureType === STRUCTURE_LINK && object.energy > 0) );
		   }
		});

        if (_.sum(creep.carry)<creep.carryCapacity){
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
