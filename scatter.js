var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x2 = d3.scale.linear()
    .range([0, width]);

var y2 = d3.scale.linear()
    .range([height, 0]);

var color2 = d3.scale.category10();

var x2Axis = d3.svg.axis()
    .scale(x2)
    .orient("bottom");

var y2Axis = d3.svg.axis()
    .scale(y2)
    .orient("left");

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("scatter.txt", function(error, data2) {
  data2.forEach(function(k) {
    k.vote_percent = +k.vote_percent;
    k.tot_rec = +k.tot_rec;
    
  });

  x2.domain(d3.extent(data2, function(k) { return k.tot_rec; })).nice();
  y2.domain(d3.extent(data2, function(k) { return k.vote_percent; })).nice();

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(x2Axis)
    .append("text")
      .attr("class", "label")
      .attr("x2", width)
      .attr("y2", -6)
      .style("text-anchor", "end")
      .text("Total Funds");

  svg.append("g")
      .attr("class", "y axis")
      .call(y2Axis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y2", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Voting Rate")

  svg.selectAll(".dot")
      .data(data2)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", function(k) { return x2(k.tot_rec); })
      .attr("cy", function(k) { return y2(k.vote_percent); })
      .style("fill", function(k) { return color2(k.can_nam); });

  
});