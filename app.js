//turning URL into variable
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//console log json data
d3.json(url).then(function(data) {
    console.log(data);

    //dropdown
    for (let i = 0; i < data.names.length; i++) {
    d3.select("select").append("option").attr("value",data.names[i]).text(data.names[i])
    };

    //plotting
    function init() {
        let sampleValues = data.samples[0].sample_values;
        let otuIds = data.samples[0].otu_ids;
        let otuLabels = data.samples[0].otu_labels;
        let sortedValues = sampleValues.sort((a,b) => b - a);
        let topTen = sortedValues.slice(0,10)

        let numWash = data.metadata[0].wfreq

        let initdata = [{
            type: 'bar',
            x: topTen,
            y: otuIds.map(id => 'OTU ${id}'),
            text:otuLabels,
            orientation: 'h'
        }]
        
        var initbub = [{
            x: otuIds,
            y: sampleValues,
            text: otuLabels,
            mode: 'markers',

            marker: {
                size: sampleValues,
                color:otuIds
            },
            type: 'scatter'
        }];

        var initguage = [{
            domain: {x: [0,1],y:[0,1] },
            value: numWash,
            title: { text: "Belly Button Washing Frequency: Scrubs per Week" },
            type: "indicator",
            mode: "guage+number",

            guage: {
                axis: { range: [null,9], tickwidth: 2, tickcolor: "dark green" },
                bar: { color: "black" },
                bgcolor: "white",
                borderwidth: 2,
                bordercolor: "gray",
                steps: [
                    { range: [0,1], color: "maroon" },
                    { range: [1,2], color: "red" },
                    { range: [2,3], color: "orange" },
                    { range: [3,4], color: "yellow" },
                    { range: [4,5], color: "green" },
                    { range: [5,6], color: "cyan" },
                    { range: [6,7], color: "blue" },
                    { range: [7,8], color: "violet" },
                    { range: [8,9], color: "purple" },
                ],
            }
        }
    ];
    var layout = { width: 600, height:500, margin: { t:0, b: 0} };

//bar chart
Plotly.newPlot('bar', initdata)
Plotly.newPlot('bubble', initbub)
//plotting guage
Plotly.newPlot('guage', initguage, layout);
//demographic
let demoInfo = data.metadata[0];
let metadata1 = d3.select("#sample-metadata")
Object.entries(demoInfo).forEach(([key, value])=> {
metadata1.append("p").text('${key}: ${value}');
});

};
//making charts appear 
init();
//dropdown as function
var dropdown = document.getElementById("selDataset")
dropdown.onchange = function optionChanged() {
    var selectedValue = document.getElementById("selDataset").value
    
    let x=0
    for (let j = 0; j < data.names.length; j++) {
    if (selectedValue == data.names[j]) {x=j}}

    //variables defining 
    let sampleValues = data.samples[x].sample_values;
    let otuIds = data.samples[x].otu_ids;
    let otuLabels = data.samples[x].otu_labels;

    let sortedValues = sampleValues.sort((a,b) => b - a);
    let topTen = sortedValues.slice(0,10)

    var bbtrace = [{
        type: 'bar',
        x: topTen,
        y: otuIds.map(id => 'OTU ${id}'),
        text: otuLabels,
        orientation: 'h'

    }];
    //chart
    Plotly.newPlot('bar', bbtrace)
    var bubbletrace = [{

        x: otuIds,
        y:sampleValues,
        text: otuLabels,
        mode: 'markers',

        marker: {
            size: sampleValues,
            color: otuIds
        },
        type: 'scatter'
        }];
        //bubble chsrt
        Plotly.newPlot('bubble', bubbletrace)
        //guage
        let numWash = data.metdata[x].wfreq
        var gdata = [{
            domain: { x: [0,1], y: [0,1] },
            value: numWash,
            title: { text:"Belly Button Washing Frequency: Scrubs per Week" },
            type: "indicator",
            mode: "guage+number",

            guage: {
                aixs: { range: [null,9], tickwidth: 2, tickcolor: "dark green" },
                bar: { color: "black" },
                bgcolor: "white",
                borderwidth: 2,
                bordercolor: "gray",
                steps: [
                    { range: [0,1], color: "maroon" },
                    { range: [1,2], color: "red" },
                    { range: [2,3], color: "orange" },
                    { range: [3,4], color: "yellow" },
                    { range: [4,5], color: "green" },
                    { range: [5,6], color: "cyan" },
                    { range: [6,7], color: "blue" },
                    { range: [7,8], color: "violet" },
                    { range: [8,9], color: "purple" },


                ],
            }
        }
    
];

var layout = { width: 600, height:500, margin: {t: 0, b: 0} };
//plotting guage
Plotly.newPlot('guage', gdata, layout);
let demInfo = data.metadata[x];
//iterating over value pair to display 
let metadata1 = d3.select("#sample-metadata")
    metadata1.html("")
    Object.entries(demoInfo).forEach(([key, value])=> {
        metadata1.append("p").text('${key}: ${value}');
    });
  };
});








