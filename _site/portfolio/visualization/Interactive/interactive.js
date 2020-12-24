var dataset = [
{country: 'Bangladesh', population_2012: 105905297, growth: {year_2013:42488 , year_2014:934 , year_2015:52633 , year_2016:112822 , year_2017:160792}},
{country: 'Ethopia', population_2012: 75656319, growth: {year_2013:1606010 , year_2014:1606705 , year_2015:1600666 , year_2016:1590077 , year_2017:1580805}},
{country: 'Kenya', population_2012: 33007327, growth: {year_2013:705153 , year_2014:703994 , year_2015:699906 , year_2016:694295 , year_2017:687910}},
{country: 'Afghanistan', population_2012: 23280573, growth: {year_2013:717151 , year_2014:706082 , year_2015:665025 , year_2016:616262 , year_2017:573643}},
{country: 'Morocco', population_2012: 13619520, growth: {year_2013:11862 , year_2014:7997 , year_2015:391 , year_2016:-8820 , year_2017:-17029}}
]

var margin = {top: 20, right: 230, bottom: 30, left: 200},
        width = 1000 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

var format = dataset.map(function(pop){
		var total = pop.population_2012+pop.growth.year_2013+pop.growth.year_2014
					+pop.growth.year_2015+pop.growth.year_2016
					+pop.growth.year_2017;

		var value = [100*pop.growth.year_2013/pop.population_2012,
					100*pop.growth.year_2014/(pop.population_2012+pop.growth.year_2013),
					100*pop.growth.year_2015/(pop.population_2012+pop.growth.year_2013+pop.growth.year_2014),
					100*pop.growth.year_2016/(pop.population_2012+pop.growth.year_2013+pop.growth.year_2014+pop.growth.year_2015),
					100*pop.growth.year_2017/(pop.population_2012+pop.growth.year_2013+pop.growth.year_2014+pop.growth.year_2015+pop.growth.year_2016)];

		return{
			country:pop.country,
			value:d3.zip(["2013","2014","2015","2016","2017"], value),
			total:total
		}
    });

var svg = d3.select("body").append("svg:svg")
    .attr("height", height + margin.top + margin.bottom)
    .attr("width", width + margin.left + margin.right)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleLinear()
        .range([0, width])
        .domain([0, d3.max(format, function(d) {
        	// console.log(d.total)
        	return d.total;
        })])
        .nice();

var y = d3.scaleBand()
    .rangeRound([0, height])
    .padding(0.1)
    .domain(format.map(function (d) {
    	return d.country;
    }));

var yAxis = d3.axisLeft()
    .scale(y)
    .tickPadding(6);

var bar = svg.selectAll(".bar")
        .data(format)
        .enter().append("g")
        .attr("class", "bar")
        .attr("transform", function(d) {
        	return "translate(0," + y(d.country) + ")";
        });

bar.append("rect")
    .attr("width", function (d) { return x(d.total); })
    .attr("height", y.bandwidth())
    .on("mouseover", showLegend)
    .on("mouseout", offLegend);

bar.append("text")
    .attr("x", 10)
    .attr("y", y.bandwidth()*0.5)
    .attr("dy", ".35em")
    .text(function(d){
      return d.total;
    });

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

var legend = svg.append("g")
    .attr("transform", "translate(" + (width + 30) + ", " + (height-350) + ")")
    .attr("class", ".legend");

function showLegend(data) {
        d3.selectAll(".lchart").remove();

        d3.select(this).style("fill", "deepskyblue");

        var lchart = svg.append("svg")
            .attr("class", "lchart")
            .attr("height", height + margin.top + margin.bottom)
        	.attr("width", width + margin.left + margin.right)
            .append("g")
            .attr("transform", "translate(500,150)");

        var x2 = d3.scaleLinear().domain([2013, 2017]).range([0, 150]);

        
        var y2 = d3.scaleLinear().domain([
        	d3.min(data.value, function(d) {
        		console.log(d[1])
        		return d[1];}),
        	d3.max(data.value, function(d) {return d[1]; })])
        	.range([120, 0]);

        var xAxis2 = d3.axisBottom()
                .scale(x2)
                .ticks(5)
                .tickFormat(d3.format("d"));

        var yAxis2 = d3.axisLeft()
                .scale(y2)
                .ticks(5);

        lchart.append("g")
            .attr("class", "axis2")
            .attr("transform", "translate(0, 120)")
            .call(xAxis2);


        lchart.append("g")
            .attr("class", "axis2")
            .call(yAxis2);

        var line = d3.line()
            .x(function(d) {
            	return x2(d[0]); 
            })
            .y(function(d) { 
            	return y2(d[1]); 
            });

        lchart.append("path")
            .attr("d", line(data.value))
            .style("stroke", "teal")
            .style("stroke-width", 2)
            .style("fill", "none");
    };


function offLegend(){
	d3.selectAll(".lchart").remove();
    d3.select(this).style("fill", "lightgray");
}
