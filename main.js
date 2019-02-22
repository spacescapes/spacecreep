var roleContainerDistributor = require('role.containerDistributor');
var roleUpgrader = require('role.upgrader');
var roleHarvester = require('role.harvester');
var roleRoadworker = require('role.roadworker');
var roleCollector = require('role.collector');
var roleHealer = require('role.healer');
var roleLinkPuller = require('role.linkPuller');
var roleLinkFiller = require('role.linkFiller');
var roleDropper = require('role.dropper');
var roleUpgraderRemote = require('role.upgraderRemote');
var roleLabworker = require('role.labworker');
var roleLorry = require('role.lorry');
var roleDoer = require('role.doer');
var roleAttacker = require('role.attacker');
var roleClaimer = require('role.claimer');
var roleTower = require('role.tower');
var roleTerminalEqualizer = require('role.terminalEqualizer');
var roleContainerFiller = require('role.containerFiller');
var mainHelper = require('main.helper');
var roomManager = require('room.manager');

Memory.ta={}


module.exports.loop = function () {
    console.log("-------------")
if (Game.time % 100 == 1){
    return(0)
}
/*
    if (false){
    Game.getObjectById('5bf0b4dc260e1709efb22cd6').Creep([MOVE], ('worm' + '-' + Game.time),
                    {memory: {role: 'healer', autoSpawn: true, spawnRoomName: 'Spawn11', sf: 'H1'}})
    }
*/

//    mainHelper.marketTrade()
// W55S27 (haupt)
//    console.log("send: "+Game.getObjectById('5c06f54b77ed0b360efdb7b8').send(RESOURCE_ENERGY, 100000, 'W49N49'))
//    console.log("send: "+Game.getObjectById('5c0eb04df7d0906a4c3d28d4').send(RESOURCE_ENERGY, 100000, 'W49N49'))
//    console.log("send: "+Game.getObjectById('5c0d7951aaaa61554779a3e3').send(RESOURCE_ENERGY, 100000, 'W48N54'))


//  Game.creeps['H-0'].say(Game.creeps['H-0'].room.name)
//  mainHelper.recycleCreep(Game.creeps['H-88'])

    if (!Memory.spawnTick) Memory.spawnTick = {}

    Object.values(Game.rooms).forEach((room) =>{
        if (room.controller && room.controller.owner && room.controller.owner.username == 'helmut'){
          roomManager.run(room)
        }
    })


    if (!Memory.buildMap || (Game.time % 50) == 0) Memory.buildMap = {}


    Memory.spawnMap =
        {
            all:
            {
                room: {
                    spawnMaps: [
                        {name: "custom",
                        creeps: {
//                            'Lenemy2': {role: "labworker", sf: 'Senemy1', tf: 'S1', resource: 'L', recycleAfterDelivery: true, bodyparts: mainHelper.getBody(8,CARRY,8,MOVE)},
//                            'Lenemy3': {role: "labworker", sf: 'Senemy1', tf: 'S1', resource: 'L', recycleAfterDelivery: true, bodyparts: mainHelper.getBody(8,CARRY,8,MOVE)},
//                            'LSupport2': {role: "labworker", tf: 'S9', recycleAfterDelivery: true, bodyparts: mainHelper.getBody(8,CARRY,8,MOVE)},
//                            'LSupport3': {role: "labworker", tf: 'S4', recycleAfterDelivery: true, bodyparts: mainHelper.getBody(8,CARRY,8,MOVE)},
//                            'LSupport4': {role: "labworker", tf: 'S3', recycleAfterDelivery: true, bodyparts: mainHelper.getBody(8,CARRY,8,MOVE)},
//                            'L2': {role: "labworker", tf: 'S1', bodyparts: mainHelper.getBody(8,CARRY,8,MOVE)},
                            },
                            excludeRoom: "W49N49"
                        },
//                        {name: "scouts", copy: 3, sf: 'scouts', required: true},
                        ]
                }
            },

            W48N51:
            {
                room: {
                    construct: false,
                    debug: false,
                    spawnMaps: [
                        {name: "baseLorry", required: true, build: 'ur'},
//                        {name: "upgrader", copy: 1, room: 'W48N52' },
//                        {name: "claim", room: 'W47N51', required: true},

//                       {name: "remoteConstruction", sf: 'C1', copy: 3, required: true},
//                        {name: "remoteHarvest", room: 'W51N51', copy: 0},

//                        {name: "scouts", copy: 5, sf: 'scouts'},

//                        {name: "labworker", copy: 10, tf: 'S4', recycleAfterDelivery: true},
                        {name: "custom",
                        creeps:{


//                            'L1': {role: 'labworker', sf: 'S1', tf: 'container1', bodyparts: mainHelper.getBody(10,CARRY,5,MOVE)},


//                            'L4': {role: 'labworker', sf: 'T1', tf: 'S1', bodyparts: mainHelper.getBody(4,CARRY,1,MOVE)},
//                            'U1': {role: 'upgrader', room: 'W48N52', bodyparts: mainHelper.getBody(1,WORK,1,CARRY,2,MOVE)},
//                            'L2': {role: 'labworker', sf: 'S1', tf: 'container1', bodyparts: mainHelper.getBody(10,CARRY,5,MOVE)},
//                            'L21': {role: 'labworker', sf: 'S1', tf: 'container1', bodyparts: mainHelper.getBody(10,CARRY,5,MOVE)},
//                            'L22': {role: 'labworker', sf: 'S1', tf: 'container1', bodyparts: mainHelper.getBody(10,CARRY,5,MOVE)},


//                        'A31': {role: 'attacker', sf: 'A3', ar: 40, copy: 3, bodyparts: mainHelper.getBody(4,TOUGH,4,ATTACK,4,MOVE)},
//                        'He31': {role: 'healer', sf: 'A3' , bodyparts: mainHelper.getBody(2,HEAL,2,MOVE,)},
                        }},
                        {name: "upgrader", copy: 1},
//                        {name: "roadworker", copy: 4},

                        {name: "remoteHarvest", room: 'W47N51', copy: 1},
                        {name: "remoteHarvest", room: 'W49N51', copy: 2}

                        ]
                }
            },
            W48N52:
            {
                room: {
                    construct: false,
                    spawnMaps: [
                        {name: "baseLorry", required: true},
//                        {name: "remoteConstruction", sf: 'C1', copy: 3, required: true},
                        {name: "custom",
                        creeps:{
                        'A314': {role: 'attacker', sf: 'A4', ar: 40, copy: 3, bodyparts: mainHelper.getBody(4,TOUGH,4,ATTACK,4,MOVE)},
                        'He314': {role: 'healer', sf: 'A4' , bodyparts: mainHelper.getBody(2,HEAL,2,MOVE,)},
// 'L122': {role: 'labworker', sf: 'S3', tf: 'container2', bodyparts: mainHelper.getBody(10,CARRY,5,MOVE)},
/*
                        'L1xxx': {role: "labworker", tf: 'S1', resource: 'UH', recycleAfterDelivery: true, bodyparts: mainHelper.getBody(2,CARRY,1,MOVE)},
                        'L1xxx2': {role: "labworker", tf: 'S1', resource: 'KO', recycleAfterDelivery: true, bodyparts: mainHelper.getBody(2,CARRY,1,MOVE)},
                        'L1xxx3': {role: "labworker", tf: 'S1', resource: 'ZH', recycleAfterDelivery: true, bodyparts: mainHelper.getBody(2,CARRY,1,MOVE)}
*/
                        }},

                        {name: "upgrader", copy: 1},
//                        {name: "collector"},
//                        {name: "worker", copy: 2},
//                        {name: "roadworker", copy: 4},
                        {name: "remoteHarvest", room: 'W49N52', copy: 1},
                        {name: "remoteHarvest", room: 'W47N52', copy: 1},
//                        {name: "upgrader", copy: 2},

                        ]
                }
            },

            W51N51:
            {
                room: {
                    construct: true,
                    spawnMaps: [
                        {name: "baseLorry", required: true},
//                        {name: "remoteConstruction", sf: 'C1', copy: 3, required: true},
//                        {name: "upgrader", copy: 1},
//                        {name: "roadworker", copy: 4},
                        {name: "custom",
                        creeps:{
/*
                        'L31': {role: "labworker", sf: 'S2', tf: 'S1', recycleAfterDelivery: true, bodyparts: mainHelper.getBody(4,CARRY,4,MOVE)},
                        'L32': {role: "labworker", sf: 'S2', tf: 'S1', recycleAfterDelivery: true, bodyparts: mainHelper.getBody(4,CARRY,4,MOVE)},
                        'L33': {role: "labworker", sf: 'S2', tf: 'S1', recycleAfterDelivery: true, bodyparts: mainHelper.getBody(4,CARRY,4,MOVE)}
*/
                        }},
//                        {name: "upgrader", copy: 1},
                        {name: "remoteHarvest", room: 'W52N51', copy: 2},
                        {name: "remoteHarvest", room: 'W51N52', copy: 1},
                        {name: "remoteHarvest", room: 'W51N53', copy: 2},
//                        {name: "collector"},

                        ]
                }
            },
            W43N43:
            {
                room: {
                    construct: true,
                    debug: false,
                    roads: false,
                    spawnMaps: [
                        {name: "baseLorry", required: true},
//                        {name: "remoteConstruction", sf: 'C1', copy: 3, required: true},
                        {name: "upgrader", copy: 1},

                        {name: "remoteHarvest", room: 'W44N43', copy: 1},
                        {name: "remoteHarvest", room: 'W44N42', copy: 1},
                        {name: "remoteHarvest", room: 'W43N44', copy: 1},

//                        {name: "remoteHarvest", room: 'W42N43', copy: 2},

//                        {name: "roadworker", room: 'W42N43'},
//                        {name: "labworker", sf: 'S5', tf: 'container3', copy: 1},
//                        {name: "upgrader", room: 'W42N43', copy: 2},

                        {name: "custom",
                        creeps:{
                        'A511': {role: 'attacker', sf: 'A5', ar: 30, copy: 1, bodyparts: mainHelper.getBody(2,ATTACK,1,MOVE)},
//                        'L311a1energy': {role: "labworker", sf: 'S5', tf: 'container3', bodyparts: mainHelper.getBody(10,CARRY,5,MOVE)},
//                        'L311a1energy2': {role: "labworker", sf: 'S5', tf: 'container3', bodyparts: mainHelper.getBody(10,CARRY,5,MOVE)},
//                        'L311a1energy3': {role: "labworker", sf: 'S5', tf: 'container3', bodyparts: mainHelper.getBody(10,CARRY,5,MOVE)},
//                        'L311a2': {role: "labworker", sf: 'S12', tf: 'S5', resource: RESOURCE_KEANIUM, bodyparts: mainHelper.getBody(10,CARRY,10,MOVE)},
//                        'L311a3': {role: "labworker", sf: 'S12', tf: 'S5', resource: RESOURCE_KEANIUM, bodyparts: mainHelper.getBody(10,CARRY,10,MOVE)},
//                        'He511': {role: 'healer', sf: 'A5', follow:'A511', bodyparts: mainHelper.getBody(7,TOUGH,1,HEAL,4,MOVE,), required:true},
                        }
                        }
//                        {name: "remoteConstruction", room: 'W39N44', sf: 'C4', copy: 2},
//                        {name: "collector"},
//                        {name: "worker"}
                        ]
                }
            },
            W49N49:
            {
                room: {
                    debug: false,
                    construct: true,
                    spawnMaps: [
                        {name: "baseLorry", required: true},
//                        {name: "attacker", sf: 'A6', ar: 30, copy: 1, required: true},
                         {name: "custom",
                        creeps:{
//                        'RUpgrade102a1': {role: "upgrader", room: 'W48N46', sf: 'C11', bodyparts: mainHelper.getBody(10,WORK,2,CARRY,12,MOVE)},
//                        'RRoadworker102a2': {role: "roadworker", room: 'W48N46', sf: 'C11', bodyparts: mainHelper.getBody(7,WORK,7,CARRY,14,MOVE)},
//                        'RRoadworker102a3': {role: "roadworker", room: 'W48N46', sf: 'C11', bodyparts: mainHelper.getBody(7,WORK,7,CARRY,14,MOVE)},

//                        'LSupport31': {role: "labworker", tf: 'S10', recycleAfterDelivery: true, bodyparts: mainHelper.getBody(14,CARRY,14,MOVE)},
//                        'LSupport32': {role: "labworker", tf: 'S10', recycleAfterDelivery: true, bodyparts: mainHelper.getBody(14,CARRY,14,MOVE)},
//                        'LSupport33': {role: "labworker", tf: 'S10', recycleAfterDelivery: true, bodyparts: mainHelper.getBody(14,CARRY,14,MOVE)},
//                        'LSupport34': {role: "labworker", tf: 'S10', recycleAfterDelivery: true, bodyparts: mainHelper.getBody(14,CARRY,14,MOVE)},
//                        'LSupport33': {role: "labworker", tf: 'S10', recycleAfterDelivery: true, bodyparts: mainHelper.getBody(8,CARRY,8,MOVE)},
//                        'LSupport34': {role: "labworker", tf: 'S10', recycleAfterDelivery: true, bodyparts: mainHelper.getBody(8,CARRY,8,MOVE)},
                        'A1B': {role: "attacker", sf: 'A6', bodyparts: mainHelper.getBody(3,ATTACK,3,MOVE), follower: 'H1B'},
                        'H1B': {role: "healer", sf: 'A6', bodyparts: mainHelper.getBody(2,HEAL,2,MOVE), follow: 'A1B'},
//                        'C8': {role: "claimer", sf: 'C8', claim:true, bodyparts: mainHelper.getBody(2,CLAIM,2,MOVE)},
                        }},
                        {name: "upgrader", copy: 1},
//                         {name: "roadworker", copy: 3},
//                        {name: "remoteConstruction", room: 'W48N46', sf: 'C11',  copy: 1},

                        {name: "remoteHarvest", room: 'W49N48', copy: 1},
                        {name: "remoteHarvest", room: 'W48N49', copy: 1},
                        {name: "remoteHarvest", room: 'W48N48', copy: 1},
//                        {name: "roadworker", copy: 2},
                        ]
                }
            },
            W48N54:
            {
                room: {
                    construct: true,
                    debug: false,
                    boost: {sf: 'T6', tf:'L6',  resource: RESOURCE_CATALYZED_GHODIUM_ACID},
                    spawnMaps: [

                        {name: "baseLorry", required: true},
//                        {name: "remoteConstruction", sf: 'C1', copy: 3, required: true},
                        {name: "upgrader", copy: 3},
//                        {name: "roadworker", copy: 4},
                        { name: "custom",
                          creeps:{
//                        'L611': {role: 'labworker', sf:'T6', tf:'L6', bodyparts: mainHelper.getBody(4,CARRY,2,MOVE), resource: RESOURCE_CATALYZED_GHODIUM_ACID},
                        'A312': {role: 'attacker', sf: 'A3', ar: 40, copy: 3, bodyparts: mainHelper.getBody(2,TOUGH,2,ATTACK,4,MOVE)},
//                        'He312': {role: 'healer', sf: 'A3' , bodyparts: mainHelper.getBody(2,HEAL,2,MOVE,)},

//                        'R211get1': {role: "roadworker", room: 'W48N53', bodyparts: mainHelper.getBody(2,WORK,2,CARRY,2,MOVE)},
                        }},

                        {name: "remoteHarvest", room: 'W48N55', copy: 1},
                        {name: "remoteHarvest", room: 'W49N53', copy: 2},
                        {name: "remoteHarvest", room: 'W49N54', copy: 1},
                        {name: "remoteHarvest", room: 'W48N53', copy: 2},
                        {name: "remoteHarvest", room: 'W47N55', copy: 1},
                        {name: "remoteHarvest", room: 'W47N53', copy: 1},

                        ]
                }
            },
            W48N46:
            {
                room: {
                    construct: true,
                    roads: false,
                    spawnMaps: [
                        {name: "baseLorry", required: true},



                        {name: "upgrader", copy: 1},
                        {name: "remoteHarvest", room: 'W48N47', copy: 1},
                        {name: "remoteHarvest", room: 'W47N46', copy: 1},
                        {name: "remoteHarvest", room: 'W47N45', copy: 1},
                        ]
                }
            },
            W42N43:
            {
                room: {
                    debug: false,
                    construct: true,
                    roads: false,
                    spawnMaps: [
                        {name: "baseLorry", required: true},

                        { name: "custom",

                          creeps:{

//                            'LLabwork102': {role: "labworker", room: 'W43N43', tf: 'S5', recycleAfterDelivery: true, bodyparts: mainHelper.getBody(12,CARRY,12,MOVE)},

                        }},

//                        {name: "upgrader", copy: 1},
//                        {name: "roadworker", copy: 2},
                        {name: "remoteHarvest", room: 'W41N42', copy: 1},
                        {name: "remoteHarvest", room: 'W41N43', copy: 1},
                        {name: "remoteHarvest", room: 'W41N44', copy: 1},
//                        {name: "remoteHarvest", room: 'W41N44', copy: 1},
//                        {name: "remoteConstruction", room: 'W38N38', sf: 'C9', copy: 2},
                        {name: "remoteConstruction", room: 'W42N35', sf: 'C2', copy: 2},
                        ]
                }
            },
            W38N38:
            {
                room: {
                    construct: true,
                    roads: false,
                    spawnMaps: [
                        {name: "baseLorry", required: true},
                        {name: "upgrader", copy: 1},
                        {name: "remoteHarvest", room: 'W38N37', copy: 1},
                        {name: "remoteHarvest", room: 'W38N39', copy: 1},
                        {name: "remoteConstruction", room: 'W32N38', sf: 'C1', copy: 2},
                        ]
                }
            },
            W39N49:
            {
                room: {
                    construct: true,
                    roads: false,
                    spawnMaps: [
                        {name: "baseLorry", required: true},
                        {name: "upgrader", copy: 2},
                        {name: "remoteHarvest", room: 'W38N49', copy: 2},
                        {name: "remoteConstruction", room: 'W37N48', sf: 'C3', copy: 2},
                        ]
                }
            },
            default:
            {
                room: {
                    construct: false,
                    spawnMaps: [
                        {name: "baseLorry", required: true},
                        {name: "roadworker", copy: 2},
                        {name: "worker"}
                        ]
                }
            },
            sim:
            {
                room: {
                    autoSpawnMapNames: ["base"]
                },
                creeps: {

                    'A1': {role: 'attacker', sf: 'A1', ar: 10, bodyparts: [ATTACK,MOVE]},
                    'A2': {role: 'attacker', sf: 'A1', ar: 10, bodyparts: [ATTACK,MOVE]},
                    'A3': {role: 'attacker', sf: 'A1', ar: 10, bodyparts: mainHelper.getBody(1,MOVE,2,TOUGH,1,TOUGH)},
                    'H1': {role: 'harvester', sf: 'A1', ar: 10, bodyparts: mainHelper.getBody(2,WORK,1,CARRY,1,MOVE)},
//                     'H2': {role: 'harvester', sf: 'C8', ar: 10, bodyparts: mainHelper.getBody(2,WORK,2,MOVE)},

                }
            }

        }

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }


    for(var name in Game.creeps) {

        var creep = Game.creeps[name];


//        creep.say("a"+creep.memory.spawnRoomName)


//ANKER
/*
            if ((creep.memory.role == 'upgrader' || creep.memory.role == 'roadworker'  || creep.memory.role == 'harvester' || creep.memory.role == 'worker'  ) && Memory.spawnMap[creep.room.name] && Memory.spawnMap[creep.room.name].room.construct && !creep.pos.lookFor(LOOK_STRUCTURES).find((s)=>(s.structureType==STRUCTURE_ROAD))){
//                creep.say("registering")
//                console.log("road "+creep.pos.lookFor(LOOK_STRUCTURES).find((s)=>(s.structureType==STRUCTURE_ROAD)))
                if (!Memory.buildMap[creep.room.name]) Memory.buildMap[creep.room.name] = {}
                if (!Memory.buildMap[creep.room.name][creep.pos.x]) Memory.buildMap[creep.room.name][creep.pos.x] = {}
                if (!Memory.buildMap[creep.room.name][creep.pos.x][creep.pos.y]) Memory.buildMap[creep.room.name][creep.pos.x][creep.pos.y] = 0
                Memory.buildMap[creep.room.name][creep.pos.x][creep.pos.y]=Memory.buildMap[creep.room.name][creep.pos.x][creep.pos.y]+1;
//                console.log(JSON.stringify( Memory.buildMap ))
                if (Memory.buildMap[creep.room.name][creep.pos.x][creep.pos.y]>=5){
                    creep.say("construct")
                    if (creep.room.find(FIND_CONSTRUCTION_SITES).length < 2){
                        creep.room.createConstructionSite(creep.pos, STRUCTURE_ROAD)
                    }
                    Memory.buildMap[creep.room.name] = {}
                }
            }
*/
    if (creep.name == 'XE-baseLorry-1-W48N54') {
//        creep.memory.role = 'labworker'
            creep.memory.sf = 'S6';        creep.memory.tf = 'L6';        creep.memory.resource = RESOURCE_CATALYZED_GHODIUM_ACID; /*creep.memory.resource = RESOURCE_ENERGY;*/
    }

    if (creep.memory.follower){
        var follower = Game.creeps[creep.memory.follower]
//        if (!creep.pos.inRangeTo(master)){
          if (follower && !creep.pos.inRangeTo(follower,1)){
            creep.moveTo(follower)
            continue
        }

    }
    if (creep.memory.follow){
        var master = Game.creeps[creep.memory.follow]
//        if (!creep.pos.inRangeTo(master)){
          if (master){
            creep.moveTo(master)
        }
    }

    if (Memory.spawnMap[creep.memory.spawnRoomName] && Memory.spawnMap[creep.memory.spawnRoomName].generatedMap ){
        var mapEntry = Memory.spawnMap[creep.memory.spawnRoomName].generatedMap[creep.name];
        if (mapEntry){
            var spawnRoomName = creep.memory.spawnRoomName
            creep.memory = mapEntry
            creep.memory.spawnRoomName = spawnRoomName
        }
    }

    const RENEW = true
    if (!RENEW){creep.memory.renewing = false}
    if (RENEW) {
        if ( creep.memory.role != 'claimer' && creep.memory.renewing)    {
            creep.say("renew")
            if (creep.memory.renewDeclined){
                creep.memory.renewDeclined = false
            } else  {
                creep.say("feel old")
                var spawn = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => structure.structureType == STRUCTURE_SPAWN && !structure.spawning})
                if (spawn) {
                    creep.say("feel old")
                    if (creep.ticksToLive > 1310){
                       creep.memory.renewing = false
                    }
                    if (creep.pos.inRangeTo(spawn, 1)){
                        creep.memory.stay = creep.memory.stay + 1
                    } else {
                        creep.moveTo(spawn)
                    }
                    if (creep.memory.stay > 10 ){
                        creep.moveTo(1,1)
                        creep.memory.stay = 0
                    }
                    continue
                } else {
                    creep.memory.renewing = false

                }
            }
        }
    }
