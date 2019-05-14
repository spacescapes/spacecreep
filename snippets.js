for (var g in Game.constructionSites){if (true) {Game.constructionSites[g].remove()}}

for (var g in Game.constructionSites){if (Game.constructionSites[g].progress == 0) {Game.constructionSites[g].remove()}}

for (var g in Game.constructionSites){if (Game.constructionSites[g].progress == 0 && Game.constructionSites[g].structureType == STRUCTURE_ROAD) {Game.constructionSites[g].remove()}}



Game.getObjectById("5c06f54b77ed0b360efdb7b8").send(RESOURCE_ENERGY, 120000, 'W48N51')

Game.rooms["W53N59"].find(FIND_HOSTILE_STRUCTURES, {filter: function(object){     			return (object.structureType == STRUCTURE_EXTENSION  );     		   }     		}).map((x)=>x.destroy());

Game.market.deal("5cd419dac3ee940f551c07f0", 2000, "W48N51")
Game.market.deal("5cd7605acfa523259c09f1ad", 2000, "W48N51")


Game.market.deal("5cd7605acfa523259c09f1ad", 10000, "W48N51")

