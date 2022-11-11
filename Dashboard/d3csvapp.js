function init(){
    let selector = d3.select("#selDataset");

    d3.csv("data/clean_collegefootball.csv", function(data){
        let games = [data.id];

        games.forEach((game)=> {
            selector
                .append("option")
                .text(game)
                .property("value", game);
        });
    
        let firstGame = games[0];
    })
};

init();

function optionChanged(newGame) {
    buildData(newGame);
}

function buildData(game) {
    d3.csv("data/clean_collegefootball.csv", function(data) {
        let games = data.id;
        let resultArray = games.filter(function(sampleGame) {
            console.log(sampleGame.id == game)
        let results = resultArray[0]
        var PANEL = d3.select("#game-data");

        PANEL.html("");

        Object.entries(results).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
        })
    })
})};
