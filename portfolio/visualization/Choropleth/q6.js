var poverty = d3.map();

var state = d3.map();

var county = d3.map();

var population = d3.map();

var income = d3.map();

var path = d3.geoPath();

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset(function() {
    return [0,0];
  })
  .html(function(d) {
    return d;
  })

var x = d3.scaleLinear()
    .domain([1, 18, 2])
    .rangeRound([100, 420]);

var y2 = d3.scaleLinear().domain([1,28])
    .range([105, 365]);

var color = d3.scaleThreshold()
    .domain(d3.range(2, 30))
    .range(d3.schemeGreens[9]);

var yAxis = d3.axisRight(x)
    .scale(y2)
    .tickSize(0)
    .tickFormat(function(x, i) { 
      if (i==0) return '<=2%'
      else if (i==8) return '>=18%'
      else return x + "%"})
    .tickValues(d3.range(2,19,2))
    .tickPadding(20)
    // .tickValues(color.domain().every(function(item,index,array){
    //   if (index%2==0) return item;
    // }))


var g = svg.append("g")
    .attr("class", "key")
    .attr("transform", "translate(950,40)")
    .call(yAxis);
  
 // legend  
g.selectAll("rect")
  .data(color.range().map(function(d) {
      d = color.invertExtent(d);
      if (d[0] == null) d[0] = x.domain()[0];
      if (d[1] == null) d[1] = x.domain()[1];
      return d;
    }))
  .enter().append("rect")
    .attr("height", 17)
    .attr("y", function(d) { 
      return x(d[0])+7; })
    .attr("width", function(d) { return 20; })
    .attr("fill", function(d) { return color(d[0]); });

g.append("text")
    .attr("class", "caption")
    .attr("x", -400)
    .attr("y", -10)
    .attr("fill", "#000")
    .attr("text-anchor", "start")
    .attr("font-weight", "bold")
    .text("Choropleth Map of County Data");



var promises = [
  d3.json("us.json"),
  d3.csv("county_poverty.csv", function(d) { 
    poverty.set(d.CensusId, +d.Poverty)
    state.set(d.CensusId, d.State)
    county.set(d.CensusId, d.County)
     }),
  d3.csv("county_detail.csv", function(d) { 
    population.set(d.CensusId, +d.TotalPop)
    income.set(d.CensusId, +d.IncomePerCap)
    })
]

Promise.all(promises).then(ready)

function ready([us]) {
  // console.log(state)
  svg.call(tip);

  svg.append("g")
      .attr("class", "counties")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.counties).features)
    .enter().append("path")
      .attr("fill", function(d) { 
        // console.log(poverty.get(d.id))
        return color(d.Poverty = poverty.get(d.id)); })
      .attr("d", path)
      .on('mousemove', function (d) {
        var xPosition = d3.mouse(this)[0];
        // console.log(population)
        var msg = 'State: '+ state.get(d.id) + " <br/> " +
                  'County: ' + county.get(d.id) + " <br/> " +
                  'Poverty Rate: ' + poverty.get(d.id) + " <br/> " +
                  'Total Population: ' + population.get(d.id) +  " <br/> " +
                  'Income per capita: '+ income.get(d.id) 

        tip.show(msg);
      })
      // .on('mouseout', tip.hide)
    // .append("title")
    //   .text(function(d) { return d.rate + "%"; });

  svg.append("path")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      .attr("class", "states")
      .attr("d", path)


}

// function ready(error, us, median_poverty, median_ages) {
//   if (error) throw error;

//   median_poverty.forEach(function(d){
//     poverty.set(d.id, +d.median_poverty);
//   });
//   median_ages.forEach(function(d) {
//     var temp=scores.get(d.id)||[];
//     temp.push({
//       name:d.name,mda:+d.median_age
//     });
//     scores.set(d.id, temp);
//   });

//   svg.call(tip);

//   svg.append("g")
//       .attr("transform", "translate(0,100)")
//       .attr("class", "counties")
//       .selectAll("path")
//       .data(topojson.feature(us, us.objects.states).features)
//       .enter().append("path")
//       .attr("fill", function(d) { return color(d.median_poverty = poverty.get(d.id)); })
//       .attr("d", path)
//       .on('mousemove', function (d) {
//         var msg = "";
//         var array= new Array();
//         var j=0;
//         scores.get(d.id).forEach( function (dd) {
//           array[j] = dd.mda;
//           j++;
//         });
//         array.sort();
//         var last = 0;
//         var count = 0;
//         for(var i = 0; i<5;i++){
//           if(array[i]==null){
//             break;
//           }
//           var cur = array[i];
//           if(cur==last){
//             continue;
//           }
//           last = cur;
//           scores.get(d.id).forEach( function (dd){
//             if(count!=5&&dd.mda==array[i]){
//               count++;
//               msg = msg + dd.name + "(Median Age:" + dd.mda + ")<br/>";
//             }
//           });
//         }
//         tip.show(msg);
//       })
//       .on('mouseout', tip.hide);

//   svg.append("path")
//       .datum(topojson.mesh(us, us.objects.states, function(a, b) { 
//         return a !== b; 
//       }))
//       .attr("transform", "translate(0,100)")
//       .attr("class", "states")
//       .attr("d", path);

// }