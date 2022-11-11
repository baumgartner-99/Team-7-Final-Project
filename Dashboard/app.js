function init(){
    var selector =d3.select("#selDataset");

    d3.json("data/clean_collegefootball.json").then(function(data) {
        console.log(data[0].id)
        var game_ids = data.id;
        console.log(game_ids)

        data.forEach((game) => {
            selector
                .append("option")
                .text(game)
                .property("value", game);
        });

        var firstGame = game_ids[0];

    });
}

init();

function optionChanged(newGame) {
    buildData(newGame);
}

function buildData(game) {
    d3.json("/data/clean_collegefootball.json").then((data) => {
        var games = data.id;
        var resultArray = games.filter(sampleObj => sampleObj.game == game);
        var result = resultArray[0];
        var PANEL = d3.select("#game-data");

        PANEL.html("");

        Object.entries(result).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    });
}