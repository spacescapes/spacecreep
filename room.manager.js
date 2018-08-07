var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleUpgraderRemote = require('role.upgraderRemote');
var roleRoadworker = require('role.roadworker');
var roleWorker = require('role.worker');
var roleAttacker = require('role.attacker');
var roleHealer = require('role.healer');
var roleClaimer = require('role.claimer');
var roleTower = require('role.tower');
var roleContainerFiller = require('role.containerFiller');
var roleContainerDistributor = require('role.containerDistributor');
var roleLinkPuller = require('role.linkPuller');
var roleLinkFiller = require('role.linkFiller');

var roomManager = {

    currentSpawnEntry: function (room){
        var possibleSpawnEntries = Memory.spawnMap[room.name]
        var nextSpawnIndex = room.memory.nextSpawnIndex
console.log(">>>>>>>>>>>>>>>>>>>", room.name)
console.log(">>>>>>>>>>>>>>>>>>>", JSON.stringify(Memory.spawnMap))
for (x in Memory.spawnMap) console.log(">>>", x)
        if (nextSpawnIndex == undefined)
            nextSpawnIndex = 0
        else if (nextSpawnIndex >= possibleSpawnEntries.length-1)
            nextSpawnIndex = 0
        room.memory.nextSpawnIndex = nextSpawnIndex
        return possibleSpawnEntries[nextSpawnIndex]
    },

    nextSpawnEntry: function (room){
        var possibleSpawnEntries = Memory.spawnMap[room.name]
        var nextSpawnIndex = room.memory.nextSpawnIndex
        if (nextSpawnIndex == undefined)
            nextSpawnIndex = 0
        else if (nextSpawnIndex >= possibleSpawnEntries.length-1)
            nextSpawnIndex = 0
        else
            nextSpawnIndex++
        room.memory.nextSpawnIndex = nextSpawnIndex
        return possibleSpawnEntries[nextSpawnIndex]
    },

    /** @param {Creep} creep **/
    run: function(room) {

    var spawn = room.find(FIND_MY_SPAWNS)[0];

    console.log("next spawnEntry: ", JSON.stringify(this.currentSpawnEntry(room)))

    var possibleSpawnEntries = Memory.spawnMap[room.name]

    var spawned = false;
    Memory.spawnMap[room.name].forEach((a)=> {
        if (!spawned){
            var newName = a.name;
//            Game.creeps[a.name].suicide()
            spawnResult = spawn.spawnCreep(a.bodyparts, newName,
                {memory: {role: a.role, spawnRoom: room.name, sourceflagName: a.sourceflagName, targetflagName: a.targetflagName}});
            if (spawnResult != ERR_NAME_EXISTS){
            console.log("room: ", room.name, 'Spawning new ' + newName, " sourceFlagName", a.sourceflagName);
                spawned = true;
            }
        }
//        console.log(room.name, " AAAA", spawnResult)

        })

/*
    if(creepMap.dropper.length < 4) {
        var newName = 'Dropper' + Game.time;
        console.log("room: ", room.name, 'Spawning new Dropper: ' + newName);
       spawn.spawnCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE], newName,
            {memory: {role: 'dropper', spawnRoom: room.name}});
    }
*/

    var newContainerMap = {}

    var containers = room.find(FIND_STRUCTURES, {
		filter: function(object){
			return (object.structureType === STRUCTURE_CONTAINER );
		   }
	});

	containers.forEach((container) => {
	    newContainerMap[container.id] = (container.store.energy / container.storeCapacity)
	    if (room.memory.containerMap){
	        newContainerMap[container.id] =((room.memory.containerMap[container.id] * 19 + newContainerMap[container.id] ) / 20).toFixed(4)
	    }
//    console.log("container: ", container.id, " newContainerMap ", JSON.stringify(newContainerMap))
	})
    room.memory.containerMap = newContainerMap
    console.log("room: ", room.name, " newContainerMap ", JSON.stringify(room.memory.containerMap))

    var sources = room.find(FIND_SOURCES)
    sources.forEach((source) => {
        console.log("source:: ", source.id, " energy: ", source.energy, " ticks: ", source.ticksToRegeneration, " over ticks: ", source.energy / source.ticksToRegeneration*10)
     })
    room.memory.nextSourceId = sources.reduce((prev,current) =>  ((prev.energy / prev.ticksToRegeneration*10) > (current.energy / current.ticksToRegeneration*10)) ? prev : current).id
    console.log( "room ", room.name, " nextSourceId: ", room.memory.nextSourceId )




    var myCreeps = _.filter(Game.creeps, (a) => a.memory.spawnRoom == room.name);

    var creepMap = {
        attacker: [],
        claimer: [],
        dropper: [],
        healer: [],
        harvester: [],
        containerFiller: [],
        linkFiller: [],
        linkPuller: [],
        worker: [],
        roadworker: [],
        upgrader: [],
        upgraderRemote: []
    }
    var creepMap = myCreeps.reduce(((acc, creep)=>{
        acc[creep.memory.role].push(creep);
        return acc}),creepMap)
    console.log("room ", room.name, " map ", JSON.stringify(creepMap))


 console.log('room: ', room.name , 'a: ' + creepMap.attacker.length, 'h: ' + creepMap.harvester.length, "  w: ", creepMap.worker.length, "  r: ", creepMap.roadworker.length, " cf: ", creepMap.containerFiller.length, " u: ", creepMap.upgrader.length, " ur: ", creepMap.upgraderRemote.length);

/*

    if(creepMap.attacker.length < 0) {
        var newName = 'Attacker' + Game.time;
        console.log("room: ", room.name, 'Spawning new Attacker: ' + newName);
        spawn.spawnCreep([TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,ATTACK], newName,
            {memory: {role: 'attacker', spawnRoom: room.name}});
    }
    if(creepMap.claimer.length < 0) {
        var newName = 'Claimer' + Game.time;
        console.log("room: ", room.name, 'Spawning new claimer: ' + newName);
        spawn.spawnCreep([CLAIM,MOVE,MOVE,MOVE,MOVE], newName,
            {memory: {role: 'claimer', sourceId:  room.memory.nextSourceId, spawnRoom: room.name}});
    }
    if(creepMap.healer.length < 0) {
        var newName = 'Healer' + Game.time;
        console.log("room: ", room.name, 'Spawning new healer: ' + newName);
//       console.log( Game.spawns['Spawn1'].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,HEAL], newName,
       console.log( Game.spawns['Spawn1'].spawnCreep([HEAL,MOVE], newName,
//       console.log( Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL], newName,
            {memory: {role: 'healer', sourceId:  room.memory.nextSourceId, spawnRoom: room.name}}));
    }

    if(creepMap.harvester.length < 0) {
        var newName = 'Harvester' + Game.time;
        console.log("room: ", room.name, 'Spawning new harvester: ' + newName);
        if(creepMap.harvester.length < 4) {
           spawn.spawnCreep([WORK,WORK,CARRY,MOVE], newName,
                {memory: {role: 'harvester', sourceId:  room.memory.nextSourceId, spawnRoom: room.name}});
        } else {
//            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName,
            spawn.spawnCreep([WORK,WORK,CARRY,MOVE,CARRY,MOVE], newName,
                {memory: {role: 'harvester', sourceId:  room.memory.nextSourceId, spawnRoom: room.name}});
        }
    } else if(creepMap.dropper.length < 0) {
        var newName = 'Dropper' + Game.time;
        console.log("room: ", room.name, 'Spawning new Dropper: ' + newName);
       spawn.spawnCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE], newName,
            {memory: {role: 'dropper', spawnRoom: room.name}});
    } else if(creepMap.linkFiller.length < 0) {
        var newName = 'LinkFiller' + Game.time;
        console.log("room: ", room.name, 'Spawning new LinkFiller: ' + newName);
        spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], newName,
            {memory: {role: 'linkFiller'}, spawnRoom: room.name});
    } else if(creepMap.linkPuller.length < 0) {
        var newName = 'LinkPuller' + Game.time;
        console.log("room: ", room.name, 'Spawning new LinkPuller: ' + newName);
        spawn.spawnCreep([CARRY,MOVE,CARRY,MOVE], newName,
            {memory: {role: 'linkPuller'}, spawnRoom: room.name});
    } else if(creepMap.containerFiller.length < 0) {
        var newName = 'ContainerFiller' + Game.time;
        console.log("room: ", room.name, 'Spawning new ContainerFiller: ' + newName);
//        spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], newName,
        spawn.spawnCreep([WORK,WORK,WORK,WORK,CARRY,MOVE], newName,
            {memory: {role: 'containerFiller', sourceId:  room.memory.nextSourceId, spawnRoom: room.name}});
    } else if(creepMap.upgrader.length < 5) {
        var newName = 'Upgrader' + Game.time;
        console.log("room: ", room.name, 'Spawning new upgrader: ' + newName);
        if(creepMap.upgrader.length < 4) {
            spawn.spawnCreep([WORK,WORK,CARRY,MOVE], newName,
                {memory: {role: 'upgrader', sourceId:  room.memory.nextSourceId, spawnRoom: room.name}});
        } else {
            spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'upgrader', sourceId:  room.memory.nextSourceId, spawnRoom: room.name}});
        }
    } else if(creepMap.upgraderRemote.length < 2) {
        var newName = 'UpgraderRemote' + Game.time;
        console.log("room: ", room.name, 'Spawning new upgraderRemote: ' + newName);
        spawn.spawnCreep([CARRY,MOVE,CARRY,MOVE], newName,
//        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,WORK,WORK,WORK,WORK,WORK,MOVE], newName,
            {memory: {role: 'upgraderRemote', sourceId:  room.memory.nextSourceId, spawnRoom: room.name}});
    } else if(creepMap.roadworker.length < 4 ) {
         if(creepMap.roadworker.length < 3 ) {
        var newName = 'Roadworker' + Game.time;
        console.log("room: ", room.name, 'Spawning new roadworker: ' + newName);
            spawn.spawnCreep([WORK,WORK,CARRY,MOVE], newName,
            {memory: {role: 'roadworker', sourceId:  room.memory.nextSourceId, spawnRoom: room.name}});
        } else {
        var newName = 'Roadworker' + Game.time;
            spawn.spawnCreep([WORK,WORK,WORK,CARRY,MOVE,CARRY,MOVE,MOVE], newName,
            {memory: {role: 'roadworker', sourceId:  room.memory.nextSourceId, spawnRoom: room.name}});
        }
    } else if(creepMap.worker.length < 3 ) {
        var newName = 'Worker' + Game.time;
        console.log("room: ", room.name, 'Spawning new Worker: ' + newName);
        if(creepMap.worker.length < 3) {
            spawn.spawnCreep([CARRY,MOVE,CARRY,MOVE], newName,
            {memory: {role: 'worker', sourceId:  room.memory.nextSourceId, spawnRoom: room.name}});
        } else {
//            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
        spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName,
//        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName,
            {memory: {role: 'worker', sourceId:  room.memory.nextSourceId, spawnRoom: room.name}});


        }
    }
*/
    if(spawn.spawning) {
        var spawningCreep = Game.creeps[spawn.spawning.name];
        spawn.room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            spawn.pos.x + 1,
            spawn.pos.y,
            {align: 'left', opacity: 0.8});
    }

}
}

module.exports = roomManager;
