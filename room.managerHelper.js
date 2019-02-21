/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('room.managerHelper');
 * mod.thing == 'a thing'; // true
 */

module.exports = {

    create2DArray: function (rows) {
      var arr = [];

      for (var i=0;i<rows;i++) {
         arr[i] = [];
      }

      return arr;
    },
    updateMap: function(room){
        if (!Memory.moveMap) { Memory.moveMap = {} }
        if (!Memory.moveMap[room.name]) { Memory.moveMap[room.name] = this.create2DArray(50) }
        room.find(FIND_MY_CREEPS).forEach((creep)=>{
            if (creep.fatigue > 0){
                Memory.moveMap[room.name][creep.pos.x][creep.pos.y] = Memory.moveMap[room.name][creep.pos.x][creep.pos.y]+1
            }
        })

    },
    buildRoadsFromMap: function(room){
        var roads = room.find(FIND_STRUCTURES, {
		filter: function(object){
			return (object.structureType === STRUCTURE_ROAD );
		   }
		});
		if (roads.length > 100) return(0)
        var biggestRoad = [0,0,0]
        if (room.find(FIND_CONSTRUCTION_SITES).length < 1){
            for (var x = 0; x < 50; x++){
                for (var y = 0; y < 50; y++){
                    if (Memory.moveMap[room.name][x][y] > 0) {
    //                    console.log(Memory.moveMap[room.name][x][y])
                        if (!room.lookForAt(LOOK_STRUCTURES, x,y).length && !room.lookForAt(LOOK_CONSTRUCTION_SITES, x,y).length){
                            if (Memory.moveMap[room.name][x][y] > biggestRoad[2]){
                                biggestRoad[0] = x;
                                biggestRoad[1] = y;
                                biggestRoad[2] = Memory.moveMap[room.name][x][y]
                            }
                        }
                    }
                }
            }
            if (biggestRoad[0] != 0){
                room.visual.text("ROAD BUILD HERE",biggestRoad[0],biggestRoad[1],{align: 'left', opacity: 1.0, font: 1.0});
                room.createConstructionSite(biggestRoad[0],biggestRoad[1], STRUCTURE_ROAD)
            }
        }

        Memory.moveMap[room.name] = this.create2DArray(50)

    },
    createRoad: function(room, from, to ){
        var ps = PathFinder.search(from, to)
        ps.path.forEach((p)=>{ room.createConstructionSite(p, STRUCTURE_ROAD) })
    },
    createExtensionGroup: function(room, x, y ){
//console.log("CREATING Extension")
        var build = []
        var cs = room.find(FIND_CONSTRUCTION_SITES)
        var positions = [[x,y], [x+1,y], [x+1,y+1], [x,y+1], [x-1,y],[x-1,y-1], [x,y-1]]
        var roadpositions = [[x+2,y],  [x+1,y+2],[x+2,y+1],[x,y+2], [x-1,y+1],[x-2,y],[x-2,y-1],[x+1,y-1],[x,y-2],[x-1,y-2]]
        for (var position in positions){
            var p = new RoomPosition(positions[position][0],positions[position][1], room.name)
            if ((p.lookFor(LOOK_STRUCTURES).length >= 1) && p.lookFor(LOOK_STRUCTURES)[0].structureType == STRUCTURE_EXTENSION){
//                console.log("p look"+ JSON.stringify(p.lookFor(LOOK_STRUCTURES)))
            }
            if (!(((p.lookFor(LOOK_STRUCTURES).length >= 1) && p.lookFor(LOOK_STRUCTURES)[0].structureType == STRUCTURE_EXTENSION) || (p.look().length <= 1 && p.look()[0].terrain == 'plain') || (p.look().length <= 1 && p.look()[0].terrain == 'swamp'))){
                room.visual.text("De"+x+" "+y,p,{align: 'left', opacity: 0.7, font: 0.6});
                return(0)
            }
        }
        for (var position in roadpositions){
            var p = new RoomPosition(roadpositions[position][0],roadpositions[position][1], room.name)
            if (!(((p.lookFor(LOOK_STRUCTURES).length >= 1) && (p.lookFor(LOOK_STRUCTURES)[0].structureType == STRUCTURE_ROAD || p.lookFor(LOOK_STRUCTURES)[0].structureType == STRUCTURE_EXTENSION)) || (p.look().length <= 1 && p.look()[0].terrain == 'plain') || (p.look().length <= 1 && p.look()[0].terrain == 'swamp'))){
                room.visual.text("Dr"+x+" "+y,p,{align: 'left', opacity: 0.7, font: 0.6});
                return(0)

            }
        }

        for (var position in positions){
            var p = new RoomPosition(positions[position][0],positions[position][1], room.name)
            room.visual.text("x",p,{align: 'left', opacity: 0.7, font: 0.6});
            if (room.createConstructionSite(p, STRUCTURE_EXTENSION) != OK){
                build.forEach((c)=>{if (c.lookFor(LOOK_CONSTRUCTION_SITES).length>0){c.lookFor(LOOK_CONSTRUCTION_SITES)[0].remove()}})
                return(0)
            } else {
                build.push(p)
            }
        }
        for (var position in roadpositions){
            var p = new RoomPosition(roadpositions[position][0],roadpositions[position][1], room.name)
            room.visual.text("R",p,{align: 'left', opacity: 0.7, font: 0.6});
//            if (room.createConstructionSite(p, STRUCTURE_ROAD) == OK){
//                build.push(p)
//            }
        }

//        room.createConstructionSite(new RoomPosition(x,y, room.name), STRUCTURE_EXTENSION)
    },

    equipRoom: function(room){

    var create="buildx"
    if (Game.time % 50 == 0){
        create = "build"
    }
    var createRoom = 'W48N54'
    if (create=='build' /* && room.name == createRoom*/){
//      if (spawnMapEntry.room.construct){

        var spawn = room.find(FIND_STRUCTURES, {filter: function(c){return( c.structureType == STRUCTURE_SPAWN)}})[0]
/*
        var es = spawn.pos.findInRange(FIND_STRUCTURES, 2, {filter: function(c){return (c.structureType == STRUCTURE_EXTENSION)}})
        es.forEach((e)=>{
                    console.log("e:"+e)
            var earounds = e.pos.findInRange(FIND_STRUCTURES, 1, {filter: function(c){return (c.structureType == STRUCTURE_EXTENSION)}})
            if (earounds.length==0){

            }
        })
        console.log("e:"+es.length)
      */

        for (var yoffset = -4; yoffset <= 5;yoffset++ ){
            for (var xoffset = -5; xoffset <= 5;xoffset++ ){
                this.createExtensionGroup(room, spawn.pos.x+xoffset, spawn.pos.y+yoffset)

            }

        }

/*
        room.find(FIND_SOURCES).forEach((object)=>{
            this.createRoad(room, room.controller.pos, object.pos)
            room.find(FIND_SOURCES).forEach((object2)=>{
                this.createRoad(room, object2.pos, object.pos)
            })
        })
        room.find(FIND_CONSTRUCTION_SITES).forEach((object)=>{
            if (object.structureType == STRUCTURE_SPAWN){
                room.find(FIND_SOURCES).forEach((object2)=>{
                    this.createRoad(room, object.pos, object2.pos)
                    this.createRoad(room, object2.pos, room.controller.pos)
                })
                this.createRoad(room, object.pos, room.controller.pos)
            }
        })
*/
    }

    if (create=='delete'  && room.name == createRoom){

            room.find(FIND_CONSTRUCTION_SITES).forEach((c)=>{if ((c.structureType == STRUCTURE_ROAD || c.structureType == STRUCTURE_EXTENSION ) && c.progress < 1){c.remove() }})

        }

    //    console.log("CONStruCT: "+ room.createConstructionSite(new RoomPosition(26,24, room.name), STRUCTURE_SPAWN))
    //return(0)
    //    var links = room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_LINK}});

    },


};