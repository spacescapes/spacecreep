var roleHealer = {


    run: function(creep) {

        var targetFlag = Game.flags.Healer1
        if (!targetFlag) targetFlag = Game.flags.A1

            var enemy = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
		filter: function(object){
			return (object.hits < object.hitsMax);
//            return (object.name.startsWith('A'))
		   }
		})
//                console.log(creep.heal(enemy));
        if (enemy){
            if(creep.heal(enemy) == ERR_NOT_IN_RANGE) {
                creep.moveTo(enemy, {visualizePathStyle: {stroke: '#00ffff'}});
            }
//            if(!creep.pos.inRangeTo(Game.flags.A1,3)) creep.moveTo(Game.flags.A1, {visualizePathStyle: {stroke: '#00ffff'}})

        }
 /*
        var targetRoom = 'W55S29'
if (creep.room.name != targetRoom) {
        const exitDir = creep.room.findExitTo(targetRoom);
    const exit = creep.pos.findClosestByPath(exitDir);
    creep.moveTo(exit, {visualizePathStyle: {stroke: '#00ffff'}});
} else {
        //creep.moveTo(33,7)
}
*/
            if(!creep.pos.inRangeTo(targetFlag,3)) creep.moveTo(targetFlag, {visualizePathStyle: {stroke: '#00ffff'}})
//    creep.moveTo(48,16);
//            creep.moveTo(26,0)
//            creep.moveTo(27,45)

//            creep.moveTo(45,34)

//	}
}
};

module.exports = roleHealer;
