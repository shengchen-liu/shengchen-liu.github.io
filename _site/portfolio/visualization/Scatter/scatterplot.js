var margin = {top: 20, right: 150, bottom: 230, left: 80},
    width = 960 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

var symbol = {
    "0" : d3.symbol().type(d3.symbolCircle)(),
    "1" : d3.symbol().type(d3.symbolCross)()
}


//set color scale
var color = d3.scaleOrdinal()
.domain([0, 1])
.range(["red","blue"]);
//original scatter plot

original = function (xname, yname, xlabel, ylabel, title, data) {
    var id = title.toLowerCase().replace(/\W+/g, "");
    var div = d3.select(".main")
    .append("div")
    .attr("id", id);
    div.append("h2").text(title);

    var x = d3.scaleLinear()
        .domain(d3.extent(data, function(d) { return d[xname]; }))
        .range([0, width])
        .nice();

    var y = d3.scaleLinear()
        .domain(d3.extent(self.data, function(d) { 
                    return d[yname]
                }))
        .range([height, 0])
        .nice();

    var svg = div.append("svg:svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate("+margin.left+","+margin.top + ")");

    var xAxis = d3.axisBottom(x)
        .scale(x)

    var yAxis = d3.axisLeft(y)
        .scale(y)
        .tickPadding(10);

    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    
    svg.append("text")
    .attr("transform", "translate(" + width + ", "+ (height+25)+")")
    .style("text-anchor", "end")
    .text(xlabel);

    svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)

    svg.append("text")
    .attr("transform", "rotate(-90)")
    .style("text-anchor", "end")
    .text(ylabel);

    svg.selectAll(".dot")
        .data(data)
        .enter()
        .append("path")
        .attr("class", "dot")
        .attr("d", function(d) {
            if (d.is_good == 1)
                return d3.symbol().type(d3.symbolCross)()
            else 
                return d3.symbol().type(d3.symbolCircle)()})
        .attr("transform", function(d) { return "translate(" + x(d[xname]) + "," + y(d[yname]) + ")"; })
        .style("stroke", function(d){
            if (d.is_good == 1)
                return 'blue'
            else return 'red'
        })
        .style("fill", "white");

    var legend = svg.selectAll(".legend")
        .data(color.domain())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i){return "translate(0," + i * 30 + ")";});

    legend.append("text")
        .attr("x", width+140)
        .attr("y", 0)
        .attr("dy", ".35em")
        .attr("font-size", "15px")
        .style("text-anchor", "end")
        .text(function(d) { 
            if(d=="1")
                return "Good rating";
            else return "Bad rating";
        });
    legend.append("path")
            .attr("d", function (d) {
              return symbol[d];
            })
            .attr("transform", "translate("+(width+50)+", 0)")
            .style("stroke", color)
            .style("fill","white");
};

scaling = function (xname, yname, xlabel, ylabel, title, data) {
    var id = title.toLowerCase().replace(/\W+/g, "");
    var div = d3.select(".main")
    .append("div")
    .attr("id", id);
    div.append("h2").text(title);

    var x = d3.scaleLinear()
        .domain(d3.extent(data, function(d) { return d[xname]; }))
        .range([0, width])
        .nice();

    var y = d3.scaleLinear()
        .domain(d3.extent(self.data, function(d) { 
                    return d[yname]
                }))
        .range([height, 0])
        .nice();

    var svg = div.append("svg:svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate("+margin.left+","+margin.top + ")");

    var xAxis = d3.axisBottom(x)
        .scale(x)

    var yAxis = d3.axisLeft(y)
        .scale(y)
        .tickPadding(10);

    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    
    svg.append("text")
    .attr("transform", "translate(" + width + ", "+ (height+25)+")")
    .style("text-anchor", "end")
    .text(xlabel);

    svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)

    svg.append("text")
    .attr("transform", "rotate(-90)")
    .style("text-anchor", "end")
    .text(ylabel);

    svg.selectAll(".dot")
        .data(data)
        .enter()
        .append("path")
        .attr("class", "dot")
        .attr("d", function(d) {
            if (d.is_good == 1)
                return d3.symbol().type(d3.symbolCross).size(d.win_nom*2)()
            else 
                return d3.symbol().type(d3.symbolCircle).size(d.win_nom*2)()})
        .attr("transform", function(d) { return "translate(" + x(d[xname]) + "," + y(d[yname]) + ")"; })
        .style("stroke", function(d){
            if (d.is_good == 1)
                return 'blue'
            else return 'red'
        })
        .style("fill", "white");

    var legend = svg.selectAll(".legend")
        .data(color.domain())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i){return "translate(0," + i * 30 + ")";});

    legend.append("text")
        .attr("x", width+140)
        .attr("y", 0)
        .attr("dy", ".35em")
        .attr("font-size", "15px")
        .style("text-anchor", "end")
        .text(function(d) { 
            if(d=="1")
                return "Good rating";
            else return "Bad rating";
        });
    legend.append("path")
            .attr("d", function (d) {
              return symbol[d];
            })
            .attr("transform", "translate("+(width+50)+", 0)")
            .style("stroke", color)
            .style("fill","white");
};


