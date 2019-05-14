/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('main.helper');
 * mod.thing == 'a thing'; // true
 */

module.exports = {


    getBody: function (t1,b1,t2,b2,t3,b3,t4,b4,t5,b5){
        var body = []
        for (i = 1;i<=t1;i++){
            body.push(b1)
        }
        if (t2){
            for (i = 1;i<=t2;i++){
                body.push(b2)
            }
        }
        if (t3){
            for (i = 1;i<=t3;i++){
                body.push(b3)
            }
        }
        if (t4){
            for (i = 1;i<=t4;i++){
                body.push(b4)
            }
        }
        if (t5){
            for (i = 1;i<=t5;i++){
                body.push(b5)
            }
        }

        return (body)
    },
    getMixedBody: function (t1,b1,b2,b3,b4,b5){
        var body = []
        for (i = 1;i<=t1;i++){
            body.push(b1)
            if (b2) body.push(b2)
            if (b3) body.push(b3)
            if (b4) body.push(b4)
            if (b5) body.push(b5)
        }
        return (body)
    },

    getMixedBodyGood: function (t1,a1,t2,a2,t3,a3,t4,a4){
        var body = []
        for (i = 1;i<=t1;i++){
            for (var part of a1){
                body.push(part)
            }
        }
        if (t2){
            for (i = 1;i<=t2;i++){
                for (var part of a2){
                    body.push(part)
                }
            }
        }
        if (t3){
            for (i = 1;i<=t3;i++){
                for (var part of a3){
                    body.push(part)
                }
            }
        }
        if (t4){
            for (i = 1;i<=t4;i++){
                for (var part of a4){
                    body.push(part)
                }
            }
        }
        return (body)
    },

    recycleCreep: function (creep){
        var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => { return (structure.structureType == STRUCTURE_SPAWN  ); }
                    });

        if (creep.pos.isNearTo(target)){
            creep.say("spawn recycling")
            target.recycleCreep(creep)
        } else {
            creep.say("recycling")
            creep.moveTo(target)
        }
    },


    dismantle: function (creep){
        var structure = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
                		filter: function(object){
                			return (object.hits > 0) /*&& (object.structureType==STRUCTURE_TOWER) */;
                		   }
                		});
        structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                		filter: function(object){
                			return (object.id == '5bd8939bd059f7206dd54772') /*&& (object.structureType==STRUCTURE_TOWER) */;
                		   }
                		});
        if (structure){
            if (creep.pos.isNearTo(structure)){
                creep.say("dismantle")
                creep.dismantle(structure)
            } else {
                creep.say("prep dismantle")
                creep.moveTo(structure)
            }
        }
    },
    doDeal: function(offset, resource, quantity, roomName, minimum){
    //    var resource = RESOURCE_HYDROGEN;
    //    var resource = RESOURCE_POWER;
//             var  resource = RESOURCE_ENERGY
//        resource = RESOURCE_KEANIUM
//        resource = RESOURCE_LEMERGIUM
//        resource = RESOURCE_CATALYZED_GHODIUM_ACID
    //    resource = RESOURCE_ZYNTHIUM;
//        console.log("checking deal: "+roomName+" " +Game.rooms[roomName].storage.store[resource])
            if (!Game.rooms[roomName] || !Game.rooms[roomName].terminal){
                return(0)
            }

            if (!resource){
                resource = _.max( Object.keys(Game.rooms[roomName].terminal.store), (r) => (Game.rooms[roomName].terminal.store[r]))
//                console.log(resource + " " + roomName)
//                console.log(JSON.stringify(Game.rooms[roomName].terminal.store))
                minimum = 150000
            }



        if ((false || ( Game.time % 15 == offset )) && (_.sum(Game.rooms[roomName].terminal.store) > minimum)){
            console.log(Game.time % 15)


            var buyOrders = Game.market.getAllOrders({type: ORDER_BUY, resourceType: resource});
            var sellOrders = Game.market.getAllOrders({type: ORDER_SELL, resourceType: resource});

            var maxOrder = _.max(buyOrders, ((a) => (a.price)));
            var minOrder = _.min(sellOrders, ((a) => (a.price)));

//        var order = minOrder
            var order = maxOrder

            var dealResult = Game.market.deal(order.id, quantity, roomName)

            console.log("deal: "+roomName+" " +Game.rooms[roomName].terminal.store[resource] + " result: " + dealResult)

        }


    },
    buildSetup: function (){
        if (Game.rooms["W48N52"]) Game.rooms["W48N52"].createConstructionSite(20,38,STRUCTURE_RAMPART)
        if (Game.rooms["W48N52"]) Game.rooms["W48N52"].createConstructionSite(20,38,STRUCTURE_SPAWN)
        if (Game.rooms["W48N52"]) Game.rooms["W48N52"].createConstructionSite(43,44,STRUCTURE_RAMPART)

        if (Game.rooms["W48N51"]) Game.rooms["W48N51"].createConstructionSite(26,34,STRUCTURE_RAMPART)
        if (Game.rooms["W48N51"]) Game.rooms["W48N51"].createConstructionSite(26,34,STRUCTURE_SPAWN)
        if (Game.rooms["W48N51"]) Game.rooms["W48N51"].createConstructionSite(37,33,STRUCTURE_RAMPART)

        if (Game.rooms["W51N51"]) Game.rooms["W51N51"].createConstructionSite(35,29,STRUCTURE_RAMPART)
        if (Game.rooms["W51N51"]) Game.rooms["W51N51"].createConstructionSite(35,29,STRUCTURE_SPAWN)


        if (Game.rooms["W37N48"]) Game.rooms["W37N48"].createConstructionSite(23,13,STRUCTURE_SPAWN)
        if (Game.rooms["W39N49"]) Game.rooms["W39N49"].createConstructionSite(31,33,STRUCTURE_SPAWN)
        if (Game.rooms["W39N49"]) Game.rooms["W39N49"].createConstructionSite(31,33,STRUCTURE_RAMPART)
        if (Game.rooms["W42N43"]) Game.rooms["W42N43"].createConstructionSite(11,34,STRUCTURE_WALL)
        if (Game.rooms["W42N43"]) Game.rooms["W42N43"].createConstructionSite(11,35,STRUCTURE_WALL)
        if (Game.rooms["W42N43"]) Game.rooms["W42N43"].createConstructionSite(11,36,STRUCTURE_WALL)
        if (Game.rooms["W42N43"]) Game.rooms["W42N43"].createConstructionSite(10,36,STRUCTURE_WALL)
        if (Game.rooms["W42N43"]) Game.rooms["W42N43"].createConstructionSite(9,36,STRUCTURE_WALL)
        if (Game.rooms["W43N43"]) Game.rooms["W43N43"].createConstructionSite(6,38,STRUCTURE_WALL)
        if (Game.rooms["W43N43"]) Game.rooms["W43N43"].createConstructionSite(6,39,STRUCTURE_WALL)
        if (Game.rooms["W44N43"]) Game.rooms["W44N43"].createConstructionSite(16,23,STRUCTURE_SPAWN)
        if (Game.rooms["W44N43"]) Game.rooms["W44N43"].createConstructionSite(16,23,STRUCTURE_RAMPART)
        if (Game.rooms["W46N33"]) Game.rooms["W46N33"].createConstructionSite(10,17,STRUCTURE_SPAWN)
        if (Game.rooms["W45N43"]) Game.rooms["W45N43"].createConstructionSite(36,41,STRUCTURE_SPAWN)
        if (Game.rooms["W45N43"]) Game.rooms["W45N43"].createConstructionSite(36,41,STRUCTURE_RAMPART)
        if (Game.rooms["W45N43"]) Game.rooms["W45N43"].createConstructionSite(32,38,STRUCTURE_WALL)
        if (Game.rooms["W45N43"]) Game.rooms["W45N43"].createConstructionSite(32,39,STRUCTURE_WALL)
        if (Game.rooms["W45N43"]) Game.rooms["W45N43"].createConstructionSite(31,39,STRUCTURE_WALL)
        if (Game.rooms["W48N46"]) Game.rooms["W48N46"].createConstructionSite(21,47,STRUCTURE_WALL)
        if (Game.rooms["W48N46"]) Game.rooms["W48N46"].createConstructionSite(46,9,STRUCTURE_WALL)
        if (Game.rooms["W48N46"]) Game.rooms["W48N46"].createConstructionSite(37,35,STRUCTURE_SPAWN)
        if (Game.rooms["W48N46"]) Game.rooms["W48N46"].createConstructionSite(37,35,STRUCTURE_RAMPART)
        if (Game.rooms["W48N46"]) Game.rooms["W48N46"].createConstructionSite(39,32,STRUCTURE_SPAWN)
        if (Game.rooms["W48N46"]) Game.rooms["W48N46"].createConstructionSite(39,32,STRUCTURE_RAMPART)
        if (Game.rooms["W48N46"]) Game.rooms["W48N46"].createConstructionSite(35,33,STRUCTURE_SPAWN)
        if (Game.rooms["W48N46"]) Game.rooms["W48N46"].createConstructionSite(35,33,STRUCTURE_RAMPART)

        if (Game.rooms["W48N46"]) Game.rooms["W48N46"].createConstructionSite(40,3,STRUCTURE_RAMPART)
        if (Game.rooms["W48N46"]) Game.rooms["W48N46"].createConstructionSite(41,3,STRUCTURE_RAMPART)
        if (Game.rooms["W48N46"]) Game.rooms["W48N46"].createConstructionSite(42,3,STRUCTURE_RAMPART)
        if (Game.rooms["W48N46"]) Game.rooms["W48N46"].createConstructionSite(22,47,STRUCTURE_RAMPART)


        if (Game.rooms["W47N46"]) Game.rooms["W47N46"].createConstructionSite(44,41,STRUCTURE_RAMPART)
        if (Game.rooms["W47N46"]) Game.rooms["W47N46"].createConstructionSite(44,41,STRUCTURE_SPAWN)
        if (Game.rooms["W47N46"]) Game.rooms["W47N46"].createConstructionSite(12,47,STRUCTURE_RAMPART)
        if (Game.rooms["W47N46"]) Game.rooms["W47N46"].createConstructionSite(13,47,STRUCTURE_WALL)
        if (Game.rooms["W47N46"]) Game.rooms["W47N46"].createConstructionSite(14,47,STRUCTURE_WALL)
        if (Game.rooms["W47N46"]) Game.rooms["W47N46"].createConstructionSite(15,47,STRUCTURE_WALL)
        if (Game.rooms["W47N46"]) Game.rooms["W47N46"].createConstructionSite(16,47,STRUCTURE_WALL)
        if (Game.rooms["W47N46"]) Game.rooms["W47N46"].createConstructionSite(17,47,STRUCTURE_WALL)
        if (Game.rooms["W47N46"]) Game.rooms["W47N46"].createConstructionSite(18,47,STRUCTURE_WALL)
        if (Game.rooms["W47N46"]) Game.rooms["W47N46"].createConstructionSite(19,47,STRUCTURE_WALL)
        if (Game.rooms["W47N46"]) Game.rooms["W47N46"].createConstructionSite(20,47,STRUCTURE_WALL)
        if (Game.rooms["W47N46"]) Game.rooms["W47N46"].createConstructionSite(21,47,STRUCTURE_WALL)
        if (Game.rooms["W47N46"]) Game.rooms["W47N46"].createConstructionSite(23,47,STRUCTURE_WALL)
        if (Game.rooms["W47N46"]) Game.rooms["W47N46"].createConstructionSite(23,48,STRUCTURE_WALL)

        if (Game.rooms["W47N29"]) Game.rooms["W47N29"].createConstructionSite(4,37,STRUCTURE_WALL)
        if (Game.rooms["W47N29"]) Game.rooms["W47N29"].createConstructionSite(5,37,STRUCTURE_WALL)

        if (Game.rooms["W48N54"]) Game.rooms["W48N54"].createConstructionSite(13,19,STRUCTURE_RAMPART)
        if (Game.rooms["W48N54"]) Game.rooms["W48N54"].createConstructionSite(13,19,STRUCTURE_SPAWN)

        if (Game.rooms["W47N44"]) Game.rooms["W47N44"].createConstructionSite(23,41,STRUCTURE_RAMPART)
        if (Game.rooms["W47N44"]) Game.rooms["W47N44"].createConstructionSite(23,41,STRUCTURE_SPAWN)
        if (Game.rooms["W47N44"]) Game.rooms["W47N44"].createConstructionSite(45,35,STRUCTURE_RAMPART)
        if (Game.rooms["W47N44"]) Game.rooms["W47N44"].createConstructionSite(45,34,STRUCTURE_RAMPART)
        if (Game.rooms["W47N44"]) Game.rooms["W47N44"].createConstructionSite(16,2,STRUCTURE_RAMPART)
        if (Game.rooms["W47N44"]) Game.rooms["W47N44"].createConstructionSite(17,2,STRUCTURE_RAMPART)

        if (Game.rooms["W49N49"]) Game.rooms["W49N49"].createConstructionSite(46,18,STRUCTURE_RAMPART)
        if (Game.rooms["W49N49"]) Game.rooms["W49N49"].createConstructionSite(29,27,STRUCTURE_RAMPART)
        if (Game.rooms["W49N49"]) Game.rooms["W49N49"].createConstructionSite(29,27,STRUCTURE_SPAWN)
        if (Game.rooms["W49N49"]) Game.rooms["W49N49"].createConstructionSite(23,18,STRUCTURE_RAMPART)
        if (Game.rooms["W49N49"]) Game.rooms["W49N49"].createConstructionSite(23,18,STRUCTURE_SPAWN)
        if (Game.rooms["W49N49"]) Game.rooms["W49N49"].createConstructionSite(22,35,STRUCTURE_RAMPART)
        if (Game.rooms["W49N49"]) Game.rooms["W49N49"].createConstructionSite(22,35,STRUCTURE_SPAWN)
        },

    marketTrade: function (){
        this.doDeal(1, undefined,  1500, 'W49N49', 90000)
        this.doDeal(2, undefined,  1500, 'W48N51', 90000)
        this.doDeal(3, undefined,  1500, 'W48N52', 90000)
        this.doDeal(4, undefined,  1500, 'W48N54', 90000)
        this.doDeal(5, undefined,  1500, 'W51N51', 90000)
        this.doDeal(5, undefined,  1500, 'W52N45', 90000)
        this.doDeal(6, undefined,  1500, 'W43N43', 90)
//        this.doDeal(6, RESOURCE_ENERGY,  1500, 'W43N43', 90000)
        this.doDeal(7, undefined,  1500, 'W42N43', 90000)
//        this.doDeal(8, undefined,  1500, 'W48N46', 90000)
//        this.doDeal(9, undefined,  1500, 'W39N49', 90000)
//        this.doDeal(10, undefined, 1500, 'W37N48', 90000)
        this.doDeal(11, undefined,  1500, 'W42N35', 90000)
        this.doDeal(12, undefined,  1500, 'W42N32', 90000)
/*
        this.doDeal(1, RESOURCE_ENERGY,  1500, 'W49N49', 90000)
        this.doDeal(2, RESOURCE_ENERGY,  1500, 'W48N51', 90000)
        this.doDeal(2, RESOURCE_LEMERGIUM,  1500, 'W48N51', 30000)
        this.doDeal(3, RESOURCE_ENERGY,  1500, 'W48N52', 90000)
        this.doDeal(4, RESOURCE_ENERGY,  1500, 'W48N54', 90000)
        this.doDeal(5, RESOURCE_ENERGY,  1500, 'W51N51', 90000)
        this.doDeal(6, RESOURCE_KEANIUM,  1500, 'W43N43', 10000)
        this.doDeal(6, RESOURCE_ENERGY,  1500, 'W43N43', 90000)
//        this.doDeal(6, RESOURCE_ENERGY,  1500, 'W43N43', 90000)
        this.doDeal(7, RESOURCE_ENERGY,  1500, 'W42N43', 90000)
        this.doDeal(8, RESOURCE_ENERGY,  1500, 'W48N46', 90000)
        this.doDeal(9, RESOURCE_ENERGY,  1500, 'W39N49', 90000)
        this.doDeal(10, RESOURCE_ENERGY, 1500, 'W37N48', 90000)
        this.doDeal(11, RESOURCE_LEMERGIUM,  1500, 'W42N35', 90000)
        this.doDeal(12, RESOURCE_ENERGY,  1500, 'W42N32', 90000)
*/


//var dealResult = Game.market.deal(order.id, 8500, 'W48N54')
 //var dealResult = Game.market.deal(order.id, 1000, 'W48N54')
    //    Game.market.deal(order.id, 50, 'W55S27')   // bei 50 stabil auf 1m in 4 tagen
    //    Game.market.deal(order.id, 10000, 'W52S41')

    //    orders = Game.market.getAllOrders({type: ORDER_BUY, resourceType: RESOURCE_KEANIUM});

    //    maxOrder = _.max(orders, ((a) => (a.price)));


    },

    signController: function (creep){
        var target = creep.room.controller
        creep.moveTo(creep.room.controller)

        if (creep.pos.isNearTo(creep.room.controller)){
            creep.signController(creep.room.controller, 'when one needs, one answers, When one answers, one gives. Then one gives; one thanks.')
        }
    }

};