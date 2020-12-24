
var itemSize = 50,
  cellSize = itemSize - 8,
  margin = { top: 0, right: 100, bottom: 100, left: 100 };

    
var width = 900 - margin.right - margin.left,
  height = 2000 - margin.top - margin.bottom;
    
var colors = ['#f7f4f9','#e7e1ef','#d4b9da','#c994c7','#df65b0','#e7298a','#ce1256','#980043','#67001f']
    
var svg = d3.select("#chart").append("svg") 
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")   
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv('heatmap.csv').then(function ( wide_data ) {
    var all_data = [];
    // console.log(wide_data)
    wide_data.forEach( function(row) {
    // Loop through all of the columns, and for each column
    // make a new row
    Object.keys(row).forEach( function(colname) {
      // Ignore 'State' and 'Value' columns
      if(colname == "Crime Type" || colname == "Year") {
        return
      }
      all_data.push({Crime_Type: row["Crime Type"], "Year": row["Year"], 
        "Value": row[colname], "Borough": colname});
        });
    });

    var years = d3.set(all_data.map(function( item ) { return item.Year; } )).values()

    var select = d3.select('#sellectbox')
                      .append('select')
                      .attr('class','select')
                      .on('change',onchange);

    var options = select.selectAll('option')
                   .data(years).enter()
                   .append('option')
                   .text(function (d) { return d });
    
    // select data in given year
    
    onchange();


    function onchange() {
        selectYear = d3.select('select').property('value')
        const data = all_data.filter(d => d.Year == selectYear);


        // console.log(data)


        var x_elements = d3.set(data.map(function( item ) { return item.Crime_Type; } )).values(),
            y_elements = d3.set(data.map(function( item ) { return item.Borough; } )).values();

        //  sort alpahbet
        x_elements = x_elements.sort()
        y_elements = y_elements.sort()

        var xScale = d3.scaleBand()
            .domain(x_elements)
            .range([0, x_elements.length * itemSize])
            .paddingInner(20).paddingOuter(cellSize/2)

        var xAxis = d3.axisBottom()
            .scale(xScale)
            .tickFormat(function (d) {
                return d;
            });

        var yScale = d3.scaleBand()
            .domain(y_elements)
            .range([0, y_elements.length * itemSize])
            .paddingInner(.2).paddingOuter(.2);

        var yAxis = d3.axisLeft()
            .scale(yScale)
            .tickFormat(function (d) {
                return d;
            });

        var yScale = d3.scaleBand()
            .domain(y_elements)
            .range([0, y_elements.length * itemSize])
            .paddingInner(.2).paddingOuter(.2);


        max = d3.max(data, function(d) {
            // console.log(d.Value);
            return parseInt(d.Value)})

        console.log(max)

        var colorScale = d3.scaleQuantile()    
                      .domain([0, 8, max])  
                      .range(colors);  

        // var rootsvg = d3.select('body')
        //                 .append("svg")
        //                 .attr("width", width + margin.left + margin.right)
        //                 .attr("height", height + margin.top + margin.bottom)

        // var svg=rootsvg.append("g")
        //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        var cells = svg.selectAll('.year')
            .data(data)
            .enter().append('g').append('rect')
            .attr('class', 'cell')
            .attr('width', cellSize)
            .attr('height', cellSize)
            .attr('y', function(d) { return yScale(d.Borough); })
            .attr('x', function(d) { return xScale(d.Crime_Type)-cellSize/2; })
            .attr('fill', function(d) { return colorScale(d.Value) })
            .attr("rx",3)
            .attr("ry",3)


        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .selectAll('text')
            .attr('font-weight', 'normal');

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform","translate(0,"+(y_elements.length * itemSize +cellSize/2)+")")
            .call(xAxis)
            .selectAll('text')
            .attr('font-weight', 'normal')
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.5em")
            .attr("transform", function (d) {
                return "rotate(-90)";
            });

        var legend = svg.selectAll(".legend")
              .data([0].concat(colorScale.quantiles()), function(d) { return d; });

            

            legend.enter().append("g")
                  .attr("class", "legend")
                  .append("text")
                  .attr("x", 280)
                  .attr("y", 440)
                  .text("No. of Crimes")
                  .style("font-size","18px");


            legend.enter().append("rect")
                .attr("width", 50)  
                .attr("height", 25)
                .attr("x", function(d, i) {
                return 120+itemSize * i;
            })
                .attr("y", 450)
                .attr("stroke","black")
                .style("fill", function(d, i) {
                return colors[i]; 
                });

            

            legend.enter().append("text").attr("class", "size").text(function(d) { 
               return Math.round(d); 
            })
                .attr("x", function(d, i) { 
                return 120+itemSize * i; 
            })
            .attr("y", 490);

            legend.exit().remove();
    };

    

   

     


});
