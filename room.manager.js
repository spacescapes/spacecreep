
var roleTower = require('role.tower');
var mainHelper = require('main.helper');
var managerHelper = require('room.managerHelper');

var store = {}

var roomManager = {

    findSources: function(room){
//        if (!store.sources){
            room.memory.sources = room.find(FIND_SOURCES)
//        }
        return(room.memory.sources)
    },
    storedSpawnMap: function(room, spawnMapName, spawnConfiguration) {
        if (spawnConfiguration.copy === undefined) spawnConfiguration.copy = 1
        var baseMap = {}

        if (spawnMapName == 'base'){
            var creepsInRoom = room.find(FIND_MY_CREEPS);
            var numberOfDroppers = _.sum(creepsInRoom, (c) => c.memory.role == "dropper");
            var numberOfHarvesters = _.sum(creepsInRoom, (c) => c.memory.role == "harvester");
            if (numberOfDroppers==0){
                sources = room.find(FIND_SOURCES).sort(function(a, b){return a.id - b.id})
                if (sources){
//                console.log(source.id)
                    baseMap['XD-'+spawnMapName+'-0-'+room.name]=
                        {role: 'dropper', sId: sources[0].id, bodyparts: this.baseBodies('dropper', room.energyAvailable), autoSpawn: true, required: spawnConfiguration.required}
                }
            } else if (numberOfHarvesters<=1){
                baseMap = ({
                    ['XH-'+spawnMapName+'-1-'+room.name]: {role: 'harvester', bodyparts: this.baseBodies('harvester', room.energyAvailable), autoSpawn: true, required: spawnConfiguration.required },
                    ['XH-'+spawnMapName+'-2-'+room.name]: {role: 'harvester', bodyparts: this.baseBodies('harvester', room.energyAvailable), autoSpawn: true, required: spawnConfiguration.required },
                })
            } else {
                baseMap = ({
                    ['XH-'+spawnMapName+'-1-'+room.name]: {role: 'harvester', bodyparts: this.baseBodies('harvester', room.energyCapacityAvailable-200), autoSpawn: true, required: spawnConfiguration.required },
                    ['XH-'+spawnMapName+'-2-'+room.name]: {role: 'harvester', bodyparts: this.baseBodies('harvester', room.energyCapacityAvailable-200), autoSpawn: true, required: spawnConfiguration.required },
                })
            }
//            console.log(JSON.stringify(sourcesSorted))
            room.find(FIND_SOURCES).sort(function(a, b){return a.id - b.id}).forEach((source, index)=>{
//                console.log(source.id)
                baseMap['XD-'+spawnMapName+'-'+(index+1)+'-'+room.name]=
                    {role: 'dropper', sId: source.id, bodyparts: this.baseBodies('dropper', room.energyCapacityAvailable-100), autoSpawn: true, required: spawnConfiguration.required}            })


            var baseMap2 = ({
                ['XH-'+spawnMapName+'-3-'+room.name]: {role: 'harvester', bodyparts: this.baseBodies('harvester', room.energyCapacityAvailable-100), autoSpawn: true, required: spawnConfiguration.required },
                ['XU-'+spawnMapName+'-1-'+room.name]: {role: 'upgrader', bodyparts: this.baseBodies('upgrader', room.energyAvailable), autoSpawn: true, required: spawnConfiguration.required },
                ['XR-'+spawnMapName+'-1-'+room.name]: {role: 'roadworker', bodyparts: this.baseBodies('roadworker', room.energyAvailable), autoSpawn: true, required: spawnConfiguration.required },
//                ['XU-'+spawnMapName+'-2-'+room.name]: {role: 'upgrader', bodyparts: this.baseBodies('upgrader', room.energyCapacityAvailable), autoSpawn: true, required: spawnConfiguration.required },
//                ['XR-'+spawnMapName+'-2-'+room.name]: {role: 'roadworker', bodyparts: this.baseBodies('roadworker', room.energyCapacityAvailable), autoSpawn: true, required: spawnConfiguration.required },
//                ['XW-'+spawnMapName+'-1-'+room.name]: {role: 'worker', bodyparts: this.baseBodies('worker', room.energyCapacityAvailable), autoSpawn: true, required: spawnConfiguration.required }
                ['XH-'+spawnMapName+'-4-'+room.name]: {role: 'harvester', bodyparts: this.baseBodies('harvester', room.energyCapacityAvailable-100), autoSpawn: true, required: spawnConfiguration.required },
            })

            baseMap = Object.assign(baseMap, baseMap2);
        } else  if (spawnMapName == 'baseLorry'){
            var creepsInRoom = room.find(FIND_MY_CREEPS);
            var numberOfDroppers = _.sum(creepsInRoom, (c) => c.memory.role == "dropper");
            var numberOfHarvesters = _.sum(creepsInRoom, (c) => c.memory.role == "lorry");
            var numberOfFullHarvesters = _.sum(creepsInRoom, (c) => c.memory.role == "lorry" && !c.memory.harvestThreshold );
            if (numberOfDroppers==0){
                sources = room.find(FIND_SOURCES).sort(function(a, b){return a.id - b.id})
                if (sources){
//                console.log(source.id)
                    baseMap['XD-'+spawnMapName+'-0-'+room.name]=
                        {role: 'dropper', sId: sources[0].id, bodyparts: this.baseBodies('dropper', room.energyAvailable), autoSpawn: true, required: spawnConfiguration.required}
                }
            } else if (numberOfFullHarvesters<1){
                baseMap = ({
                    ['XO-'+spawnMapName+'-1-'+room.name]: {role: 'lorry', bodyparts: this.baseBodies('lorry', room.energyAvailable), autoSpawn: true, required: spawnConfiguration.required },
                    ['XO-'+spawnMapName+'-2-'+room.name]: {role: 'lorry', bodyparts: this.baseBodies('lorry', room.energyAvailable), autoSpawn: true, harvestThreshold: 200, required: spawnConfiguration.required },
                })
            } else {
                baseMap = ({
                    ['XO-'+spawnMapName+'-1-'+room.name]: {role: 'lorry', bodyparts: this.baseBodies('lorry', room.energyCapacityAvailable-200), autoSpawn: true, required: spawnConfiguration.required },
                    ['XO-'+spawnMapName+'-2-'+room.name]: {role: 'lorry', bodyparts: this.baseBodies('lorry', room.energyCapacityAvailable-200), autoSpawn: true, harvestThreshold: 200, required: spawnConfiguration.required },
                })
            }
//            console.log(JSON.stringify(sourcesSorted))
            room.find(FIND_SOURCES).sort(function(a, b){return a.id - b.id}).forEach((source, index)=>{
//                console.log(source.id)
                baseMap['XD-'+spawnMapName+'-'+(index+1)+'-'+room.name]=
                    {role: 'dropper', sId: source.id, bodyparts: this.baseBodies('dropper', room.energyCapacityAvailable-100), autoSpawn: true, required: spawnConfiguration.required}            })


            var baseMap2 = ({
                ['XO-'+spawnMapName+'-3-'+room.name]: {role: 'lorry', bodyparts: this.baseBodies('lorry', room.energyCapacityAvailable-100), autoSpawn: true, harvestThreshold: 600, required: spawnConfiguration.required },
                ['XU-'+spawnMapName+'-1-'+room.name]: {role: 'upgrader', bodyparts: this.baseBodies('upgrader', room.energyAvailable), autoSpawn: true, required: spawnConfiguration.required },
                ['XR-'+spawnMapName+'-1-'+room.name]: {role: 'roadworker', bodyparts: this.baseBodies('roadworker', room.energyAvailable), autoSpawn: true, required: spawnConfiguration.required },
//                ['XO-'+spawnMapName+'-4-'+room.name]: {role: 'lorry', bodyparts: this.baseBodies('lorry', room.energyCapacityAvailable-100), autoSpawn: true, harvestThreshold: 1000, required: spawnConfiguration.required },
                ['XE-'+spawnMapName+'-1-'+room.name]: {role: 'terminalEqualizer', bodyparts: [CARRY,CARRY,MOVE], autoSpawn: true, required: spawnConfiguration.required },
//                ['XE-'+spawnMapName+'-2-'+room.name]: {role: 'terminalEqualizer', bodyparts: [CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY], autoSpawn: true, required: spawnConfiguration.required },
//                ['XU-'+spawnMapName+'-2-'+room.name]: {role: 'upgrader', bodyparts: this.baseBodies('upgrader', room.energyCapacityAvailable), autoSpawn: true, required: spawnConfiguration.required },
//                ['XR-'+spawnMapName+'-2-'+room.name]: {role: 'roadworker', bodyparts: this.baseBodies('roadworker', room.energyCapacityAvailable), autoSpawn: true, required: spawnConfiguration.required },
            })
            if (room.level <=4){
                baseMap2['XO-'+spawnMapName+'-4-'+room.name]=
                    {role: 'lorry', bodyparts: this.baseBodies('lorry', room.energyCapacityAvailable-100), autoSpawn: true, harvestThreshold: 1000, required: spawnConfiguration.required }
            }

            baseMap = Object.assign(baseMap, baseMap2);
        } else if (spawnMapName == 'scouts'){
            for (i=1;i<=spawnConfiguration.copy;i++){
                baseMap['X-'+spawnMapName+'-'+i+'-'+room.name+'-'+spawnConfiguration.sf]=
                    {role: 'attacker', sf: spawnConfiguration.sf, bodyparts: mainHelper.getBody(1,MOVE), autoSpawn: true, required: spawnConfiguration.required}
            }
            return baseMap
        } else if (spawnMapName == 'attacker'){
            for (i=1;i<=spawnConfiguration.copy;i++){
                baseMap['X-'+spawnMapName+'-'+i+'-'+room.name+'-'+spawnConfiguration.sf]=
                    {role: 'attacker', sf: spawnConfiguration.sf, ar: spawnConfiguration.ar, sf: spawnConfiguration.sf, bodyparts: this.baseBodies('attacker', room.energyAvailable), autoSpawn: true, required: spawnConfiguration.required}
            }
            return baseMap
        } else if (spawnMapName == 'roadworker'){
            for (i=1;i<=spawnConfiguration.copy;i++){
                baseMap['XR-'+spawnMapName+'-'+i+'-'+room.name]=
                    {role: 'roadworker', bodyparts: this.baseBodies('roadworker', room.energyCapacityAvailable), autoSpawn: true, required: spawnConfiguration.required }
            }
        } else if (spawnMapName == 'labworker'){
            for (i=1;i<=spawnConfiguration.copy;i++){
                baseMap['XL-'+spawnMapName+'-'+i+'-'+room.name]=
                    {role: 'labworker', tf: spawnConfiguration.tf, recycleAfterDelivery: spawnConfiguration.recycleAfterDelivery, bodyparts:  mainHelper.getBody(6,CARRY,6,MOVE), autoSpawn: true, required: spawnConfiguration.required }
            }

        } else if (spawnMapName == 'upgrader'){
            for (i=1;i<=spawnConfiguration.copy;i++){
                baseMap['XU-'+spawnMapName+'-'+i+'-'+room.name]=
                    {role: 'upgrader', room: spawnConfiguration.room, bodyparts: this.baseBodies('upgrader', room.energyCapacityAvailable), autoSpawn: true, required: spawnConfiguration.required }
            }
        }  else if (spawnMapName == 'collector1'){
            for (i=1;i<=spawnConfiguration.copy;i++){
                baseMap['XC-'+spawnMapName+'-'+i+'-'+room.name]=
                    {role: 'collector', bodyparts: this.baseBodies('collector', room.energyCapacityAvailable), autoSpawn: true, required: spawnConfiguration.required }
            }
        } else if (spawnMapName == 'worker1'){
            for (i=1;i<=spawnConfiguration.copy;i++){
                baseMap['XW-'+spawnMapName+'-'+i+'-'+room.name]=
                    {role: 'worker', bodyparts: this.baseBodies('worker', room.energyCapacityAvailable), autoSpawn: true, required: spawnConfiguration.required }
            }
        } else if (spawnMapName == 'custom'){
            if (spawnConfiguration.excludeRoom != room.name){
                baseMap = spawnConfiguration.creeps
            }
        } else if (spawnMapName == 'claim'){
            baseMap  = {
                ['XC-'+spawnMapName+'1-'+room.name+'-'+spawnConfiguration.room]: {role: 'claimer', room: spawnConfiguration.room, claim: true, bodyparts: this.baseBodies('claimer', room.energyCapacityAvailable), autoSpawn: true, required: spawnConfiguration.required }
            }
        } else if (spawnMapName == 'remoteHarvest'){
            if (!Game.rooms[spawnConfiguration.room]){
                baseMap  = {
                ['XA-'+spawnMapName+'-1-'+room.name+'-'+spawnConfiguration.room]: {role: 'attacker', room: spawnConfiguration.room, bodyparts: this.baseBodies('attacker', 300), ar: 40, autoSpawn: true, required: spawnConfiguration.required },
//                ['XA-'+spawnMapName+'-2-'+room.name+'-'+spawnConfiguration.room]: {role: 'attacker', room: spawnConfiguration.room, bodyparts: this.baseBodies('attacker', 500), ar: 40, autoSpawn: true, required: spawnConfiguration.required }
                }
            } else if (Game.rooms[spawnConfiguration.room].find(FIND_HOSTILE_CREEPS).length){
                console.log(spawnConfiguration.room+"has enemy"+Game.rooms[spawnConfiguration.room].find(FIND_HOSTILE_CREEPS).length)
                baseMap  = {
                ['XA-'+spawnMapName+'-1-'+room.name+'-'+spawnConfiguration.room]: {role: 'attacker', room: spawnConfiguration.room, bodyparts: this.baseBodies('attacker', room.energyAvailable), ar: 40, autoSpawn: true, required: spawnConfiguration.required },
//                ['XA-'+spawnMapName+'-2-'+room.name+'-'+spawnConfiguration.room]: {role: 'attacker', room: spawnConfiguration.room, bodyparts: this.baseBodies('attacker', 500), ar: 40, autoSpawn: true, required: spawnConfiguration.required }
                }
            }

//            console.log(spawnConfiguration.room)
            if (spawnConfiguration.room && Game.rooms[spawnConfiguration.room] && !Game.rooms[spawnConfiguration.room].controller.my && (!Game.rooms[spawnConfiguration.room].controller.reservation || Game.rooms[spawnConfiguration.room].controller.reservation.ticksToEnd < 1500)){
//                console.log("AAA " + Game.rooms[spawnConfiguration.room].controller.reservation)
                baseMap['XC-'+spawnMapName+'1-'+room.name+'-'+spawnConfiguration.room] =
                    {role: 'claimer', room: spawnConfiguration.room, bodyparts: this.baseBodies('claimer', room.energyCapacityAvailable), required: spawnConfiguration.required}
            }
            if (Game.rooms[spawnConfiguration.room]){
                Game.rooms[spawnConfiguration.room].find(FIND_SOURCES).sort(function(a, b){return a.id - b.id}).forEach((source, index)=>{
//                console.log(source.id)
                baseMap['XD-'+spawnMapName+'-'+(index+1)+'-'+room.name+'-'+spawnConfiguration.room]=
                    {role: 'dropper', sId: source.id, room: spawnConfiguration.room, bodyparts: this.baseBodies('dropper', room.energyCapacityAvailable), autoSpawn: true, required: spawnConfiguration.required}
                for (i=1;i<=spawnConfiguration.copy;i++){
                    baseMap['XUR-'+spawnMapName+'-'+(index+1)+''+i+'-'+room.name+'-'+spawnConfiguration.room]=
                     {role: 'upgraderRemote', sId: source.id, tId: room.controller.id, room: spawnConfiguration.room, bodyparts: this.baseBodies('upgraderRemote', room.energyCapacityAvailable), autoSpawn: true, required: spawnConfiguration.required}
                }
                })
//                console.log("FOUND ROOM " +spawnConfiguration.room)
            }
//            console.log(JSON.stringify( remoteMap))
        } else if (spawnMapName == 'remoteConstruction'){
            var i

            if (spawnConfiguration.sf && Game.flags[spawnConfiguration.sf] && Game.flags[spawnConfiguration.sf].room && !Game.flags[spawnConfiguration.sf].room.controller.my){
                baseMap['XC-'+spawnMapName+'1-'+room.name+'-'+spawnConfiguration.sf] =
                    {role: 'claimer', sf: spawnConfiguration.sf, claim: true, bodyparts: mainHelper.getBody(1,CLAIM,1,MOVE), required: spawnConfiguration.required}
            }
            if (Game.rooms[spawnConfiguration.room]){
                Game.rooms[spawnConfiguration.room].find(FIND_SOURCES).sort(function(a, b){return a.id - b.id}).forEach((source, index)=>{
//                console.log(source.id)
                baseMap['XD-'+spawnMapName+'-'+(index+1)+'-'+room.name+'-'+spawnConfiguration.room]=
                    {role: 'dropper', sId: source.id, room: spawnConfiguration.room, bodyparts: this.baseBodies('dropper', room.energyCapacityAvailable), autoSpawn: true, required: spawnConfiguration.required}
                })
//                console.log("FOUND ROOM " +spawnConfiguration.room)
            }
            baseMap['XU-'+spawnMapName+'2-'+room.name+'-'+spawnConfiguration.sf] =
                {role: 'upgrader', sf: spawnConfiguration.sf, bodyparts: roomManager.baseBodies('roadworker', room.energyAvailable), required: spawnConfiguration.required}


            for (i=1;i<=spawnConfiguration.copy;i++){
                baseMap['XR-'+spawnMapName+''+i+'-'+room.name+'-'+spawnConfiguration.sf]=
                    {role: 'roadworker', sf: spawnConfiguration.sf, room: spawnConfiguration.room, bodyparts: this.baseBodies('roadworkerFast', room.energyCapacityAvailable), autoSpawn: true, required: spawnConfiguration.required}
            }
        }
        return baseMap
    },

    baseBodies: function(role, energy){
        var bodyMap = [
            {
                role: 'harvester',
                bodies: [
                    {energy: 0, body: mainHelper.getBody(1,WORK,2,CARRY,2,MOVE)},
                    {energy: 350, body: mainHelper.getBody(2,WORK,1,CARRY,2,MOVE)},
                    {energy: 400, body: mainHelper.getBody(2,WORK,2,CARRY,2,MOVE)},
                    {energy: 500, body: mainHelper.getBody(1,WORK,5,CARRY,3,MOVE)},
                    {energy: 650, body: mainHelper.getBody(1,WORK,7,CARRY,4,MOVE)},
                    {energy: 800, body: mainHelper.getBody(1,WORK,9,CARRY,5,MOVE)}
                ]
            },
            {
                role: 'roadworker',
                bodies: [
                    {energy: 0, body: mainHelper.getBody(2,WORK,1,CARRY,1,MOVE)},
                    {energy: 350, body: mainHelper.getBody(2,WORK,1,CARRY,2,MOVE)},
                    {energy: 400, body: mainHelper.getBody(2,WORK,2,CARRY,2,MOVE)},
                    {energy: 500, body: mainHelper.getBody(2,WORK,3,CARRY,3,MOVE)},
                    {energy: 650, body: mainHelper.getBody(3,WORK,3,CARRY,3,MOVE)},
                    {energy: 850, body: mainHelper.getBody(5,WORK,3,CARRY,4,MOVE)}
                ]
            },
            {
                role: 'roadworkerFast',
                bodies: [
                    {energy: 0, body: mainHelper.getBody(1,WORK,1,CARRY,2,MOVE)},
                    {energy: 400, body: mainHelper.getBody(2,WORK,1,CARRY,3,MOVE)},
                    {energy: 500, body: mainHelper.getBody(2,WORK,2,CARRY,4,MOVE)},
                    {energy: 600, body: mainHelper.getBody(2,WORK,3,CARRY,5,MOVE)},
                    {energy: 750, body: mainHelper.getBody(3,WORK,3,CARRY,6,MOVE)}
                ]
            },
            {
                role: 'upgrader',
                bodies: [
                    {energy: 0, body: mainHelper.getBody(2,WORK,1,CARRY,1,MOVE)},
                    {energy: 350, body: mainHelper.getBody(2,WORK,1,CARRY,2,MOVE)},
                    {energy: 400, body: mainHelper.getBody(2,WORK,2,CARRY,2,MOVE)},
                    {energy: 500, body: mainHelper.getBody(2,WORK,3,CARRY,3,MOVE)},
                    {energy: 600, body: mainHelper.getBody(3,WORK,3,CARRY,3,MOVE)},
                    {energy: 800, body: mainHelper.getBody(4,WORK,4,CARRY,4,MOVE)},
                    {energy: 950, body: mainHelper.getBody(5,WORK,4,CARRY,5,MOVE)},
                    {energy: 1050, body: mainHelper.getBody(6,WORK,4,CARRY,5,MOVE)},
                    {energy: 1300, body: mainHelper.getBody(8,WORK,4,CARRY,6,MOVE)},
                    {energy: 1550, body: mainHelper.getBody(10,WORK,4,CARRY,7,MOVE)},
                    {energy: 1800, body: mainHelper.getBody(12,WORK,4,CARRY,8,MOVE)},
                ]
            },
            {
                role: 'dropper',
                bodies: [
                    {energy: 0, body: mainHelper.getBody(2,WORK,1,CARRY,1,MOVE)},
                    {energy: 350, body: mainHelper.getBody(2,WORK,1,CARRY,2,MOVE)},
                    {energy: 400, body: mainHelper.getBody(3,WORK,1,CARRY,1,MOVE)},
                    {energy: 500, body: mainHelper.getBody(4,WORK,1,CARRY,1,MOVE)},
                    {energy: 650, body: mainHelper.getBody(5,WORK,1,CARRY,2,MOVE)},
                    {energy: 700, body: mainHelper.getBody(5,WORK,1,CARRY,3,MOVE)}
                ]
            },
            {
                role: 'collector',
                bodies: [
                    {energy: 0, body: mainHelper.getBody(2,CARRY,2,MOVE)},
                    {energy: 400, body: mainHelper.getBody(3,CARRY,3,MOVE)},
                    {energy: 500, body: mainHelper.getBody(4,CARRY,4,MOVE)},

                ]
            },
            {
                role: 'lorry',
                bodies: [
                    {energy: 0, body: mainHelper.getBody(2,CARRY,2,MOVE)},
                    {energy: 300, body: mainHelper.getBody(3,CARRY,3,MOVE)},
                    {energy: 400, body: mainHelper.getBody(4,CARRY,4,MOVE)},
                    {energy: 500, body: mainHelper.getBody(5,CARRY,5,MOVE)},
                    {energy: 600, body: mainHelper.getBody(6,CARRY,6,MOVE)},
                    {energy: 700, body: mainHelper.getBody(7,CARRY,7,MOVE)},
                    {energy: 800, body: mainHelper.getBody(8,CARRY,8,MOVE)},
                    {energy: 900, body: mainHelper.getBody(9,CARRY,9,MOVE)},
                    {energy: 1000, body: mainHelper.getBody(10,CARRY,10,MOVE)},
                    {energy: 1100, body: mainHelper.getBody(11,CARRY,11,MOVE)},
                    {energy: 1200, body: mainHelper.getBody(12,CARRY,12,MOVE)},

                ]
            },
            {
                role: 'worker',
                bodies: [
                    {energy: 0, body: mainHelper.getBody(4,CARRY,2,MOVE)},
                    {energy: 500, body: mainHelper.getBody(6,CARRY,3,MOVE)},

                ]
            },
            {
                role: 'upgraderRemote',
                bodies: [
                    {energy: 0, body: mainHelper.getBody(1,WORK,3,CARRY,2,MOVE)},
                    {energy: 500, body: mainHelper.getBody(1,WORK,5,CARRY,3,MOVE)},
                    {energy: 650, body: mainHelper.getBody(1,WORK,7,CARRY,4,MOVE)},
                    {energy: 800, body: mainHelper.getBody(1,WORK,9,CARRY,5,MOVE)},
                    {energy: 950, body: mainHelper.getBody(1,WORK,11,CARRY,6,MOVE)},
                    {energy: 1100, body: mainHelper.getBody(1,WORK,13,CARRY,7,MOVE)},
                    {energy: 1250, body: mainHelper.getBody(1,WORK,15,CARRY,8,MOVE)}
                ]
            },
            {
                role: 'claimer',
                bodies: [
                    {energy: 0, body: mainHelper.getBody(1,MOVE)},
                    {energy: 750, body: mainHelper.getBody(1,CLAIM,1,MOVE)},
                    {energy: 1300, spawnDelay: 200, body: mainHelper.getBody(2,CLAIM,1,MOVE)},
                    {energy: 1400, spawnDelay: 200, body: mainHelper.getBody(2,CLAIM,2,MOVE)},

                ]
            },            {
                role: 'attacker',
                bodies: [
                    {energy: 0, body: mainHelper.getBody(1,ATTACK,1,MOVE)},
                    {energy: 300, body: mainHelper.getBody(2,ATTACK,2,MOVE)},
                    {energy: 600, body: mainHelper.getBody(4,ATTACK,4,MOVE)},
                    {energy: 900, body: mainHelper.getBody(6,ATTACK,6,MOVE)},

                ]
            }

        ]

        var u = bodyMap.find((a) => (a.role == role)).bodies.reduce(function(total, value){if (energy >= value.energy){return(value)} else {return(total)}})
//        console.log(JSON.stringify(u.body))
        return(u.body)
    },


    /** @param {Creep} creep **/
    run: function(room) {

//    if (true){
//    console.log(room.name)
    managerHelper.updateMap(room)


    var spawnMapEntry
    if (Memory.spawnMap[room.name]){spawnMapEntry = Memory.spawnMap[room.name] } else {spawnMapEntry = Memory.spawnMap['default']}
    if (spawnMapEntry.room.roads){
        room.visual.text(
            JSON.stringify(spawnMapEntry),
            20 , 20,
            {align: 'left', opacity: 0.7, font: 0.6})
        if ((Game.time % 2 ) == 0) {
            managerHelper.buildRoadsFromMap(room)
        }
    }
    managerHelper.equipRoom(room)
    var containers = room.find(FIND_STRUCTURES, {
		filter: function(object){
			return ((object.structureType === STRUCTURE_CONTAINER));
		   }
		});
	var containerSitesFull =_.filter(containers, ((a) => a.store.energy > 1900));

    containerSitesFull.forEach((c)=> {
        if (room.find(FIND_MY_CREEPS, {filter: function(creep){creep.memory.role=='lorry' && creep.memory.task && creep.memory.task.id == c.id}}).length==0){
            var lorry = c.pos.findClosestByPath(FIND_MY_CREEPS, {filter: function(creep){creep.memory.role=='lorry'}})
            if (lorry){
                if (!lorry.memory.task) lorry.memory.task = {}
                lorry.memory.task.id = c.id
            }
        }
    })

    containers.forEach((c) => room.visual.text(
            c.store.energy ,
            c.pos.x + 1, c.pos.y+1,
            {align: 'left', opacity: 0.7, font: 0.6}))

    var links = room.find(FIND_STRUCTURES, {
		filter: function(object){
			return ((object.structureType === STRUCTURE_LINK && object.cooldown == 0 ));
		   }
		});

	links.forEach((c) => room.visual.text(
            c.energy + " " + Memory.linkMode[c.id],
            c.pos.x + 1, c.pos.y+1,
            {align: 'left', opacity: 1, font: 0.6}))


//    console.log("LINKS: "+links.length);
    if (links.length >= 2){
        var linksSorted = links.sort(function(a,b){return b.energy - a.energy})
//        console.log("LINKS sorted: "+ linksSorted.length + " last: " + linksSorted[linksSorted.length-1].energy+ " first: " + linksSorted[0].energy);

        if (((linksSorted[0].energy - linksSorted[linksSorted.length-1].energy ) > 100) && linksSorted[0].energy > 700){
//            linksSorted[0].transferEnergy(linksSorted[linksSorted.length-1], ((linksSorted[0].energy - linksSorted[linksSorted.length-1].energy )/2) + 50);

            var energyAmount =  Math.min(linksSorted[0].energy, 800-(linksSorted[linksSorted.length-1].energy)) - 100

            var transfer = linksSorted[0].transferEnergy(linksSorted[linksSorted.length-1], energyAmount);
            Memory.linkMode[linksSorted[0].id]='send'
            Memory.linkMode[linksSorted[linksSorted.length-1].id]='receive'
            console.log("transfer: "+ transfer + " amount: " + energyAmount)
        }

        var minLink = linksSorted[linksSorted.length-1];
/*
        var nextLink = linksSorted[linksSorted.length-1].pos.findClosestByRange(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_LINK}});
        if ((nextLink.energy - minLink.energy ) >= 100){
           nextLink.transferEnergy( minLink, (( nextLink.energy -minLink.energy  )/2) + 50);
        }
*/
    }

    if (!room.memory.repair){
    	var repairSite = room.find(FIND_STRUCTURES, {
		filter: function(object){
			return ((object.structureType === STRUCTURE_ROAD || object.structureType === STRUCTURE_CONTAINER || object.structureType == STRUCTURE_TOWER ) && (object.hits < (object.hitsMax-500)) || (object.structureType == STRUCTURE_WALL || object.structureType == STRUCTURE_RAMPART) && (object.hits < (300000)));
		   }
		});
        if (repairSite.length > 0) room.memory.repair = true
    }

    var towers = room.find(FIND_STRUCTURES, {filter: (o) => o.structureType==STRUCTURE_TOWER})
    towers.forEach((tower) => roleTower.run(tower))

    var labs = room.find(FIND_MY_STRUCTURES,
        {filter: {structureType: STRUCTURE_LAB}});
    if (labs.length > 1){
        labs[0].runReaction(labs[1], labs[2]);
//        console.log("Boost: ", labs[0].boostCreep(Game.creeps['He1112']),1)
/*
    console.log("Boost: ", labs[0].boostCreep(Game.creeps['L12']),1)
*/
    }



    var spawns = room.find(FIND_MY_SPAWNS);
    spawns.forEach((spawn) => {
//spawn.room.find(FIND_MY_CREEPS).map((creep) => creep.memory.renewing = false)
        if (!spawn.spawning){

            if (spawn.room.energyAvailable > 650){

                var creeps = spawn.pos.findInRange(FIND_MY_CREEPS, 5)
                var creepsRenewing = creeps.filter((creep) => creep.memory.renewing && !creep.memory.autoSpawn)
                var creepsInNeed  = creeps.filter((creep) => !creep.memory.renewing && !creep.memory.autoSpawn && creep.ticksToLive < 500)
                var creepsSortedByTTL = creepsInNeed.sort(function(a,b){return a.ticksToLive - b.ticksToLive})
//                console.log(creepsSortedByTTL.map((a) => console.log(a.name+ " TTL " + a.ticksToLive + " renew: " + a.memory.renewing)))
                creepsInNeed.map((creep) => creep.memory.renewing = false)
                if (creepsRenewing.length < 1 && creepsSortedByTTL.length > 0){
//                    var creep = creepsSortedByTTL[0]
//                    creep.memory.renewing = true
                    creepsSortedByTTL[0].memory.renewing = true
                }

                var nearbyCreeps = spawn.pos.findInRange(FIND_MY_CREEPS, 1).filter((creep) => creep.ticksToLive < 1400)
                if (nearbyCreeps.length > 0){
//                     var nearbyCreepsSortedByTTL = nearbyCreeps.sort(function(a,b){return a.ticksToLive>b.ticksToLive})
                     var nearbyCreepsSortedByTTL = nearbyCreeps.sort(function(a,b){return a.name>b.name})
                    nearbyCreepsSortedByTTL.find((creep) => {
                        var before = room.energyAvailable
                        var renewResult = spawn.renewCreep(creep)
                        var after = room.energyAvailable
                        console.log('Renewing Creep: '+ creep.name + ' ttl: ' + creep.ticksToLive + " result: " + renewResult+ " energy: b " + before + " a " + after + " = " + (before -after))
                        return (renewResult == OK)
                    })

                }
                if (creepsSortedByTTL.length > 53){
                    creepsSortedByTTL[5].memory.renewing = false
                }
            } else {
                spawn.room.find(FIND_MY_CREEPS).map((creep) => creep.memory.renewing = false)
            }

        } else  {
            var spawningCreep = Game.creeps[spawn.spawning.name];
            spawn.room.visual.text(
                'Spawn: ' + spawningCreep.memory.role,
                spawn.pos.x + 1,
                spawn.pos.y,
                {align: 'left', opacity: 0.8});
        }
    })

    spawns.forEach((spawn) => {
        var spawnResult
        if (!spawn.spawning){
// ANKER
            var newSpawnMap = {}
//          console.log("1: "+JSON.stringify(Memory.spawnMap[room.name]))

            if (Memory.spawnMap[room.name] && Memory.spawnMap[room.name].room.spawnMaps){
                var spawnMaps = Memory.spawnMap[room.name].room.spawnMaps
                spawnMaps.forEach((spawnConfiguration) => {
                    var autoSpawnMap = this.storedSpawnMap(room, spawnConfiguration.name, spawnConfiguration)
                    Object.keys(autoSpawnMap).forEach((key)=>(newSpawnMap[key] = autoSpawnMap[key]))
                })
            }
            if (Memory.spawnMap['all'] && Memory.spawnMap['all'].room.spawnMaps){
                var spawnMaps = Memory.spawnMap['all'].room.spawnMaps
                spawnMaps.forEach((spawnConfiguration) => {
                    var autoSpawnMap = this.storedSpawnMap(room, spawnConfiguration.name, spawnConfiguration)

                    Object.keys(autoSpawnMap).forEach((key)=>{
                        //console.log("storing: newSpawMap "+key+'-'+room.name+":"+JSON.stringify(autoSpawnMap[key]));
                        newSpawnMap[key+'-'+room.name] = autoSpawnMap[key]})
                })
            }
/*
            if (Memory.spawnMap[room.name]){
                Object.keys(Memory.spawnMap[room.name].creeps).forEach((key)=>(newSpawnMap[key] = Memory.spawnMap[room.name].creeps[key]))
            }
*/
//                Memory.spawnMap[room.name].generatedMap = newSpawnMap
//                console.log("OOOOO" + room.name + " " + Memory.spawnMap[room.name].generatedMap)
            if (newSpawnMap){
                var spawned = false;

                Object.keys(newSpawnMap).forEach((creepName)=> {
                    var a=JSON.parse(JSON.stringify(newSpawnMap[creepName]));
                    a.name = creepName

                    if (!Game.creeps[creepName] && !Memory.spawnTick[creepName]){
                        Memory.spawnTick[creepName] = Game.time + (a.spawnDelay?a.spawnDelay:0)
                        console.log("ask for " + creepName + " for "+ a.sf + " with delay " + a.spawnDelay + " at: " + Game.time + " therefore spawning at: " + Memory.spawnTick[a.name])
                    }
                    if (Memory.spawnMap[room.name].room.debug){
                        console.log(room.name, ' Checking spawn availability ' + creepName + (Game.creeps[creepName]?(' exists in: ' + Game.creeps[creepName].room.name):' away ' ) + ( a.required?' required':' ' ));
                    }
                    if (!spawned && !Game.creeps[creepName] && (Game.time > Memory.spawnTick[creepName])){
                        a.spawnRoomName = room.name
//                        console.log("Setting spawnRoomName: "+room.name)
                        spawnResult = spawn.spawnCreep(a.bodyparts, creepName, {memory: a});
                        if (Memory.spawnMap[room.name].debug){
                            console.log(room.name, ' Spawning new ' + creepName, " Result: ", spawnResult);
                        }
                        if (spawnResult != -6 || a.required){
                            spawned = true;
                        }
                        if (spawnResult == OK){
                            Memory.spawnTick[creepName] = 0
                            spawned = true
                        }
                    }
/*
                    if (!spawned && (Game.time > Memory.spawnTick[a.name])){
                        if (spawnResult != ERR_NAME_EXISTS){
                        }
                    }
*/
                })
            }
        }
    })
}
}

module.exports = roomManager;
