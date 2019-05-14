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
var roleEnergyDelivery = require('role.energyDelivery');
var mainHelper = require('main.helper');
var roomManager = require('room.manager');

Memory.ta={}

Creep.test = function(creep){
    creep.say("CREEP")
}

module.exports.loop = function () {
    console.log("-------------")
    if (Game.time % 100 == 1){
    //    return(0)
    }


//    var buyResources = new Array(RESOURCE_CATALYZED_UTRIUM_ACID,RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE,RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE,RESOURCE_CATALYZED_GHODIUM_ALKALIDE,RESOURCE_CATALYZED_GHODIUM_ACID)
    var buyResources = new Array(RESOURCE_CATALYZED_UTRIUM_ACID)
    for (var resource of buyResources){
//        console.log("check: "+ resource + " " + dealResult + " " + Game.rooms["W48N51"].terminal.store[resource])
        if (!Game.rooms["W48N54"].terminal.store[resource] || (Game.rooms["W48N54"].terminal.store[resource] < 5000)){
//            var sellOrders = Game.market.getAllOrders({type: ORDER_SELL, resourceType: resource});
//            var minOrder = _.min(sellOrders, ((a) => (a.price)));
//            var dealResult = Game.market.deal(minOrder.id, 1000, "W48N54")
//            console.log("buy: "+ resource + " " + dealResult)
        }

    }

//Game.getObjectById("5c4b7d9fe9e68c62bcfead2c").observeRoom("W47N43")

//for (var g in Game.constructionSites){if (Game.constructionSites[g].progress == 0 && Game.constructionSites[g].structureType == STRUCTURE_ROAD) {Game.constructionSites[g].remove()}}

//Game.getObjectById("5c9595f307b8cc5ff5ddc2af").send(RESOURCE_ENERGY, 600, "W48N46")
//Game.getObjectById("5c07a8f4806a5c4c7a0490b0").send(RESOURCE_ENERGY, 600, "W48N46")
//Game.rooms.W42N43.controller.activateSafeMode()
    mainHelper.buildSetup()
    mainHelper.marketTrade()

//    console.log("send: "+Game.getObjectById('5c06f54b77ed0b360efdb7b8').send(RESOURCE_ENERGY, 100000, 'W49N49'))


//  mainHelper.recycleCreep(Game.creeps['H1B'])

    if (!Memory.spawnTick) Memory.spawnTick = {}

    Object.values(Game.rooms).forEach((room) =>{
        if (room.controller && room.controller.owner && room.controller.owner.username == 'helmut'){
          roomManager.run(room)
        }
    })

    Memory.reserve = {}
    if (!Memory.buildMap || (Game.time % 50) == 0) Memory.buildMap = {}


    Memory.spawnMap =
        {
            all:
            {
                room: {
                    spawnMaps: [
//                    {name: "roadworkerFast", copy: 4, room: 'W43N43', via: 'V3'},
                        {name: "custom",
                        creeps: {
//                            'Lenemy2': {role: "labworker", sf: 'Senemy1', tf: 'S1', resource: 'L', recycleAfterDelivery: true, bodyparts: mainHelper.getBody(8,CARRY,8,MOVE)},
//                            'Lenemy3': {role: "labworker", sf: 'Senemy1', tf: 'S1', resource: 'L', recycleAfterDelivery: true, bodyparts: mainHelper.getBody(8,CARRY,8,MOVE)},
//                            'LSupport2': {role: "labworker", tf: 'S9', recycleAfterDelivery: true, bodyparts: mainHelper.getBody(8,CARRY,8,MOVE)},
//                            'LSupport3': {role: "labworker", tf: 'S4', recycleAfterDelivery: true, bodyparts: mainHelper.getBody(8,CARRY,8,MOVE)},
//                            'LSupport4': {role: "labworker", tf: 'S3', recycleAfterDelivery: true, bodyparts: mainHelper.getBody(8,CARRY,8,MOVE)},
//                            'L2': {role: "labworker", tf: 'S1', bodyparts: mainHelper.getBody(8,CARRY,8,MOVE)},
/*
                            'A1': {role: "attacker", sf: 'A5', bodyparts: mainHelper.getMixedBody(1,MOVE,ATTACK), ar: 40, via: 'V1', boost: true},

                            'H1': {role: "healer", sf: 'A5', bodyparts: mainHelper.getMixedBody(25,MOVE,HEAL), via: 'V1'},
                            'A2': {role: "attacker", sf: 'A2', bodyparts: mainHelper.getMixedBody(25,MOVE,ATTACK), ar: 40, via: 'V1'},
                            'H2': {role: "healer", sf: 'A2', bodyparts: mainHelper.getMixedBody(25,MOVE,HEAL), via: 'V1'},
                            'H3': {role: "healer", sf: 'A1', bodyparts: mainHelper.getMixedBody(25,MOVE,HEAL), via: 'V1'},
*/
/*
*/
                            },
//                            excludeRoom: "W49N49"
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
//                        {name: "labworker", required: true, copy: 2},
//                        {name: "energyDelivery", room: 'W48N46', copy: 4},
//                        {name: "energyDelivery", room: 'W47N44', copy: 4},
//                        {name: "energyDelivery", room: 'W49N49', copy: 4},
//                        {name: "roadworker", copy: 3, room: 'W49N49' },
//                        {name: "upgrader", copy: 1},
                        {name: "roadworker", copy: 1 },
//                        {name: "roadworkerFast", copy: 1, room: 'W43N43' },
//                        {name: "upgraderFast", copy: 1, room: 'W43N43' },

//                        {name: "claim", room: 'W47N51', required: true},

//                        {name: "remoteHarvest", room: 'W51N51', copy: 0},

//                        {name: "scouts", copy: 5, sf: 'scouts'},

//                        {name: "labworker", copy: 10, tf: 'S4', recycleAfterDelivery: true},

                        {name: "custom",
                        creeps:{

//                            'A1': {role: "attacker", sf: 'A5', bodyparts: mainHelper.getMixedBody(1,MOVE,ATTACK), ar: 40, via: 'V1', boost: true},

/*
                            'A2': {role: "attacker", sf: 'A5', bodyparts: mainHelper.getMixedBodyGood(1,[MOVE,ATTACK],1,[HEAL]), ar: 40, via: 'V1', boost: true},
                            'A1': {role: "attacker", sf: 'A5', bodyparts: mainHelper.getMixedBodyGood(5,[TOUGH],30,[ATTACK],12,[MOVE], 3,[HEAL]), ar: 40, via: 'V1', boost: true},
                            'A3': {role: "attacker", sf: 'A5', bodyparts: mainHelper.getMixedBodyGood(5,[TOUGH],30,[ATTACK],12,[MOVE], 3,[HEAL]), ar: 40, via: 'V1', boost: true},
                            'A5': {role: "attacker", sf: 'A5', bodyparts: mainHelper.getMixedBodyGood(5,[TOUGH],30,[ATTACK],12,[MOVE], 3,[HEAL]), ar: 40, via: 'V1', boost: true},

                            'A6': {role: "attacker", sf: 'A7', bodyparts: mainHelper.getMixedBodyGood(5,[TOUGH],30,[ATTACK],12,[MOVE], 3,[HEAL]), ar: 40,  boost: true},


                            'H5': {role: "healer", sf: 'A2', bodyparts: mainHelper.getMixedBodyGood(3,[TOUGH],3,[HEAL],6,[MOVE]),  via: 'V1'},
                            'H3': {role: "healer", sf: 'A5', bodyparts: mainHelper.getMixedBodyGood(13,[TOUGH],25,[HEAL],12,[MOVE]), follow: 'A1', via: 'V1', boost: true},
                            'H4': {role: "healer", sf: 'A5', bodyparts: mainHelper.getMixedBodyGood(13,[TOUGH],25,[HEAL],12,[MOVE]), follow: 'A1', via: 'V1', boost: true},
*/

/*
                            'A41': {role: "attacker", sf: 'A5', bodyparts: mainHelper.getMixedBody(25,ATTACK,MOVE), ar: 40, via: 'V1'},
                            'A42': {role: "attacker", sf: 'A5', bodyparts: mainHelper.getMixedBody(25,ATTACK,MOVE), ar: 40, via: 'V1'},
                            'A43': {role: "attacker", sf: 'A5', bodyparts: mainHelper.getMixedBody(25,ATTACK,MOVE), ar: 40, via: 'V1'},
//                            'A54': {role: "attacker", sf: 'A5', bodyparts: mainHelper.getMixedBody(25,ATTACK,MOVE), ar: 40},
//                            'A45': {role: "attacker", sf: 'A5', bodyparts: mainHelper.getMixedBody(25,RANGED_ATTACK,MOVE), ar: 40, via: 'V1'},
                            'H41': {role: "healer", sf: 'A5', bodyparts: mainHelper.getMixedBody(25,HEAL,MOVE), follow: 'A41', via: 'V1'},
                            'H42': {role: "healer", sf: 'A5', bodyparts: mainHelper.getMixedBody(25,HEAL,MOVE), follow: 'A41', via: 'V1'},
                            'H43': {role: "healer", sf: 'A5', bodyparts: mainHelper.getMixedBody(25,HEAL,MOVE), follow: 'A41', via: 'V1'},
                            'H44': {role: "healer", sf: 'A5', bodyparts: mainHelper.getMixedBody(25,HEAL,MOVE), follow: 'A41', via: 'V1'},
*/
//                            'H2B': {role: "healer", sf: 'A2', bodyparts: mainHelper.getBody(25,HEAL,25,MOVE), follow: 'A2B'},
//                            'A2B': {role: "attacker", sf: 'A2', bodyparts: mainHelper.getBody(20,ATTACK,21,MOVE,1,HEAL), follower: 'H2B', ar: 40},
//                        'A1C': {role: "attacker", sf: 'A6', bodyparts: mainHelper.getBody(21,MOVE,1,CARRY,20,ATTACK), follower: 'H1C'},
//                        'A2B': {role: "attacker", sf: 'A6', bodyparts: mainHelper.getBody(21,MOVE,1,CARRY,20,ATTACK), follower: 'H1B'},
//                        'H1C': {role: "healer", sf: 'A6', bodyparts: mainHelper.getBody(20,HEAL,20,MOVE), follow: 'A1C'},
//                        'H2C': {role: "healer", sf: 'A6', bodyparts: mainHelper.getBody(20,HEAL,20,MOVE), follow: 'A1C'},

//                            'L1': {role: 'labworker', sf: 'S1', tf: 'container1', bodyparts: mainHelper.getBody(10,CARRY,5,MOVE)},


//                            'L4': {role: 'labworker', sf: 'T1', tf: 'S1', bodyparts: mainHelper.getBody(4,CARRY,1,MOVE)},
//                            'U1': {role: 'upgrader', room: 'W48N52', bodyparts: mainHelper.getBody(1,WORK,1,CARRY,2,MOVE)},
//                            'L2': {role: 'labworker', sf: 'S1', tf: 'container1', bodyparts: mainHelper.getBody(10,CARRY,5,MOVE)},
//                            'L21': {role: 'labworker', sf: 'S1', tf: 'container1', bodyparts: mainHelper.getBody(10,CARRY,5,MOVE)},
//                            'L22': {role: 'labworker', sf: 'S1', tf: 'container1', bodyparts: mainHelper.getBody(10,CARRY,5,MOVE)},


//                        'A31': {role: 'attacker', sf: 'A3', ar: 40, copy: 3, bodyparts: mainHelper.getBody(4,TOUGH,4,ATTACK,4,MOVE)},
//                        'He31': {role: 'healer', sf: 'A3' , bodyparts: mainHelper.getBody(2,HEAL,2,MOVE,)},
//                                'Co93': {role: 'collector', bodyparts: mainHelper.getBody(4,CARRY,4,MOVE)},

                        }},
                        {name: "upgrader", copy: 1},
//                        {name: "roadworker", copy: 4},

                        {name: "remoteHarvest", room: 'W47N51', copy: 1},
                        {name: "remoteHarvest", room: 'W49N51', copy: 2},
                        {name: "remoteConstruction", room: 'W48N52', copy: 1},
                        {name: "remoteConstruction", room: 'W48N54', copy: 2},

//                        {name: "remoteConstruction", room: 'W49N49', copy: 3},
//                        {name: "remoteConstruction", room: 'W39N49', copy: 3},
//                        {name: "remoteConstruction", room: 'W39N47', copy: 3},

                        ]
                }
            },
            W48N52:
            {
                room: {
                    construct: false,
                    spawnMaps: [
                        {name: "baseLorry", required: true},
//                        {name: "remoteConstruction", room: 'W48N51', copy: 2},
//                        {name: "roadworker", copy: 3 },
                        {name: "custom",
                        creeps:{
//                        'A31': {role: 'attacker', sf: 'A7', ar: 40, copy: 3, bodyparts: mainHelper.getBody(4,TOUGH,4,ATTACK,4,MOVE)},
//                            'DM1': {role: 'dropper', sf: 'M1', mineral: true, bodyparts: mainHelper.getBody(10,WORK,5,MOVE)},
//                            'Co1': {role: 'collector', bodyparts: mainHelper.getBody(2,CARRY,1,MOVE)},
// 'L122': {role: 'labworker', sf: 'S3', tf: 'container2', bodyparts: mainHelper.getBody(10,CARRY,5,MOVE)},
/*
                        'L1xxx': {role: "labworker", tf: 'S1', resource: 'UH', recycleAfterDelivery: true, bodyparts: mainHelper.getBody(2,CARRY,1,MOVE)},
                        'L1xxx2': {role: "labworker", tf: 'S1', resource: 'KO', recycleAfterDelivery: true, bodyparts: mainHelper.getBody(2,CARRY,1,MOVE)},
                        'L1xxx3': {role: "labworker", tf: 'S1', resource: 'ZH', recycleAfterDelivery: true, bodyparts: mainHelper.getBody(2,CARRY,1,MOVE)}
*/
//                                'Co83': {role: 'collector', bodyparts: mainHelper.getBody(4,CARRY,4,MOVE)},

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
//                            'He31': {role: 'healer', sf: 'A1' , bodyparts: mainHelper.getBody(25,HEAL,25,MOVE)},
/*
                        'L31': {role: "labworker", sf: 'S2', tf: 'S1', recycleAfterDelivery: true, bodyparts: mainHelper.getBody(4,CARRY,4,MOVE)},
                        'L32': {role: "labworker", sf: 'S2', tf: 'S1', recycleAfterDelivery: true, bodyparts: mainHelper.getBody(4,CARRY,4,MOVE)},
                        'L33': {role: "labworker", sf: 'S2', tf: 'S1', recycleAfterDelivery: true, bodyparts: mainHelper.getBody(4,CARRY,4,MOVE)}
*/
//                                'Co73': {role: 'collector', bodyparts: mainHelper.getBody(4,CARRY,4,MOVE)},

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
                    construct: false,
                    debug: false,
                    roads: false,
                    spawnMaps: [
                        {name: "baseLorry", required: true},
//                        {name: "remoteConstruction", sf: 'C1', copy: 3, required: true},
//                        {name: "upgraderFast", room: 'W42N35', sf: 'C2', copy: 1, via: "v1"},
//                        {name: "roadworkerFast", room: 'W42N35', sf: 'C2', copy: 3, via: "v1"},


//                        {name: "upgrader", copy: 1},
//                         {name: "roadworker", copy: 1},

//                        {name: "remoteHarvest", room: 'W44N43', copy: 1},
//                        {name: "remoteHarvest", room: 'W44N42', copy: 1},
//                        {name: "remoteHarvest", room: 'W43N44', copy: 1},
//                        {name: "remoteHarvest", room: 'W47N43', copy: 1},
//                        {name: "remoteHarvest", room: 'W45N43', copy: 1},

//                        {name: "remoteHarvest", room: 'W42N43', copy: 2},

//                        {name: "roadworker", room: 'W42N43'},
//                        {name: "labworker", sf: 'S5', tf: 'container3', copy: 1},
//                        {name: "upgrader", room: 'W42N43', copy: 2},

//                        {name: "remoteConstruction", room: 'W42N35', sf: 'C2', copy: 1, via: "v1"},
//                        {name: "remoteConstruction", room: 'W41N35', sf: 'C11', copy: 1, via: "v1"},
                        {name: "remoteConstruction", room: 'W42N43', sf: 'C5', copy: 2},
//                        {name: "energyDelivery", room: 'W42N43', copy: 1},

                        {name: "custom",
                        creeps:{

//                                 'Te12': {role: 'terminalEqualizer', bodyparts: mainHelper.getBody(10,CARRY,5,MOVE)},


//                            'He31': {role: 'healer', sf: 'A6' , bodyparts: mainHelper.getBody(25,HEAL,25,MOVE)},
//                            'A511': {role: 'attacker', sf: 'A5', ar: 30, copy: 1, bodyparts: mainHelper.getBody(2,ATTACK,1,MOVE)},
//                        'L311a1energy3': {role: "labworker", sf: 'S5', tf: 'container3', bodyparts: mainHelper.getBody(10,CARRY,5,MOVE)},
/*
                                'Co11': {role: 'collector', bodyparts: mainHelper.getBody(12,CARRY,12,MOVE), room: 'W47N43'},
                                'Co12': {role: 'collector', bodyparts: mainHelper.getBody(12,CARRY,12,MOVE), room: 'W47N43'},
                                'Co13': {role: 'collector', bodyparts: mainHelper.getBody(12,CARRY,12,MOVE), room: 'W47N43'},
*/
                        }
                        }
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
//                         {name: "energyDelivery", room: 'W48N46', copy: 4},
//                        {name: "attacker", sf: 'A6', ar: 30, copy: 1, required: true},
                        {name: "remoteConstruction", room: 'W47N44',  copy: 1},
//                        {name: "remoteConstruction", room: 'W47N46',  copy: 3, via: 'V2'},
                        {name: "remoteConstruction", room: 'W48N46',  copy: 1},
                        {name: "roadworker", room: 'W48N46',  copy: 1},
//                        {name: "upgraderFast", room: 'W43N43',  copy: 1},
//                        {name: "roadworkerFast", room: 'W43N43',  copy: 1},

//                         {name: "roadworkerSmall2", copy: 15, room: 'W48N46'},
//                         {name: "roadworkerFast", copy: 5, room: 'W47N44', via: 'V2'},
//                         {name: "roadworkerFast", copy: 10, room: 'W43N43', via: 'V2'},

//                         {name: "upgraderFast", copy: 5, room: 'W43N43', via: 'V2'},
//                         {name: "upgraderFast", copy: 5, room: 'W42N43', via: 'V2'},

                         {name: "custom",
                        creeps:{
/*
                            'A51': {role: "attacker", sf: 'A5', bodyparts: mainHelper.getMixedBody(25,ATTACK,MOVE), ar: 40, via: 'V1'},
                            'A52': {role: "attacker", sf: 'A5', bodyparts: mainHelper.getMixedBody(25,ATTACK,MOVE), ar: 40, via: 'V1'},
                            'A53': {role: "attacker", sf: 'A5', bodyparts: mainHelper.getMixedBody(25,ATTACK,MOVE), ar: 40, via: 'V1'},
//                            'A54': {role: "attacker", sf: 'A5', bodyparts: mainHelper.getMixedBody(25,ATTACK,MOVE), ar: 40},
                            'A55': {role: "attacker", sf: 'A5', bodyparts: mainHelper.getMixedBody(25,RANGED_ATTACK,MOVE), ar: 40, via: 'V1'},
                            'H51': {role: "healer", sf: 'A5', bodyparts: mainHelper.getMixedBody(25,HEAL,MOVE), follow: 'A51', via: 'V1'},
                            'H52': {role: "healer", sf: 'A5', bodyparts: mainHelper.getMixedBody(25,HEAL,MOVE), follow: 'A51', via: 'V1'},
                            'H53': {role: "healer", sf: 'A5', bodyparts: mainHelper.getMixedBody(25,HEAL,MOVE), follow: 'A51', via: 'V1'},
                            'H54': {role: "healer", sf: 'A5', bodyparts: mainHelper.getMixedBody(25,HEAL,MOVE), follow: 'A51', via: 'V1'},
*/
//                            'A21': {role: "attacker", sf: 'A2', bodyparts: mainHelper.getMixedBody(25,ATTACK,MOVE), ar: 40, via: 'V1'},
//                            'A22': {role: "attacker", sf: 'A2', bodyparts: mainHelper.getMixedBody(25,ATTACK,MOVE), ar: 40, via: 'V1'},
//                            'H21': {role: "healer", sf: 'A2', bodyparts: mainHelper.getMixedBody(25,HEAL,MOVE), follow: 'A21', via: 'V1'},
//                            'H22': {role: "healer", sf: 'A2', bodyparts: mainHelper.getMixedBody(25,HEAL,MOVE), follow: 'A22', via: 'V1'},


//                        'LSupport31': {role: "labworker", tf: 'S10', recycleAfterDelivery: true, bodyparts: mainHelper.getBody(14,CARRY,14,MOVE)},
//                        'LSupport32': {role: "labworker", tf: 'S10', recycleAfterDelivery: true, bodyparts: mainHelper.getBody(14,CARRY,14,MOVE)},

                        }},
//                        {name: "upgrader", copy: 1},
//                        {name: "remoteConstruction", room: 'W52N37',  copy: 3},


                        {name: "remoteHarvest", room: 'W49N48', copy: 1},
                        {name: "remoteHarvest", room: 'W48N49', copy: 1},
                        {name: "remoteHarvest", room: 'W48N48', copy: 2},

//                        {name: "roadworker", copy: 2},
                        ]
                }
            },
            W48N54:
            {
                room: {
                    construct: true,
                    debug: false,
//                    boost: {sf: 'T6', tf:'L6',  resource: RESOURCE_CATALYZED_GHODIUM_ACID},
                    spawnMaps: [

                        {name: "baseLorry", required: true},
//                        {name: "labworker", required: true, copy: 2},

//                        {name: "remoteConstruction", room: 'W48N55', copy: 1},
                        {name: "roadworker", room: 'W48N52', copy: 2},
//                        {name: "upgrader", copy: 2},
//                        {name: "roadworker", copy: 3 },
//                        {name: "roadworker", copy: 4},
                        {name: "custom",
                          creeps:{

//                            'A1x': {role: "attacker", sf: 'A9', bodyparts: mainHelper.getMixedBodyGood(21,[ATTACK,MOVE],3,[HEAL,MOVE],1,[MOVE]), ar: 40, },
/*
                            'A2x': {role: "attacker", sf: 'A9', bodyparts: mainHelper.getMixedBodyGood(21,[ATTACK,MOVE],3,[HEAL,MOVE],1,[MOVE]), ar: 40, },
                            'A3x': {role: "attacker", sf: 'A9', bodyparts: mainHelper.getMixedBodyGood(15,[ATTACK,MOVE],2,[RANGED_ATTACK],3,[HEAL],4,[MOVE] ), ar: 40, },
                            'A4x': {role: "attacker", sf: 'A9', bodyparts: mainHelper.getMixedBodyGood(15,[ATTACK,MOVE],2,[RANGED_ATTACK],3,[HEAL],4,[MOVE] ), ar: 40, },
                            'He312': {role: 'healer', sf: 'A3' , bodyparts: mainHelper.getMixedBodyGood(25,[HEAL,MOVE]), follow: 'A2x'},
                            'He311': {role: 'healer', sf: 'A3' , bodyparts: mainHelper.getMixedBodyGood(25,[HEAL,MOVE])},
*/

//                            'Co11': {role: 'collector', bodyparts: mainHelper.getBody(20,CARRY,20,MOVE), room: 'W49N56'},
//                            'Co12': {role: 'collector', bodyparts: mainHelper.getBody(20,CARRY,20,MOVE), room: 'W49N56'},

//                        'L611': {role: 'labworker', sf:'T6', tf:'L6', bodyparts: mainHelper.getBody(4,CARRY,2,MOVE), resource: RESOURCE_CATALYZED_GHODIUM_ACID},
//                        'A312': {role: 'attacker', sf: 'A3', ar: 40, copy: 1, bodyparts: mainHelper.getBody(2,TOUGH,2,ATTACK,4,MOVE)},
//                        'A312Big': {role: 'attacker', sf: 'A3', ar: 40, copy: 1, bodyparts: mainHelper.getBody(25,ATTACK,25,MOVE)},
//                        'He312': {role: 'healer', sf: 'A3' , bodyparts: mainHelper.getBody(2,HEAL,2,MOVE,)},

//                        'R211get1': {role: "roadworker", room: 'W48N53', bodyparts: mainHelper.getBody(2,WORK,2,CARRY,2,MOVE)},
//                                'Co43': {role: 'collector', bodyparts: mainHelper.getBody(4,CARRY,4,MOVE)},

                        }},

//                        {name: "remoteConstruction", room: 'W48N52', copy: 3},
//                        {name: "remoteConstruction", room: 'W53N59', copy: 4, via: 'V2'},
                        {name: "remoteHarvest", room: 'W48N55', copy: 1},
                        {name: "remoteHarvest", room: 'W49N53', copy: 2},
                        {name: "remoteHarvest", room: 'W49N54', copy: 1},
                        {name: "remoteHarvest", room: 'W48N53', copy: 1},
//                        {name: "remoteHarvest", room: 'W47N55', copy: 2},
                        {name: "remoteHarvest", room: 'W47N53', copy: 2},

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
                         {name: "roadworker", copy: 1},
                        {name: "remoteConstruction", room: 'W47N44', sf: 'C14', copy: 1},
                        {name: "remoteConstruction", room: 'W43N43', sf: 'C14', copy: 1},
                        {name: "custom",
                          creeps:{
/*
                            'A52': {role: "attacker", sf: 'A5', bodyparts: mainHelper.getBody(25,MOVE,24,RANGED_ATTACK,1,HEAL), ar: 40},
                            'A54': {role: "attacker", sf: 'A5', bodyparts: mainHelper.getBody(25,MOVE,24,RANGED_ATTACK,1,HEAL), ar: 40},
*/
//                            'A51': {role: "attacker", sf: 'A5', bodyparts: mainHelper.getBody(24,ATTACK,25,MOVE,1,HEAL), ar: 40},
//                            'A55': {role: "attacker", sf: 'A5', bodyparts: mainHelper.getBody(25,MOVE,24,RANGED_ATTACK,1,HEAL), ar: 40},
//                            'H56': {role: "healer", sf: 'A5', bodyparts: mainHelper.getBody(10,TOUGH,5,HEAL,15,MOVE), follow: 'A51'},
//                            'H55': {role: "healer", sf: 'A5', bodyparts: mainHelper.getBody(10,TOUGH,5,HEAL,15,MOVE), follow: 'A51'},

//                            'H1B': {role: "healer", sf: 'A2', bodyparts: mainHelper.getBody(25,HEAL,25,MOVE), follow: 'A1B'},
//                            'A1B': {role: "attacker", sf: 'A2', bodyparts: mainHelper.getBody(20,ATTACK,21,MOVE,1,HEAL), follower: 'H1B', ar: 40},
//                            'H3B': {role: "healer", sf: 'A2', bodyparts: mainHelper.getBody(25,HEAL,25,MOVE), follow: 'A1B'},
//                            'A3B': {role: "attacker", sf: 'A2', bodyparts: mainHelper.getBody(20,ATTACK,21,MOVE,1,HEAL), follower: 'H3B', ar: 40},
//                            'H2B': {role: "healer", sf: 'A2', bodyparts: mainHelper.getBody(25,HEAL,25,MOVE), follow: 'A1B'},
/*
*/
/*
                            'H1C': {role: "healer", sf: 'A2', bodyparts: mainHelper.getBody(25,HEAL,25,MOVE), follow: 'A2C'},
                            'H2C': {role: "healer", sf: 'A2', bodyparts: mainHelper.getBody(25,HEAL,25,MOVE), follow: 'A2C'},
                            'A2C': {role: "attacker", sf: 'A2', bodyparts: mainHelper.getBody(20,ATTACK,21,MOVE,1,HEAL), follower: 'H2C', ar: 40},
*/
                          }},
//                        {name: "remoteConstruction", room: 'W43N43', sf: 'C1', copy: 4},

//                        {name: "upgrader", copy: 1},

//FREE                        {name: "remoteHarvest", room: 'W47N46', copy: 1},
//FREE                        {name: "remoteHarvest", room: 'W48N47', copy: 1},
//                        {name: "remoteHarvest", room: 'W48N45', copy: 1},
//                        {name: "remoteHarvest", room: 'W47N45', copy: 1},
/*
*/
//                        {name: "remoteConstruction", room: 'W47N46', sf: 'C3', copy: 1},
/*
                        {name: "remoteConstruction", room: 'W42N43', sf: 'C3', copy: 2},
                        {name: "remoteConstruction", room: 'W43N43', sf: 'C1', copy: 2},
*/
/*
*/
/*
                        {name: "remoteConstruction", room: 'W44N43', sf: 'C12', copy: 1},
                        {name: "remoteConstruction", room: 'W44N42', sf: 'C13', copy: 1},
*/
//                        {name: "remoteConstruction", room: 'W42N43', sf: 'C3', copy: 4},

/*
*/


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
                        {name: "roadworker", copy: 3},

//                        {name: "upgrader", room: 'W42N35', sf: 'C2', copy: 2, via: "v1"},
//                        {name: "remoteConstruction", room: 'W42N35', sf: 'C2', copy: 2, via: "v1"},

                        {name: "custom",

                          creeps:{
//                              'DM2': {role: 'dropper', sf: 'M2', mineral: true, bodyparts: mainHelper.getBody(10,WORK,5,MOVE)},
//                              'Co2': {role: 'collector', bodyparts: mainHelper.getBody(2,CARRY,1,MOVE)},
//                               'A1': {role: 'attacker', sf: 'A1', ar: 30, copy: 1, bodyparts: mainHelper.getBody(20,ATTACK,20,MOVE)},
//                               'A2': {role: 'attacker', sf: 'A1', ar: 30, copy: 1, bodyparts: mainHelper.getBody(20,ATTACK,20,MOVE)},
//                        'Co11': {role: 'collector', bodyparts: mainHelper.getBody(20,CARRY,20,MOVE), room: 'W43N33'},
/*
                          'L11': {role: "lorry", bodyparts: mainHelper.getBody(20,CARRY,10,MOVE)},
                        'H1C': {role: "healer", sf: 'A1', bodyparts: mainHelper.getBody(25,HEAL,25,MOVE), follow: 'A1C'},
                        'H2C': {role: "healer", sf: 'A1', bodyparts: mainHelper.getBody(25,HEAL,25,MOVE), follow: 'A1C'},
                        'A1C': {role: "attacker", sf: 'A1', bodyparts: mainHelper.getBody(20,ATTACK,21,MOVE,1,HEAL), follower: 'H1C', ar: 40},
*/
//                        'Healer': {role: "healer", sf: 'A6', bodyparts: mainHelper.getBody(20,HEAL,20,MOVE) },



//                                'Co33': {role: 'collector', bodyparts: mainHelper.getBody(4,CARRY,4,MOVE)},

                        }},

//                        {name: "upgrader", copy: 1},
//                        {name: "roadworker", copy: 2},


//                        {name: "remoteHarvest", room: 'W41N42', copy: 1},
                        {name: "remoteHarvest", room: 'W41N43', copy: 1},
                        {name: "remoteHarvest", room: 'W41N44', copy: 1},

                        {name: "remoteHarvest", room: 'W42N42', copy: 1},

//                        {name: "remoteHarvest", room: 'W41N44', copy: 1},
//                        {name: "remoteConstruction", room: 'W42N32', sf: 'C6', copy: 2},
                        ]
                }
            },
            W42N35:
            {
                room: {
                    construct: true,
                    roads: false,
                    spawnMaps: [
                        {name: "baseLorry", required: true},
//                        {name: "roadworker", copy: 1},
//                        {name: "attacker",  sf: 'A5', copy: 1},
/*
                        {name: "remoteConstruction", room: 'W41N35', sf: 'C11', copy: 2},
                        {name: "remoteConstruction", room: 'W43N35', sf: 'C7', copy: 2},
                        {name: "remoteConstruction", room: 'W41N36', sf: 'C15', copy: 2},
*/

                        ]
                }
            },
            W52N37:
            {
                room: {
                    construct: true,
                    roads: false,
                    spawnMaps: [
                        {name: "baseLorry", required: true},
                        {name: "upgrader", copy: 2},
//                        {name: "attacker",  sf: 'A5', copy: 1},
                        {name: "remoteHarvest", room: 'W51N37', copy: 1},
//                        {name: "remoteHarvest", room: 'W52N36', copy: 1},
                        {name: "remoteHarvest", room: 'W53N37', copy: 1},
//                        {name: "remoteConstruction", room: 'W47N29', copy: 1, via: "V4"},
//                        {name: "upgraderFast", room: 'W42N35', copy: 1, via: "v1"},
//                        {name: "roadworkerFast", room: 'W42N35', copy: 3, via: "v1"},

                        ]
                }
            },
            W47N29:
            {
                room: {
                    construct: true,
                    roads: false,
                    spawnMaps: [
                        {name: "baseLorry", required: true},
                        {name: "claimer", room: 'W41N24', via: 'V5', required: true},
                        {name: "roadworker", copy: 1},
                        {name: "roadworker", copy: 1, room: 'W48N27'},
//                        {name: "remoteConstruction", room: 'W48N27', copy: 3},
                        {name: "remoteConstruction", room: 'W41N24', copy: 2},
                        {name: "remoteHarvest", room: 'W47N28', copy: 1},
                        ]
                }
            },
            W48N27:
            {
                room: {
                    construct: true,
                    roads: false,
                    spawnMaps: [
                        {name: "baseLorry", required: true},
//                        {name: "claimer", room: 'W42N32', via: 'V5', required: true},
                        {name: "roadworker", copy: 1},
                        ]
                }
            },
            W41N41:
            {
                room: {
                    construct: true,
                    roads: false,
                    spawnMaps: [
                        {name: "baseLorry", required: true},
                        {name: "roadworker", copy: 1},
                        ]
                }
            },
            W46N33:
            {
                room: {
                    construct: true,
                    roads: false,
                    spawnMaps: [
                        {name: "baseLorry", required: true},
                        {name: "upgrader", copy: 1},
                        ]
                }
            },
            W42N41:
            {
                room: {
                    construct: true,
                    roads: false,
                    spawnMaps: [
                        {name: "baseLorry", required: true},
                        {name: "roadworker", copy: 1},
                        ]
                }
            },
            W38N37:
            {
                room: {
                    construct: true,
                    roads: false,
                    spawnMaps: [
                        {name: "baseLorry", required: true},
                        {name: "roadworker", copy: 1},
                        ]
                }
            },
            W53N59:
            {
                room: {
                    construct: true,
                    roads: false,
                    spawnMaps: [
                        {name: "baseLorry", required: true},
//                        {name: "roadworker", copy: 1},
                        {name: "upgrader", copy: 15},
//                        {name: "remoteHarvest", room: 'W52N59', copy: 1},
//                        {name: "remoteHarvest", room: 'W54N59', copy: 1},
                        ]
                }
            },
            W37N31:
            {
                room: {
                    construct: true,
                    roads: false,
                    spawnMaps: [
                        {name: "baseLorry", required: true},
                        {name: "roadworker", copy: 1},
                        ]
                }
            },
            W47N46:
            {
                room: {
                    construct: true,
                    roads: false,
                    spawnMaps: [
                        {name: "baseLorry", required: true},
                        {name: "roadworkerSmall", copy: 5},
                        {name: "roadworker", copy: 1},
                        ]
                }
            },
            W44N43:
            {
                room: {
                    construct: true,
                    roads: false,
                    spawnMaps: [
                        {name: "baseLorry", required: true},
//                        {name: "attacker", copy: 2, room: 'W43N43', sf: 'A2', ar: 40},
                        {name: "roadworker", copy: 1},
                        {name: "roadworker", room: 'W23N43', copy: 2},
                        {name: "upgrader", room: 'W23N43', copy: 2},
                        {name: "roadworkerFast", room: 'W43N43', copy: 2},

//                        {name: "roadworker", copy: 2, room: "W43N43", sf: 'C1'},
                        ]
                }
            },
            W45N43:
            {
                room: {
                    construct: true,
                    roads: false,
                    spawnMaps: [
                        {name: "baseLorry", required: true},
//                        {name: "attacker", copy: 2, room: 'W43N43', sf: 'A2', ar: 40},
                        {name: "roadworker",  copy: 1},
                        {name: "upgrader",  copy: 1},
                        {name: "upgrader", room: 'W42N43', copy: 2},
                        {name: "roadworker", room: 'W42N43', copy: 2},
                        {name: "upgrader", room: 'W43N43', copy: 1},
                        {name: "roadworker", room: 'W43N43', copy: 1},
                        {name: "attacker", sf: 'A2', copy: 1},
                        {name: "attacker", sf: 'A3', copy: 1},

//                        {name: "roadworker", copy: 2, room: "W43N43", sf: 'C1'},
                        ]
                }
            },
            W44N42:
            {
                room: {
                    construct: true,
                    roads: false,
                    spawnMaps: [
                        {name: "baseLorry", required: true},
                        {name: "roadworker", copy: 1},
                        {name: "upgrader", copy: 1},
                        {name: "roadworker", room: 'W43N43', copy: 1},

//                        {name: "roadworker", copy: 10, room: "W42N43", sf: 'C3'},

                        ]
                }
            },
            W47N44:
            {
                room: {
                    construct: true,
                    roads: false,
                    spawnMaps: [
                        {name: "baseLorry", required: true},
                        {name: "roadworker", copy: 1},
//                        {name: "claimer", room: 'W45N43', copy: 1, required: true},
//                        {name: "claimer", room: 'W44N43', copy: 1, required: true},

                        {name: "remoteConstruction", room: 'W44N43', copy: 1},
                        {name: "remoteConstruction", room: 'W45N43', copy: 1},
                        {name: "remoteConstruction", room: 'W43N43', sf: 'C1', copy: 1},
                        {name: "remoteConstruction", room: 'W42N43', sf: 'C1', copy: 1},

//                        {name: "remoteConstruction", room: 'W44N42', copy: 1},

//                        {name: "remoteConstruction", room: 'W42N43', copy: 4},

                        {name: "custom",

                          creeps:{

                        'Healer1': {role: "healer", sf: 'A5', bodyparts: mainHelper.getBody(5,TOUGH,2,HEAL,7,MOVE)},
//                        'Doer1': {role: "doer", bodyparts: mainHelper.getBody(2,MOVE)},
//                        'Doer2': {role: "doer", bodyparts: mainHelper.getBody(2,MOVE)},
//                        'Doer3': {role: "doer", bodyparts: mainHelper.getBody(2,MOVE)},

  //                          'L11': {role: "lorry", bodyparts: mainHelper.getBody(2,CARRY,1,MOVE)},
                          }},
//                        {name: "remoteConstruction", room: 'W45N43', copy: 1},
//                        {name: "remoteConstruction", room: 'W44N43', copy: 1},
/*
FREE
*/
/*
*/
//                        {name: "remoteConstruction", room: 'W45N43', sf: 'C1', copy: 1},
//                        {name: "remoteConstruction", room: 'W41N42', sf: 'C3', copy: 1},
//                        {name: "remoteConstruction", room: 'W41N41', sf: 'C3', copy: 1},

//                        {name: "upgrader", copy: 1},
//                        {name: "remoteConstruction", room: 'W41N41', copy: 1},
//                        {name: "remoteConstruction", room: 'W42N43', copy: 1},
//                        {name: "remoteConstruction", room: 'W43N43', copy: 1},

//                        {name: "remoteConstruction", room: 'W43N43', sf: 'C1', copy: 2},
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
//                        {name: "roadworker"},
//                        {name: "upgrader", copy: 1},


//                        {name: "remoteHarvest", room: 'W38N49', copy: 2},
//                        {name: "remoteConstruction", room: 'W42N43', sf: 'C5', copy: 1},
//                        {name: "remoteConstruction", room: 'W43N43', sf: 'C6', copy: 1},
//                        {name: "remoteConstruction", room: 'W38N38', sf: 'C9', copy: 1},
//                        {name: "remoteHarvest", room: 'W38N51', copy: 3},
                        {name: "custom",

                             creeps:{
                          'L12': {role: "lorry", bodyparts: mainHelper.getBody(6,CARRY,6,MOVE)},

//                                 'A61': {role: 'attacker', sf: 'A1', ar: 40, copy: 3, bodyparts: mainHelper.getBody(4,TOUGH,4,ATTACK,4,MOVE)},
//                                'Co1': {role: 'collector', bodyparts: mainHelper.getBody(4,CARRY,4,MOVE)},
//                                'Co13': {role: 'collector', bodyparts: mainHelper.getBody(4,CARRY,4,MOVE)},

                             }},
//                        {name: "attackerGood", sf: 'A6', ar: 40, copy: 10},

                        ]
                }
            },

            W37N48:
            {
                room: {
                    construct: true,
                    roads: false,
                    spawnMaps: [
                        {name: "baseLorry", required: true},
                        {name: "custom",

                             creeps:{
//                                 'A61': {role: 'attacker', sf: 'A1', ar: 40, copy: 3, bodyparts: mainHelper.getBody(4,TOUGH,4,ATTACK,4,MOVE)},
//                                'Co3': {role: 'collector', bodyparts: mainHelper.getBody(4,CARRY,4,MOVE)},
                             }},
//                        {name: "remoteConstruction", room: 'W34N47', sf: 'C9', copy: 2},
//                        {name: "energyDelivery", room: 'W34N47', copy: 1},
                        {name: "upgrader", copy: 1},
/*
                        {name: "remoteHarvest", room: 'W37N49', copy: 1},
                        {name: "remoteHarvest", room: 'W38N49', copy: 1},
                        {name: "remoteHarvest", room: 'W36N48', copy: 1},
*/
                        ]
                }
            },
            W42N32:
            {
                room: {
                    construct: true,
                    roads: false,
                    spawnMaps: [
                        {name: "upgrader", copy: 1, required: true},
                        {name: "baseLorry", required: true},
                        {name: "upgrader", copy: 1},
//                        {name: "remoteConstruction", room: 'W42N33', sf: 'A4', copy: 1},
                        {name: "remoteHarvest", room: 'W42N33', sf: 'A4', copy: 1},
                        {name: "remoteHarvest", room: 'W43N31', copy: 1},
                        {name: "custom",

                             creeps:{
//                                 'Te11': {role: 'terminalEqualizer', bodyparts: mainHelper.getBody(20,CARRY,5,MOVE)},
//                                 'A11': {role: 'attacker', sf: 'A4', ar: 5, copy: 1, bodyparts: mainHelper.getBody(20,ATTACK,10,MOVE)},
//                                 'A12': {role: 'attacker', sf: 'A4', ar: 5, copy: 1, bodyparts: mainHelper.getBody(20,ATTACK,10,MOVE)},
//                                'Co4': {role: 'collector', bodyparts: mainHelper.getBody(8,CARRY,8,MOVE)},
//                                'Co5': {role: 'collector', bodyparts: mainHelper.getBody(12,CARRY,12,MOVE)},
/*
                                'Co11': {role: 'collector', bodyparts: mainHelper.getBody(20,CARRY,20,MOVE), room: 'W42N33'},

                                'Co12': {role: 'collector', bodyparts: mainHelper.getBody(20,CARRY,20,MOVE), room: 'W42N33'},
                                'Co13': {role: 'collector', bodyparts: mainHelper.getBody(20,CARRY,20,MOVE), room: 'W42N33'},
                                'Co14': {role: 'collector', bodyparts: mainHelper.getBody(20,CARRY,20,MOVE), room: 'W42N33'},

*/
                             }},

//                        {name: "roadworker", copy: 1},
//                        {name: "remoteHarvest", room: 'W43N32', copy: 1},
//                        {name: "remoteHarvest", room: 'W42N31', copy: 1},
//                        {name: "remoteHarvest", room: 'W41N31', copy: 1},
//                        {name: "remoteConstruction", room: 'W37N31', sf: 'C3', copy: 2},
                        ]
                }
            },
            W52N45:
            {
                room: {
                    construct: true,
                    roads: false,
                    spawnMaps: [
                        {name: "baseLorry", required: true},
                        {name: "custom",

                             creeps:{
//                                 'A61': {role: 'attacker', sf: 'A1', ar: 40, copy: 3, bodyparts: mainHelper.getBody(4,TOUGH,4,ATTACK,4,MOVE)},
//                                'Co4': {role: 'collector', bodyparts: mainHelper.getBody(8,CARRY,8,MOVE)},
//                                'Co5': {role: 'collector', bodyparts: mainHelper.getBody(12,CARRY,12,MOVE)},
                             }},
//                        {name: "upgrader", copy: 1},
                        {name: "upgraderFast", copy: 1, room: 'W49N49'},
                        {name: "roadworkerFast", copy: 2, room: 'W49N49'},
//                        {name: "roadworker", copy: 2},
                        {name: "remoteHarvest", room: 'W53N45', copy: 1},
                        {name: "remoteHarvest", room: 'W52N44', copy: 1},
//                        {name: "remoteConstruction", room: 'W52N37', copy: 4},
                        {name: "remoteConstruction", room: 'W51N51', copy: 2, via: 'V6'},
                        {name: "remoteConstruction", room: 'W48N46', copy: 2, via: 'V2'},
                        {name: "remoteConstruction", room: 'W48N54', copy: 2},
                        ]
                }
            },
            W43N35:
            {
                room: {
                    construct: true,
                    roads: false,
                    spawnMaps: [
                        {name: "baseLorry", required: true},
                         {name: "roadworker", copy: 2},
//                        {name: "upgrader", copy: 1},
//                        {name: "remoteHarvest", room: 'W33N47', copy: 1},


//                        {name: "remoteHarvest", room: 'W32N46', copy: 3},
                        {name: "uprgader", room: 'W42N32', sf: 'C8', copy: 2},
//                        {name: "remoteConstruction", room: 'W32N42', sf: 'C8', copy: 1},
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
/*
                    'A1': {role: 'attacker', sf: 'A1', ar: 10, bodyparts: [ATTACK,MOVE]},
                    'A2': {role: 'attacker', sf: 'A1', ar: 10, bodyparts: [ATTACK,MOVE]},
                    'A3': {role: 'attacker', sf: 'A1', ar: 10, bodyparts: mainHelper.getBody(1,MOVE,2,TOUGH,1,TOUGH)},
                    'H1': {role: 'harvester', sf: 'A1', ar: 10, bodyparts: mainHelper.getBody(2,WORK,1,CARRY,1,MOVE)},
*/
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


    if (creep.memory.via){
        if (!creep.memory.viaVisited){
            if (creep.pos.isNearTo(Game.flags[creep.memory.via])){
                creep.memory.viaVisited = true;
            }
            creep.moveTo(Game.flags[creep.memory.via])
            continue
        }
    }


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
//                roleLorry.run(creep);
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
//                roleLorry.run(creep);
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
        } else if(creep.memory.role == 'energyDelivery') {
          roleEnergyDelivery.run(creep)
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

//        if (creep.room.name == "W37N47") creep.moveTo(49,36)

/*
        if (creep.room.name == "W33N46") creep.moveTo(42,49)
        if (creep.room.name == "W33N45") creep.moveTo(40,49)
                if (creep.room.name == "W45N38") creep.moveTo(49,27)
                if (creep.room.name == "W44N38") creep.moveTo(49,22)
                if (creep.room.name == "W43N38") creep.moveTo(28,49)
                if (creep.room.name == "W43N37") creep.moveTo(28,49)
*/
//creep.moveTo(5,36 )
                if (creep.room.name == "W41N35" && creep.pos.x < 23) {creep.moveTo(24,22)}
                if (creep.room.name == "W45N43" && creep.pos.x < 1) {creep.move(BOTTOM_RIGHT)}
                if (creep.room.name == "W45N43" && creep.pos.x < 4) {creep.moveTo(48,16)}
                if (creep.room.name == "W46N44" && creep.pos.x < 17 && creep.pos.x > 7) {creep.moveTo(12,49)}
                if (creep.room.name == "W47N47" ) { creep.moveTo(26,49)}
//                if (creep.room.name == "W46N43" && creep.pos.x > 3) {creep.moveTo(49,35)}

                if (creep.room.name == "W41N50" ) {creep.moveTo(49,39)}
                if (creep.room.name == "W44N43" && ( creep.memory.room == "W41N41" || creep.memory.room == "W42N41" || creep.memory.room == "W42N43") ) {creep.moveTo(14,49)}
                if (creep.room.name == "W41N35" && creep.memory.room != "W41N35" && creep.pos.x > 19) {creep.moveTo(19,16)}
                if (creep.room.name == "W47N45" && creep.memory.room != "W47N45" &&  creep.pos.y < 44) {creep.moveTo(31,44)}
                if (creep.room.name == "W40N36" && creep.memory.room != "W41N35") {creep.moveTo(0,36)}
                if (creep.room.name == "W44N42" ) {creep.moveTo(49,19)}
//                if (creep.room.name == "W41N36" && creep.memory.room != "W41N35") {creep.moveTo(0,36)}
//       if (creep.memory.role!='containerFiller') creep.moveTo(1,1)
//       if (creep.memory.role=='containerFiller') creep.moveTo(45,42)
//       if (creep.name=='ContainerFiller7987040') creep.moveTo(45,42)

//creep.moveTo(1,1)
//Game.creeps['Harvester7841134'].moveTo(20,12)
if (creep.room.name == "W48N49" && creep.memory.room != "W48N49"  && creep.memory.room != "W49N49"){
    creep.moveTo(43,49)
}

        if (creep.name == 'R412' || creep.name == 'R411'){
// creep.moveTo(1,1)
 //            dismantle(creep)
        }
//if (creep.room.name == "W47N44"){creep.moveTo(17,0); }
//if (creep.room.name == "W47N45"){creep.moveTo(17,4); }
    }


}
