function init(){
    var selector =d3.select("#selDataset");

    d3.json("../Data/ML_ready_data.json").then(function(data) {
        var gameIDS = data;

        gameIDS.forEach((game) => {
            selector
                .append("option")
                .text(game.id)
                .property("value", game.id);
        });

        var firstGame = gameIDS[0].id;
        buildCharts(firstGame)
        buildGameData(firstGame)
    });
}

init();

function optionChanged(newGame) {
    buildCharts(newGame)
    buildGameData(newGame);
}

function buildGameData(game) {
    d3.json("../Data/ML_ready_data.json").then((data) => {
        var arrayOfGames = []
        data.forEach((item) => {
            arrayOfGames.push(item);
        });
        var resultArray = arrayOfGames.filter(sampleObj => sampleObj.id == game);
        var result = resultArray[0];
        var PANEL = d3.select("#game-data");

        PANEL.html("");

        Object.entries(result).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    });
}


function buildCharts(game) {
    // Use d3.json to load and retrieve the .json file 
    d3.json("../Data/ML_ready_data.json").then((data) => {
      var arrayOfGames2 = []
        data.forEach((item) => {
            arrayOfGames2.push(item);
        });
      // filtering teams based on gameID. Using GameId to figure out home and away team data.
      var resultArrayHome = arrayOfGames2.filter(sampleObj => sampleObj.id == game);
      var homeTeamFilter = arrayOfGames2.filter(sampleObj => sampleObj.home_team_x == resultArrayHome[0].home_team_x)
      var awayTeamFilter = arrayOfGames2.filter(sampleObj => sampleObj.away_team_x == resultArrayHome[0].away_team_x)

      //  Create a variable that holds the first sample in the array.
      var resultHome = homeTeamFilter[0];
      var resultAway = awayTeamFilter[0];
  
     
      var resultHomeTeam = resultHome.home_team_x;
      var resultAwayTeam = resultAway.away_team_x;

      //looping through all of the arrays to find the average score of away and home games
      // first i'm placing everyu score into the array. We will do stuff with the numbers later
      var homeArrayEmpty = [];
      homeTeamFilter.forEach((item) => {
        homeArrayEmpty.push(item.home_points);
        });

      var awayArrayEmpty = [];
      awayTeamFilter.forEach((item) => {
        awayArrayEmpty.push(item.away_points);
        });

        var allHomeScores = [];
        arrayOfGames2.forEach((item) => {
            allHomeScores.push(item.home_points);
            });
        var allAwayScores = [];
        arrayOfGames2.forEach((item) => {
            allAwayScores.push(item.away_points);
            });

        // Finding the average home score per team
        var averageHomeScore = homeArrayEmpty.reduce((a, b) => a + b, 0) / homeArrayEmpty.length;
        var averageAwayScore = awayArrayEmpty.reduce((a, b) => a + b, 0) / awayArrayEmpty.length;
        var averageHomeLeagueScore = allHomeScores.reduce((a, b) => a + b, 0) / allHomeScores.length;
        var averageAwayLeagueScore = allAwayScores.reduce((a, b) => a + b, 0) / allAwayScores.length;


        // creating the data for the line chart
        // we need the average for each season
        var averagePointSeasonHome = [];
        var averagePointSeasonAway = [];
        var averageYearArray = [];
        var averagePointSeasonTeamA = [];
        var averagePointSeasonTeamB = [];

        for (let i = 2015; i < 2023; i++){
            let allTeamAverageSeason = arrayOfGames2.filter(sampleObj => sampleObj.season == i);
            let pointHolderH = [];
            let pointHolderA = [];
            allTeamAverageSeason.forEach((item) => {
                pointHolderH.push(item.home_points);
                pointHolderA.push(item.away_points);
                });

            let averagePointSeasonErased = pointHolderH.reduce((a, b) => a + b, 0) / pointHolderH.length;
            let averagePointSeasonErasedA = pointHolderA.reduce((a, b) => a + b, 0) / pointHolderA.length;
            averagePointSeasonHome.push(averagePointSeasonErased)
            averagePointSeasonAway.push(averagePointSeasonErasedA)
            averageYearArray.push(i)

            // FIltering home and away teams now instad of all teams
            // we already have variables set up above
            let SpecificTeamH = homeTeamFilter.filter(sampleObj => sampleObj.season == i)
            let SpecificTeamA = awayTeamFilter.filter(sampleObj => sampleObj.season == i)
            let pointHolderH2 = [];
            let pointHolderA2 = [];
            SpecificTeamH.forEach((item) => {
                pointHolderH2.push(item.home_points);
                });
            SpecificTeamA.forEach((item) => {
                pointHolderA2.push(item.away_points);
            });

            let averagePointSeasonErasedH2 = pointHolderH2.reduce((a, b) => a + b, 0) / pointHolderH2.length;
            let averagePointSeasonErasedA2 = pointHolderA2.reduce((a, b) => a + b, 0) / pointHolderA2.length;
            averagePointSeasonTeamA.push(averagePointSeasonErasedH2)
            averagePointSeasonTeamB.push(averagePointSeasonErasedA2)
            

        }


      // Create the trace for the bar chart. 
      var barData = [{
        x: [resultHomeTeam.concat(' ', "Home Average"), "Average Home Score", "Average Away Score", resultAwayTeam.concat(' ', "Away Average")],
        y: [averageHomeScore, averageHomeLeagueScore, averageAwayLeagueScore, averageAwayScore],
        type: "bar",
        orientation: "v"
        
      }];
      // Create the layout for the bar chart. 
      var barLayout = {
        title: "Average Home and Away Points",
        yaxis: {title: 'Points Scored'},
        plot_bgcolor:"#e7feff",
        paper_bgcolor:"#FFF3",
        font: {
            family: 'Courier New, monospace',
            size: 13,
            color: '#000000'
          }
      };

      Plotly.newPlot("bar", barData, barLayout);

      var barData2 = [{
        x: [resultHomeTeam, "Average Home Score", "Average Away Score", resultAwayTeam],
        y: [resultArrayHome[0].home_points, averageHomeLeagueScore, averageAwayLeagueScore, resultArrayHome[0].away_points],
        type: "bar",
        orientation: "v"
        
      }];
      // Create the layout for the bar chart. 
      var barLayout2 = {
        title: "Single Game Points vs Average Home Points",
        yaxis: {title: 'Points Scored'},
        plot_bgcolor:"#e7feff",
        paper_bgcolor:"#FFF3",
        font: {
            family: 'Courier New, monospace',
            size: 13,
            color: '#000000'
          }
      };

      Plotly.newPlot("bar2", barData2, barLayout2);


      var trace1 = {
        x: averageYearArray,
        y: averagePointSeasonHome,
        mode: 'lines',
        name: 'League Average Home',
        line: {
            dash: 'dot',
            width: 4
          }
      };
      
      var trace2 = {
        x: averageYearArray,
        y: averagePointSeasonAway,
        mode: 'lines',
        name: 'League Average Away',
        line: {
            dash: 'dot',
            width: 4
          }
      };
      
      var trace3 = {
        x: averageYearArray,
        y: averagePointSeasonTeamA,
        mode: 'lines+markers',
        name: resultHomeTeam.concat(' ', "Home Average")
      };
      
      var trace4 = {
        x: averageYearArray,
        y: averagePointSeasonTeamB,
        mode: 'lines+markers',
        name: resultAwayTeam.concat(' ', "Away Average")
      };

      var data = [ trace1, trace2, trace3, trace4 ];
      
      var layout = {
        title:'Average Scoring Based on Home and Away',
        plot_bgcolor:"#e7feff",
        paper_bgcolor:"#FFF3",
        font: {
            family: 'Courier New, monospace',
            size: 18,
            color: '#000000'
          }
      };
      
      Plotly.newPlot('line', data, layout);
  })};
  
