function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
   
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    var samples = data.samples;

    // Create a variable that filters the samples for the object with the desired sample number.
    var filteredSamples = samples.filter(x => x.id == sample);

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var filteredMetadata = metadata.filter(sampleObj => sampleObj.id == sample);

    // Create a variable that holds the first sample in the array.
    var firstSample = filteredSamples[0];

    // 2. Create a variable that holds the first sample in the metadata array.
    var firstMetadata = filteredMetadata[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = samples.map(x => x.otu_ids);
    
    var otu_labels = samples.map(x => x.otu_labels);
   
    var sample_values = samples.map(x => x.sample_values);
    

    // 3. Create a variable that holds the washing frequency.
    var wash_freq = filteredMetadata.map(x => x.wfreq);

    // Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order 
    // so the otu_ids with the most bacteria are last. 
    otu_ids.sort(function(a,b) {
      return parseFloat(b.otu_ids) - parseFloat(a.otu_ids);
    });
    otu_ids = otu_ids.slice(0, 10);
    var yticks = otu_ids.reverse();
     

    // Create the trace for the bar chart. 
    var barData = [
      x: sample_values,
      y: yticks,
      text: otu_labels,
      name: "BellyButton",
      type: "bar",
      orientation: "h",
      
    ];
    // Create the layout for the bar chart. 
    var barLayout = {
      
    };

    // Use Plotly to plot the data with the layout. 

    // Create the trace for the bubble chart.
    var bubbleData = [
   
    ];

    // Create the layout for the bubble chart.
    var bubbleLayout = {
      
    };

    // D2: 3. Use Plotly to plot the data with the layout.
   
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
     
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
     
    };

    // 6. Use Plotly to plot the gauge data and layout.
    
  });
}
