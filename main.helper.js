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

            if (!resource){
                resource = _.max( Object.keys(Game.rooms[roomName].terminal.store), (r) => (Game.rooms[roomName].terminal.store[r]))
                console.log(resource + " " + roomName)
                console.log(JSON.stringify(Game.rooms[roomName].terminal.store))
                minimum = 200000
            }


        if ((Game.time % 15 == offset ) && (_.sum(Game.rooms[roomName].terminal.store) > minimum)){
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
    marketTrade: function (){
        this.doDeal(1, undefined,  1500, 'W49N49', 90000)
        this.doDeal(2, undefined,  1500, 'W48N51', 90000)
        this.doDeal(3, undefined,  1500, 'W48N52', 90000)
        this.doDeal(4, undefined,  1500, 'W48N54', 90000)
        this.doDeal(5, undefined,  1500, 'W51N51', 90000)
        this.doDeal(6, undefined,  1500, 'W43N43', 90000)
//        this.doDeal(6, RESOURCE_ENERGY,  1500, 'W43N43', 90000)
        this.doDeal(7, undefined,  1500, 'W42N43', 90000)
        this.doDeal(8, undefined,  1500, 'W48N46', 90000)
        this.doDeal(9, undefined,  1500, 'W39N49', 90000)
        this.doDeal(10, undefined, 1500, 'W37N48', 90000)
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