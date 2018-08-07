var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader.js');
var roleUpgraderRemote = require('role.upgraderRemote.js');
var roleRoadworker = require('role.roadworker.js');
var roleWorker = require('role.worker.js');
var roleAttacker = require('role.attacker.js');
var roleHealer = require('role.healer.js');
var roleClaimer = require('role.claimer.js');
var roleTower = require('role.tower.js');
var roleContainerFiller = require('role.containerFiller.js');
var roleContainerDistributor = require('role.containerDistributor.js');
var roleLinkPuller = require('role.linkPuller.js');
var roleLinkFiller = require('role.linkFiller.js');
var roleDropper = require('role.dropper.js');
var roomManager = require('room.manager.js');



module.exports.loop = function () {

    console.log("-------------")

    for (roomName in Game.rooms){
        var room = Game.rooms[roomName]
        var spawn = room.find(FIND_MY_SPAWNS)[0];
        if (spawn)
        roomManager.run(room)
        var towers = room.find(FIND_STRUCTURES, {filter: function(object){return object.structureType==STRUCTURE_TOWER}})
        towers.forEach((tower) => roleTower.run(tower.id))

        var labs = room.find(FIND_MY_STRUCTURES,
                {filter: {structureType: STRUCTURE_LAB}});

    }


    Memory.sourceIdMap =
        {
            W55S27:
            [
            Game.flags.B1,
            Game.flags.B3,
            Game.flags.B6,
            Game.flags.B7
            ],
            W54S29:
            [
                Game.flags.B4,
                Game.flags.B5,
                Game.flags.B8
            ]
        }


    Memory.spawnMap =
        {
            W55S27:
            [

            {role: 'harvester', name: 'H11', bodyparts: [WORK,WORK,CARRY,MOVE]},
            {role: 'harvester', name: 'H12', bodyparts: [WORK,WORK,CARRY,MOVE]},
            {role: 'harvester', name: 'H13', bodyparts: [WORK,CARRY,MOVE,CARRY,MOVE]},
//            {role: 'harvester', name: 'H14', bodyparts: [WORK,CARRY,MOVE,CARRY,MOVE]},
            {role: 'harvester', name: 'H15', bodyparts: [WORK,WORK,WORK,WORK,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE]},
            {role: 'dropper', name: 'D11', sourceflagName: 'B6', bodyparts: [WORK,WORK,CARRY,MOVE]},
            {role: 'dropper', name: 'D12', sourceflagName: 'B7', bodyparts: [WORK,WORK,CARRY,MOVE]},
            {role: 'dropper', name: 'D13', sourceflagName: 'B6', bodyparts: [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE]},
            {role: 'dropper', name: 'D14', sourceflagName: 'B7', bodyparts: [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE]},
            {role: 'dropper', name: 'D15', sourceflagName: 'B1', bodyparts: [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE]},
            {role: 'dropper', name: 'D16', sourceflagName: 'B3', bodyparts: [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE]},
            {role: 'dropper', name: 'D17', sourceflagName: 'B10', bodyparts: [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE]},
            {role: 'worker', name: 'W11', bodyparts: [CARRY,MOVE,CARRY,MOVE,CARRY,MOVE]},
            {role: 'worker', name: 'W12', bodyparts: [CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE]},


/*
            {role: 'attacker', name: 'A14', sourceflagName: 'A1', bodyparts: [TOUGH,TOUGH,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE]},
            {role: 'attacker', name: 'A15', sourceflagName: 'A1',  bodyparts: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE]},
            {role: 'attacker', name: 'A111',sourceflagName: 'A1', bodyparts: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                                                        TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                                                        TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                                                        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]},


            {role: 'attacker', name: 'A112',sourceflagName: 'A1', bodyparts: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                                                        TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                                                        TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                                                        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]},
*/
/*
            {role: 'attacker', name: 'A113',sourceflagName: 'A1', bodyparts: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                                                        TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                                                        TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                                                        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]},

            {role: 'healer', name: 'He111', sourceflagName: 'A1', bodyparts: [HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE]},
            {role: 'healer', name: 'He112', sourceflagName: 'A1', bodyparts: [HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE]},
            */
//            {role: 'healer', name: 'He113', sourceflagName: 'A1', bodyparts: [HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE]},
/*
            {role: 'healer', name: 'He114', sourceflagName: 'A1', bodyparts: [HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE]},
            {role: 'healer', name: 'He115', sourceflagName: 'A1', bodyparts: [HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE]},
            {role: 'healer', name: 'He116', sourceflagName: 'A1', bodyparts: [HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE]},
            {role: 'healer', name: 'He117', sourceflagName: 'A1', bodyparts: [HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE]},
            {role: 'healer', name: 'He118', sourceflagName: 'A1', bodyparts: [HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE]},
            {role: 'attacker', name: 'A12', sourceflagName: 'A1', bodyparts: [TOUGH,TOUGH,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,MOVE,MOVE]},
            {role: 'healer', name: 'He119', sourceflagName: 'A1', bodyparts: [HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE]},
            {role: 'healer', name: 'He1191', sourceflagName: 'A1', bodyparts: [HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE]},
            {role: 'healer', name: 'He1192', sourceflagName: 'A1', bodyparts: [HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE]},
            {role: 'healer', name: 'He1193', sourceflagName: 'A1', bodyparts: [HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE]},
            {role: 'healer', name: 'He1194', sourceflagName: 'A1', bodyparts: [HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE]},
            {role: 'healer', name: 'He1195', sourceflagName: 'A1', bodyparts: [HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE]},
            {role: 'healer', name: 'He1196', sourceflagName: 'A1', bodyparts: [HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE]},
*/
/*
            {role: 'attacker', name: 'A13', sourceflagName: 'A1', bodyparts: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE]},
            {role: 'healer', name: 'He11', sourceflagName: 'A1', bodyparts: [HEAL,HEAL,HEAL,MOVE,MOVE]},
            {role: 'healer', name: 'He12', sourceflagName: 'A1', bodyparts: [HEAL,HEAL,HEAL,MOVE,MOVE]},




            {role: 'attacker', name: 'A16', bodyparts: [TOUGH,TOUGH,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,MOVE,MOVE]},
            {role: 'attacker', name: 'A17', bodyparts: [TOUGH,TOUGH,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,MOVE,MOVE]},
            {role: 'attacker', name: 'A18', bodyparts: [TOUGH,TOUGH,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,MOVE,MOVE]},
            {role: 'attacker', name: 'A19', bodyparts: [TOUGH,TOUGH,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,MOVE,MOVE]},
            {role: 'healer', name: 'He13', bodyparts: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]},
            {role: 'healer', name: 'He14', bodyparts: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE]},
            {role: 'attacker', name: 'A191', bodyparts: [TOUGH,TOUGH,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,MOVE,MOVE]},
            {role: 'attacker', name: 'A192', bodyparts: [TOUGH,TOUGH,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,MOVE]},
            {role: 'attacker', name: 'A193', bodyparts: [TOUGH,TOUGH,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,MOVE]},
            {role: 'attacker', name: 'A194', bodyparts: [TOUGH,TOUGH,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,MOVE]},
            {role: 'attacker', name: 'A195', bodyparts: [TOUGH,TOUGH,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,MOVE]},
            {role: 'attacker', name: 'A196', bodyparts: [TOUGH,TOUGH,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,MOVE]},
            {role: 'attacker', name: 'A197', bodyparts: [TOUGH,TOUGH,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,MOVE]},
            {role: 'attacker', name: 'A198', bodyparts: [TOUGH,TOUGH,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,MOVE]},
            {role: 'healer', name: 'He15', bodyparts: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]},
*/
/*
*/


            {role: 'upgrader', name: 'U11', bodyparts: [WORK,WORK,CARRY,MOVE]},
            {role: 'roadworker', name: 'R11', bodyparts: [WORK,WORK,CARRY,MOVE]},
            {role: 'roadworker', name: 'R12', bodyparts: [WORK,WORK,CARRY,MOVE]},
            {role: 'roadworker', name: 'R13', bodyparts: [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]},
//            {role: 'roadworker', name: 'R14', bodyparts: [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]},
            {role: 'upgrader', name: 'U12', bodyparts: [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE]},
            {role: 'upgrader', name: 'U13', bodyparts: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]},
            {role: 'worker', name: 'W13', bodyparts: [CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE]},
//            {role: 'worker', name: 'W14', bodyparts: [CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE]},
            {role: 'upgraderRemote', name: 'UR11', sourceflagName: 'B1', targetflagName: 'H1', bodyparts: [WORK,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE]},
            {role: 'upgraderRemote', name: 'UR12', sourceflagName: 'B3', targetflagName: 'B7', bodyparts: [WORK,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE]},
            {role: 'upgraderRemote', name: 'UR13', sourceflagName: 'B1', targetflagName: 'H1', bodyparts: [WORK,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE]},
            {role: 'upgraderRemote', name: 'UR14', sourceflagName: 'B3', targetflagName: 'B7', bodyparts: [WORK,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE]},
            {role: 'upgraderRemote', name: 'UR15', sourceflagName: 'B1', targetflagName: 'H1', bodyparts: [WORK,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE]},
            {role: 'upgraderRemote', name: 'UR16', sourceflagName: 'B10', targetflagName: 'H1', bodyparts: [WORK,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE]},
            {role: 'upgraderRemote', name: 'UR17', sourceflagName: 'B10', targetflagName: 'H1', bodyparts: [WORK,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE]},
            ],
            W54S29:
            [
            {role: 'harvester', name: 'H21', bodyparts: [WORK,WORK,CARRY,MOVE]},
            {role: 'harvester', name: 'H22', bodyparts: [WORK,WORK,CARRY,MOVE]},
            {role: 'harvester', name: 'H23', bodyparts: [WORK,CARRY,MOVE,CARRY,MOVE]},
//            {role: 'claimer', name: 'C2', bodyparts: [CLAIM,MOVE,MOVE,MOVE,MOVE]},
//            {role: 'harvester', name: 'H24', bodyparts: [WORK,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE]},
            {role: 'harvester', name: 'H25', bodyparts: [WORK,WORK,WORK,WORK,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE]},
            {role: 'dropper', name: 'D21' ,sourceflagName: 'B5', bodyparts: [WORK,WORK,CARRY,MOVE]},
            {role: 'dropper', name: 'D23', sourceflagName: 'B5', bodyparts: [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE]},
            {role: 'dropper', name: 'D22' ,sourceflagName: 'B4', bodyparts: [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE]},
            {role: 'dropper', name: 'D24', sourceflagName: 'B8', bodyparts: [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE]},
            {role: 'dropper', name: 'D25', sourceflagName: 'B9', bodyparts: [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE]},
            {role: 'dropper', name: 'D26', sourceflagName: 'B11', bodyparts: [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE]},
            {role: 'worker', name: 'W21', bodyparts: [CARRY,MOVE,CARRY,MOVE,CARRY,MOVE]},
            {role: 'worker', name: 'W22', bodyparts: [CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE]},

/*
            {role: 'healer', name: 'He22',  sourceflagName: 'A4', bodyparts: [HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]},
            {role: 'healer', name: 'He23',  sourceflagName: 'A4', bodyparts: [HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]},
            {role: 'attacker', name: 'A21', sourceflagName: 'A4', bodyparts: [TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE]},
            {role: 'attacker', name: 'A22', sourceflagName: 'A4', bodyparts: [TOUGH,TOUGH,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,MOVE,MOVE]},
            {role: 'attacker', name: 'A23', sourceflagName: 'A4', bodyparts: [TOUGH,TOUGH,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,MOVE,MOVE]},
            {role: 'healer', name: 'He21',  sourceflagName: 'A4', bodyparts: [HEAL,MOVE]},
            {role: 'healer', name: 'He24',  sourceflagName: 'A4', bodyparts: [HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]},
            {role: 'healer', name: 'He25',  sourceflagName: 'A4', bodyparts: [HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]},
            {role: 'healer', name: 'He26',  sourceflagName: 'A4', bodyparts: [HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]},
            {role: 'healer', name: 'He27',  sourceflagName: 'A4', bodyparts: [HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]},
            {role: 'healer', name: 'He28',  sourceflagName: 'A4', bodyparts: [HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]},
            {role: 'healer', name: 'He29',  sourceflagName: 'A4', bodyparts: [HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE]},
            {role: 'healer', name: 'He291',  sourceflagName: 'A4', bodyparts: [HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]},
            {role: 'healer', name: 'He292',  sourceflagName: 'A4', bodyparts: [HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]},
            {role: 'healer', name: 'He293',  sourceflagName: 'A4', bodyparts: [HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]},
            {role: 'healer', name: 'He294',  sourceflagName: 'A4', bodyparts: [HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]},
            {role: 'healer', name: 'He295',  sourceflagName: 'A4', bodyparts: [HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE]},
*/

            {role: 'upgrader', name: 'U21', bodyparts: [WORK,WORK,CARRY,MOVE]},
            {role: 'roadworker', name: 'R21', bodyparts: [WORK,WORK,CARRY,MOVE]},
            {role: 'roadworker', name: 'R22', bodyparts: [WORK,WORK,CARRY,MOVE]},
            {role: 'roadworker', name: 'R23', bodyparts: [WORK,WORK,CARRY,MOVE]},
            {role: 'roadworker', name: 'R23', bodyparts: [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]},
            {role: 'roadworker', name: 'R24', bodyparts: [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]},
            {role: 'roadworker', name: 'R25', bodyparts: [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]},
            {role: 'roadworker', name: 'R26', bodyparts: [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]},
            {role: 'roadworker', name: 'R27', bodyparts: [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]},
            {role: 'roadworker', name: 'R28', bodyparts: [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]},
            {role: 'upgrader', name: 'U22', bodyparts: [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE]},
            {role: 'upgrader', name: 'U23', bodyparts: [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE]},
            {role: 'upgrader', name: 'U24', bodyparts: [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE]},
            {role: 'upgrader', name: 'U25', bodyparts: [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE]},
            {role: 'worker', name: 'W23', bodyparts: [CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE]},
            {role: 'upgraderRemote', name: 'UR21', sourceflagName: 'B8', targetflagName: 'B4', bodyparts: [CARRY,MOVE,CARRY,MOVE,CARRY,MOVE]},
            {role: 'upgraderRemote', name: 'UR22', sourceflagName: 'B8', targetflagName: 'B4', bodyparts: [WORK,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE]},
            {role: 'upgraderRemote', name: 'UR23', sourceflagName: 'B9', targetflagName: 'B4', bodyparts: [CARRY,MOVE,CARRY,MOVE,CARRY,MOVE]},
            {role: 'upgraderRemote', name: 'UR24', sourceflagName: 'B9', targetflagName: 'B4', bodyparts: [WORK,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE]},
            {role: 'upgraderRemote', name: 'UR25', sourceflagName: 'B9', targetflagName: 'B4', bodyparts: [WORK,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE]},
            {role: 'upgraderRemote', name: 'UR26', sourceflagName: 'B9', targetflagName: 'B4', bodyparts: [WORK,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE]},
            {role: 'upgraderRemote', name: 'UR27', sourceflagName: 'B8', targetflagName: 'B4', bodyparts: [WORK,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE]},
            {role: 'upgraderRemote', name: 'UR28', sourceflagName: 'B8', targetflagName: 'B4', bodyparts: [WORK,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE]},
            {role: 'upgraderRemote', name: 'UR29', sourceflagName: 'B11', targetflagName: 'B4', bodyparts: [WORK,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE]},
            {role: 'upgraderRemote', name: 'UR291', sourceflagName: 'B11', targetflagName: 'B4', bodyparts: [WORK,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE]},
            {role: 'upgraderRemote', name: 'UR292', sourceflagName: 'B11', targetflagName: 'B4', bodyparts: [WORK,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE]},
            ],
            W52S29:
            [

//            {role: 'harvester', name: 'H311', bodyparts: [WORK,WORK,CARRY,MOVE]},
            {role: 'harvester', name: 'H312', bodyparts: [WORK,WORK,CARRY,MOVE]},
            {role: 'harvester', name: 'H312', bodyparts: [WORK,CARRY,CARRY,MOVE,MOVE]},
            {role: 'dropper', name: 'D311', sourceflagName: 'B13', bodyparts: [WORK,WORK,WORK,CARRY,MOVE]},
            {role: 'dropper', name: 'D312', sourceflagName: 'B14', bodyparts: [WORK,WORK,WORK,CARRY,MOVE]},
            {role: 'roadworker', name: 'R111', bodyparts: [WORK,WORK,CARRY,MOVE]},
            {role: 'upgrader', name: 'U312', bodyparts: [WORK,WORK,CARRY,MOVE,MOVE]},
//            {role: 'upgrader', name: 'U311', bodyparts: [WORK,WORK,CARRY,MOVE,MOVE]},
            ]
        }

