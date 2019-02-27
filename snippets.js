for (var g in Game.constructionSites){if (Game.constructionSites[g].progress == 0) {Game.constructionSites[g].remove()}}

for (var g in Game.constructionSites){if (Game.constructionSites[g].progress == 0 && Game.constructionSites[g].structureType == STRUCTURE_ROAD) {Game.constructionSites[g].remove()}}

Game.getObjectById("5c03f60113c57d567e82016a").send(RESOURCE_ENERGY, 30000, 'W42N43')