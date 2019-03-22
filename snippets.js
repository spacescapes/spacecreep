for (var g in Game.constructionSites){if (Game.constructionSites[g].progress == 0) {Game.constructionSites[g].remove()}}

for (var g in Game.constructionSites){if (Game.constructionSites[g].progress == 0 && Game.constructionSites[g].structureType == STRUCTURE_ROAD) {Game.constructionSites[g].remove()}}

Game.getObjectById("5c07a8f4806a5c4c7a0490b0").send(RESOURCE_ENERGY, 30000, 'W39N49')

Game.rooms.W52N45.find(FIND_HOSTILE_STRUCTURES, {filter: function(object){     			return (object.structureType == STRUCTURE_EXTENSION  );     		   }     		}).map((x)->destroy());
