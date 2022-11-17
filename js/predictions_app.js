d3.csv("../Data/Week11_GamePredictions.csv", d3.autoType).then((data) => {
    var rows = data
    function unpack(row, key) {
    return rows.map(function(row) { return row[key];});
    }
    

    // header values
    var headerNames = d3.keys(rows[0]);
    var headerValues = [headerNames[2], headerNames[4], 
                        headerNames[8], headerNames[9]];

    // cell values
    var cellValues = [];
    for (i =0; i < headerValues.length; i++) {
        cellValue = unpack(rows, headerValues[i]);
        cellValues[i] = cellValue;
    }

var tableData = [{
    type: 'table',
    header: {
        values: [["<b>Home Team</b>"],
                ["<b>Away Team</b>"], 
                ["<b>Prediction Value</b>"],
                ["<b>Predicted Winner</b>"]],
        align: "center",
        line: {width: 1, color: 'rgb(50, 50, 50)'},
        fill: {color: ['rgb(0, 153, 0)']},
        font: {family: "Arial", size: 14, color: "white"}
    },
    cells: {
        values: cellValues,
        align: ["center", "center"],
        height: 25,
        line: {color: "black", width: 1},
        fill: {color: ['rgb(102, 255, 102)']},
        font: {family: "Arial", size: 12, color: ["black"]}
    }
}]

var tableLayout = {
    title: "Week 11 Game Predictions", 
    height: 1850
}
      
Plotly.newPlot("table", tableData, tableLayout);
});
