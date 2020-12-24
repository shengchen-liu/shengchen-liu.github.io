// get the data
links =  [
  {
    "source": "Green Bay Packers",
    "target": "Kansas City Chiefs",
    "value": 0
  },
  {
    "source": "Green Bay Packers",
    "target": "Oakland Raiders",
    "value": 0
  },
  {
    "source": "New York Jets",
    "target": "Baltimore Colts",
    "value": 1
  },
  {
    "source": "Kansas City Chiefs",
    "target": "Minnesota Vikings",
    "value": 1
  },
  {
    "source": "Baltimore Colts",
    "target": "Dallas Cowboys",
    "value": 1
  },
  {
    "source": "Dallas Cowboys",
    "target": "Miami Dolphins",
    "value": 0
  },
  {
    "source": "Miami Dolphins",
    "target": "Washington Redskins",
    "value": 1
  },
  {
    "source": "Miami Dolphins",
    "target": "Minnesota Vikings",
    "value": 1
  },
  {
    "source": "Pittsburgh Steelers",
    "target": "Minnesota Vikings",
    "value": 1
  },
  {
    "source": "Pittsburgh Steelers",
    "target": "Dallas Cowboys",
    "value": 1
  },
  {
    "source": "Oakland Raiders",
    "target": "Minnesota Vikings",
    "value": 1
  },
  {
    "source": "Dallas Cowboys",
    "target": "Denver Broncos",
    "value": 0
  },
  {
    "source": "Pittsburgh Steelers",
    "target": "Los Angeles Rams",
    "value": 1
  },
  {
    "source": "Oakland Raiders",
    "target": "Philadelphia Eagles",
    "value": 1
  },
  {
    "source": "San Francisco 49ers",
    "target": "Cincinnati Bengals",
    "value": 0
  },
  {
    "source": "Washington Redskins",
    "target": "Miami Dolphins",
    "value": 0
  },
  {
    "source": "Los Angeles Raiders",
    "target": "Washington Redskins",
    "value": 1
  },
  {
    "source": "San Francisco 49ers",
    "target": "Miami Dolphins",
    "value": 0
  },
  {
    "source": "Chicago Bears",
    "target": "New England Patriots",
    "value": 0
  },
  {
    "source": "New York Giants",
    "target": "Denver Broncos",
    "value": 0
  },
  {
    "source": "Washington Redskins",
    "target": "Denver Broncos",
    "value": 0
  },
  {
    "source": "San Francisco 49ers",
    "target": "Denver Broncos",
    "value": 0
  },
  {
    "source": "New York Giants",
    "target": "Buffalo Bills",
    "value": 0
  },
  {
    "source": "Washington Redskins",
    "target": "Buffalo Bills",
    "value": 0
  },
  {
    "source": "Dallas Cowboys",
    "target": "Buffalo Bills",
    "value": 0
  },
  {
    "source": "San Francisco 49ers",
    "target": "San Diego Chargers",
    "value": 0
  },
  {
    "source": "Dallas Cowboys",
    "target": "Pittsburgh Steelers",
    "value": 0
  },
  {
    "source": "Green Bay Packers",
    "target": "New England Patriots",
    "value": 0
  },
  {
    "source": "Denver Broncos",
    "target": "Green Bay Packers",
    "value": 1
  },
  {
    "source": "Denver Broncos",
    "target": "Atlanta Falcons",
    "value": 1
  },
  {
    "source": "St. Louis Rams",
    "target": "Tennessee Titans",
    "value": 0
  },
  {
    "source": "Baltimore Ravens",
    "target": "New York Giants",
    "value": 1
  },
  {
    "source": "New England Patriots",
    "target": "St. Louis Rams",
    "value": 1
  },
  {
    "source": "Tampa Bay Buccaneers",
    "target": "Oakland Raiders",
    "value": 0
  },
  {
    "source": "New England Patriots",
    "target": "Carolina Panthers",
    "value": 1
  },
  {
    "source": "New England Patriots",
    "target": "Philadelphia Eagles",
    "value": 1
  },
  {
    "source": "Pittsburgh Steelers",
    "target": "Seattle Seahawks",
    "value": 1
  },
  {
    "source": "Indianapolis Colts",
    "target": "Chicago Bears",
    "value": 1
  },
  {
    "source": "New York Giants",
    "target": "New England Patriots",
    "value": 0
  },
  {
    "source": "Pittsburgh Steelers",
    "target": "Arizona Cardinals",
    "value": 1
  },
  {
    "source": "New Orleans Saints",
    "target": "Indianapolis Colts",
    "value": 0
  },
  {
    "source": "Green Bay Packers",
    "target": "Pittsburgh Steelers",
    "value": 0
  },
  {
    "source": "Baltimore Ravens",
    "target": "San Francisco 49ers",
    "value": 1
  },
  {
    "source": "Seattle Seahawks",
    "target": "Denver Broncos",
    "value": 0
  },
  {
    "source": "New England Patriots",
    "target": "Seattle Seahawks",
    "value": 1
  },
  {
    "source": "Denver Broncos",
    "target": "Carolina Panthers",
    "value": 1
  },
  {
    "source": "New England Patriots",
    "target": "Atlanta Falcons",
    "value": 1
  },
  {
    "source": "Philadelphia Eagles",
    "target": "New England Patriots",
    "value": 0
  }
];