sqrt = function (xname, yname, xlabel, ylabel, title, data) {
    var id = title.toLowerCase().replace(/\W+/g, "");
    var div = d3.select(".main")
    .append("div")
    .attr("id", id);
    div.append("h2").text(title);

    var x = d3.scaleLinear()
        .domain(d3.extent(data, function(d) { return d[xname]; }))
        .range([0, width])
        .nice();

    var y = d3.scaleSqrt()
        .domain(d3.extent(self.data, function(d) { 
                    return d[yname]
                }))
        .range([height, 0])
        .nice();

    var svg = div.append("svg:svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate("+margin.left+","+margin.top + ")");

    var xAxis = d3.axisBottom(x)
        .scale(x)

    var yAxis = d3.axisLeft(y)
        .scale(y)
        .tickPadding(10);

    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    
    svg.append("text")
    .attr("transform", "translate(" + width + ", "+ (height+25)+")")
    .style("text-anchor", "end")
    .text(xlabel);

    svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)

    svg.append("text")
    .attr("transform", "rotate(-90)")
    .style("text-anchor", "end")
    .text(ylabel);

    svg.selectAll(".dot")
        .data(data)
        .enter()
        .append("path")
        .attr("class", "dot")
        .attr("d", function(d) {
            if (d.is_good == 1)
                return d3.symbol().type(d3.symbolCross)()
            else 
                return d3.symbol().type(d3.symbolCircle)()})
        .attr("transform", function(d) { return "translate(" + x(d[xname]) + "," + y(d[yname]) + ")"; })
        .style("stroke", function(d){
            if (d.is_good == 1)
                return 'blue'
            else return 'red'
        })
        .style("fill", "white");

    var legend = svg.selectAll(".legend")
        .data(color.domain())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i){return "translate(0," + i * 30 + ")";});

    legend.append("text")
        .attr("x", width+140)
        .attr("y", 0)
        .attr("dy", ".35em")
        .attr("font-size", "15px")
        .style("text-anchor", "end")
        .text(function(d) { 
            if(d=="1")
                return "Good rating";
            else return "Bad rating";
        });
    legend.append("path")
            .attr("d", function (d) {
              return symbol[d];
            })
            .attr("transform", "translate("+(width+50)+", 0)")
            .style("stroke", color)
            .style("fill","white");
};

log_scale = function (xname, yname, xlabel, ylabel, title, data) {
    var id = title.toLowerCase().replace(/\W+/g, "");
    var div = d3.select(".main")
    .append("div")
    .attr("id", id);
    div.append("h2").text(title);

    var x = d3.scaleLinear()
        .domain(d3.extent(data, function(d) { return d[xname]; }))
        .range([0, width])
        .nice();

    var y = d3.scaleLog()
        .domain([1e-0, d3.max(data, d => d[yname])])
        .range([height, 0])
        .nice();

    var svg = div.append("svg:svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate("+margin.left+","+margin.top + ")");

    var xAxis = d3.axisBottom(x)
        .scale(x)

    var yAxis = d3.axisLeft(y)
        .scale(y)
        .tickPadding(10);

    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    
    svg.append("text")
    .attr("transform", "translate(" + width + ", "+ (height+25)+")")
    .style("text-anchor", "end")
    .text(xlabel);

    svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)

    svg.append("text")
    .attr("transform", "rotate(-90)")
    .style("text-anchor", "end")
    .text(ylabel);

    svg.selectAll(".dot")
        .data(data)
        .enter()
        .append("path")
        .attr("class", "dot")
        .attr("d", function(d) {
            if (d.is_good == 1)
                return d3.symbol().type(d3.symbolCross)()
            else 
                return d3.symbol().type(d3.symbolCircle)()})
        .attr("transform", function(d) { return "translate(" + x(d[xname]) + "," + y(d[yname]) + ")"; })
        .style("stroke", function(d){
            if (d.is_good == 1)
                return 'blue'
            else return 'red'
        })
        .style("fill", "white");

    var legend = svg.selectAll(".legend")
        .data(color.domain())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i){return "translate(0," + i * 30 + ")";});

    legend.append("text")
        .attr("x", width+140)
        .attr("y", 0)
        .attr("dy", ".35em")
        .attr("font-size", "15px")
        .style("text-anchor", "end")
        .text(function(d) { 
            if(d=="1")
                return "Good rating";
            else return "Bad rating";
        });
    legend.append("path")
            .attr("d", function (d) {
              return symbol[d];
            })
            .attr("transform", "translate("+(width+50)+", 0)")
            .style("stroke", color)
            .style("fill","white");
};

d3.csv('movies.csv')
    .then(function(csvdata) {
        data = csvdata.map(function (d) {
            return {
                rating: +d.Rating,
                budget: +d.Budget,
                win_nom: +d.WinsNoms,
                is_good: +d.IsGoodRating,
                votes: +d.Votes}
            })
        original("rating", "win_nom", "Rating", "Wins+Norms", "Wins+Nominations vs. Rating", data)
        original("rating", "budget", "Rating", "Budget", "Budget vs. Rating", data)
        scaling("rating", "votes", "Rating", "Votes", "Votes vs. Rating sized by Wins+Nominations", data)
        sqrt("rating", "win_nom", "Rating", "Wins+Norms", " Wins+Nominations (square-root-scaled) vs. Rating", data)
        log_scale("rating", "win_nom", "Rating", "Wins+Norms", " Wins+Nominations (log-scaled) vs. Rating", data)
    }); 