//    Memory.sourceFrequency = {};
//    sources.forEach((source) => Memory.sourceFrequency[source.id] = 0 )



//    var sf = _.forEach(Game.creeps, (creep) => {  if (Memory.sourceFrequency[creep.memory.sourceId]>=0) Memory.sourceFrequency[creep.memory.sourceId]++ })
//    var nextSourceId = Object.keys(Memory.sourceFrequency).reduce((a, b) => Memory.sourceFrequency[a] < Memory.sourceFrequency[b] ? a : b)
//    var sf = _.forEach(Game.creeps, (creep) => { console.log("changing randomised ", creep.memory.sourceId, " "); creep.memory.sourceId = sources[(Math.floor((Math.random()* 10 )) % 2)].id;  })

//    console.log( Memory.nextSourceId, ' ', JSON.stringify(Memory.sourceFrequency))


//    console.log(Memory.sourceFrequency)

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }



    for(var name in Game.creeps) {

        var creep = Game.creeps[name];

//        Game.spawns['Spawn1'].room.visual.text(
        creep.room.visual.text(
            creep.memory.role.substring(0,1),
            creep.pos.x + 1,
            creep.pos.y,
            {align: 'left', opacity: 0.5});

        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
//            roleRoadworker.run(creep);
//            roleUpgrader.run(creep);
//            creep.moveTo(44,14)
//            roleRoadworker.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
//    roleAttacker.run(creep)
//            roleHarvester.run(creep);
//            roleRoadworker.run(creep);
//            roleContainerFiller.run(creep);
//          roleContainerDistributor.run(creep)
//            roleWorker.run(creep);
        }
        if(creep.memory.role == 'upgraderRemote') {
//            roleHarvester.run(creep);
//            roleRoadworker.run(creep);
// if (creep.name=='UR16')creep.suicide()
            roleUpgraderRemote.run(creep);
//            roleUpgrader.run(creep);
//            roleWorker.run(creep);
        }
        if(creep.memory.role == 'roadworker') {
            roleRoadworker.run(creep);
//            roleUpgrader(creep)
//            roleContainerFiller.run(creep);
//          roleContainerDistributor.run(creep)
//            roleHarvester.run(creep);
//            roleWorker.run(creep);
//            creep.moveTo(25,25)
        }
        if(creep.memory.role == 'worker') {
          roleContainerDistributor.run(creep)
//            roleWorker.run(creep);
//            roleRoadworker.run(creep);
//          roleHarvester.run(creep);
//            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'linkPuller') {
          roleLinkPuller.run(creep)
        }
        if(creep.memory.role == 'linkFiller') {
          roleLinkFiller.run(creep)
        }
        if(creep.memory.role == 'containerFiller') {
            roleContainerFiller.run(creep);
        }
        if(creep.memory.role == 'attacker') {
            roleAttacker.run(creep);
        }
        if(creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
        }
        if(creep.memory.role == 'healer') {
            roleHealer.run(creep);
        }
        if(creep.memory.role == 'dropper') {
            roleDropper.run(creep);
        }
//if (creep.name=='UR14') roleHarvester.run(creep)
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

//Game.creeps['Harvester7841134'].moveTo(42,12)
    }

}
