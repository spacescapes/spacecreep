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
    marketTrade: function (){
    //    var resource = RESOURCE_HYDROGEN;
    //    var resource = RESOURCE_POWER;
        resource = RESOURCE_ENERGY;
//        resource = RESOURCE_LEMERGIUM
//        resource = RESOURCE_CATALYZED_GHODIUM_ACID
    //    resource = RESOURCE_ZYNTHIUM;
        var buyOrders = Game.market.getAllOrders({type: ORDER_BUY, resourceType: resource});
        var sellOrders = Game.market.getAllOrders({type: ORDER_SELL, resourceType: resource});

        var maxOrder = _.max(buyOrders, ((a) => (a.price)));
        var minOrder = _.min(sellOrders, ((a) => (a.price)));

//        var order = minOrder
        var order = maxOrder

       // Game.market.deal(maxOrder.id, 5000, 'W51N49')

//        var dealResult = Game.market.deal(order.id, 10, 'W48N51')   // bei 100 in 4 Tagen 400k verbrauch  (585k nach 4 tagen fÃ¼lgrad)

        var dealResult

        var dealResult = Game.market.deal(order.id, 150, 'W51N49')
//        var dealResult = Game.market.deal(order.id, 10, 'W49N49')
        var dealResult = Game.market.deal(order.id, 150, 'W48N51')
        var dealResult = Game.market.deal(order.id, 120, 'W48N52')
        var dealResult = Game.market.deal(order.id, 150, 'W48N54')
        var dealResult = Game.market.deal(order.id, 150, 'W51N51')
        var dealResult = Game.market.deal(order.id, 150, 'W43N43')
        var dealResult = Game.market.deal(order.id, 150, 'W42N43')
        var dealResult = Game.market.deal(order.id, 150, 'W48N46')


//var dealResult = Game.market.deal(order.id, 8500, 'W48N54')
 //var dealResult = Game.market.deal(order.id, 1000, 'W48N54')
    //    Game.market.deal(order.id, 50, 'W55S27')   // bei 50 stabil auf 1m in 4 tagen
    //    Game.market.deal(order.id, 10000, 'W52S41')

    //    orders = Game.market.getAllOrders({type: ORDER_BUY, resourceType: RESOURCE_KEANIUM});

    //    maxOrder = _.max(orders, ((a) => (a.price)));


        console.log("Deal: "+order.price+ " result: "+ dealResult)

    },

    signController: function (creep){
        var target = creep.room.controller
        creep.moveTo(creep.room.controller)

        if (creep.pos.isNearTo(creep.room.controller)){
            creep.signController(creep.room.controller, 'when one needs, one answers, When one answers, one gives. Then one gives; one thanks.')
        }
    }

};