//    return(0)

//if (creep.fatigue>0) console.log("fat: "+creep.name)
//        if (creep.name.startsWith('R1New')) creep.memory.role='roadworker'
//        if (creep.name.startsWith('R1New')) creep.memory.role='upgrader'
//console.log(creep.memory.role)

        creep.room.visual.text(
            creep.memory.role + " "+ creep.name ,
            creep.pos.x + 1, creep.pos.y,
            {align: 'left', opacity: 0.7, font: 0.6});
//if (creep.name=='RE411173b'){creep.memory.role='upgrader'}
if (creep.name=='He5141'){creep.memory.role='healer'}

//console.log(creep.memory.role)

        if(creep.memory.role == 'harvester') {
          roleHarvester.run(creep);
//            roleRoadworker.run(creep);
//            roleUpgrader.run(creep);
//            roleRoadworker.run(creep);
        } else if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
//            roleHarvester.run(creep);
//            roleCollector.run(creep)
//            roleRoadworker.run(creep);
//            roleContainerFiller.run(creep);
//          roleContainerDistributor.run(creep)
//            roleWorker.run(creep);
        } else if(creep.memory.role == 'lorry') {
                roleLorry.run(creep);
        } else if(creep.memory.role == 'roadworker') {
                roleRoadworker.run(creep);
//mainHelper.recycleCreep(creep)
//            roleCollector.run(creep);
//            roleHarvester.run(creep);
//            roleUpgrader.run(creep)
//            roleContainerFiller.run(creep);
//          roleContainerDistributor.run(creep)
//            roleCollector.run(creep)
//            roleWorker.run(creep);
//            creep.moveTo(25,25)
        } else if(creep.memory.role == 'worker') {
          roleContainerDistributor.run(creep)
//                      roleContainerFiller.run(creep);
//            roleWorker.run(creep);
//            roleRoadworker.run(creep);
//          roleHarvester.run(creep);
//            roleUpgrader.run(creep);
        } else if(creep.memory.role == 'upgraderRemote') {
            roleUpgraderRemote.run(creep);
        } else if(creep.memory.role == 'linkPuller') {
          roleLinkPuller.run(creep)
        } else if(creep.memory.role == 'linkFiller') {
          roleLinkFiller.run(creep)
        } else if(creep.memory.role == 'containerFiller') {
            roleContainerFiller.run(creep);
        } else if(creep.memory.role == 'attacker') {
            roleAttacker.run(creep);
        } else if(creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
        } else if(creep.memory.role == 'healer') {
            roleHealer.run(creep);
        } else if(creep.memory.role == 'terminalEqualizer') {
            roleTerminalEqualizer.run(creep);
        } else if(creep.memory.role == 'dropper') {
            roleDropper.run(creep);
//            roleContainerFiller.run(creep);
        } else if(creep.memory.role == 'collector') {
            roleCollector.run(creep);
        } else if(creep.memory.role == 'labworker') {
//mainHelper.recycleCreep(creep)
            roleLabworker.run(creep);
        } else if(creep.memory.role == 'doer') {
            roleDoer.run(creep);
        }
//        creep.moveTo(1,1)
//if (creep.name=='He23' || creep.name == 'He111') creep.moveTo(20,4)
//creep.moveTo(33,21)
//creep.moveTo(40,44)
//Game.creeps['Roadworker7821998'].memory.sourceId=undefined
//Game.creeps['Upgrader7908785'].moveTo(45,45)
//Game.creeps['Upgrader7907457'].moveTo(45,45)
//for (name in Game.creeps) {
//        if (creep.name!='ContainerFiller7985517') creep.moveTo(1,5)
//       if (creep.memory.role!='containerFiller') creep.moveTo(1,1)
//       if (creep.memory.role=='containerFiller') creep.moveTo(45,42)
//       if (creep.name=='ContainerFiller7987040') creep.moveTo(45,42)
//}
//creep.moveTo(1,1)
//Game.creeps['Harvester7841134'].moveTo(20,12)
        if (creep.name == 'R412' || creep.name == 'R411'){
// creep.moveTo(1,1)
 //            dismantle(creep)
        }

    }


}