var nodes = {};

// Compute the distinct nodes from the links.
// Edit: add attribute: 'degree'
// link : {'source': 'name'
          //            'degree'
          //'target': 'name'
          //             'degree'
          // }

links.forEach(function(link) {
    link.source = nodes[link.source] ||
        (nodes[link.source] = {name: link.source, degree:0});
    link.target = nodes[link.target] ||
        (nodes[link.target] = {name: link.target, degree:0});
    // caculate degree for node
    link.source["degree"]+=1;
    link.target["degree"]+=1;
});

var width = document.getElementById('chartArea').clientWidth;
    height =  500;

var force = d3.forceSimulation()
    .nodes(d3.values(nodes))
    .force("link", d3.forceLink(links).distance(60))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force("x", d3.forceX(width/2))
    .force("y", d3.forceY(height/2))
    .force("charge", d3.forceManyBody().strength(-250))
    .alphaTarget(1)
    .on("tick", tick);

var svg = d3.select("#chartArea").append("svg") 
            .attr("width", width)
            .attr("height", height);


// add the links and the arrows

var path = svg.append("g")
.selectAll("path")
.data(links)
.enter()
.append("path")
.attr("class", function(d) { return "link " + d.type; });

//add the path color and thickness based on value


// If the value of the edge is equal to 0, the link should be green and thick.

// If the value of the edge is equal to 1, the link should be blue and thin.

path.style("stroke", function(d){
  if(d.value == 0)
    return "green";
  else if(d.value == 1)
    return "blue";
})

path.style("stroke-width", function(d){
  if(d.value == 0)
    return 5;
  else if(d.value == 1)
    return 2;
})



// define the nodes
var node = svg.selectAll(".node")
    .data(force.nodes())
  .enter().append("g")
    .attr("class", "node")
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended)
      );


// add the nodes
node.append("circle")
    .attr("r", function(d){//scale the radius
        return 5+Math.log2(d.degree)*2;
      })
    .on("dblclick", dblclick);


function dblclick(d) {
  if (d.fx == null){ // if the node is not fixed, fix it
     d.fx = d.x;
     d.fy = d.y;
     d.fixed = true;
     d3.select(this).style("fill", "red")
  }
  else{ // if the node is fixed, realease it
    d.fx = null;
    d.fy = null;
    d.fixed = false
    d3.select(this).style("fill", "#ccc")
  }
  // console.log('d.fx: '+ d.fx );
  // console.log('d.fixed: '+ d.fixed );

  // console.log('fill: '+ d3.select(this).style.attr('fill'));

  // d.x = d3.event.x;
  // d.y = d3.event.y;
  // d3.select(this).classed("fixed", d.fixed = true);
}
    

//add the node names
var names = svg.selectAll("text")
  .data(force.nodes())
  .enter()
  .append("text")
  .text(function (d) {return d.name;});

// add the curvy lines
function tick() {
    path.attr("d", function(d) {
        var dx = d.target.x - d.source.x,
            dy = d.target.y - d.source.y,
            dr = Math.sqrt(dx * dx + dy * dy);
        return "M" +
            d.source.x + "," +
            d.source.y + "A" +
            dr + "," + dr + " 0 0,1 " +
            d.target.x + "," +
            d.target.y;
    });

    node
        .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")"; })

    // add names  
    names
        .attr("transform", function(d) {
      return "translate(" + (d.x + 12) + "," + (d.y + 3) + ")"; 
    });
};

function dragstarted(d) {
      if (!d3.event.active) force.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    };

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
};

function dragended(d) {
  
  if (!d3.event.active) {
    force.alphaTarget(0)
  }
  if (d.fixed == true){
     d.fx = d.x;
     d.fy = d.y;
  }
  else{
    d.fx = null;
    d.fy = null;
  }
  // console.log('here d.fixed: '+ d.fixed)
};

//We will build a basic function to handle window resizing.
function resize() {
    width = document.getElementById('chartArea').clientWidth;
    height = 500;
    d3.select('#chartArea svg')
      .attr('width', width)
      .attr('height', height);
}

window.onresize = resize;
//Call our resize function if the window size is changed.
