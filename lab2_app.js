var margin = 200;
var svg = d3.select("svg");
var width = svg.attr("width") - margin;
var height = svg.attr("height") - margin;

svg.append("text")
    .attr("transform","translate(100,0)")
    .attr("x",50)
    .attr("y",50)
    .attr("class","title")
    .text("Коэффициенты рождаемости в Казахстане 2008 и 2018 (на 1000 человек)");

var xScale = d3.scaleBand().range([0, width-500]).padding(0.4);
var yScale = d3.scaleLinear().range([height,0]);

var g = svg.append("g");
g.attr("transform","translate(100,100)");

var data = [
    {region:"Almaty", val2008: 25, val2018: 18},
    {region:"Astana", val2008: 24, val2018: 27},
    {region:"Shymkent", val2008: 33, val2018: 26},
    {region:"Atyrau", val2008: 27, val2018: 26},
    {region:"Taraz", val2008: 27, val2018: 23},
    {region:"Semei", val2008: 16, val2018: 15}
];

var tooltip = d3.select("body")
    .append("div")
    .attr("id", "mytooltip")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("display", "none")

xScale.domain(data.map(function(d) { return d.region;}));
yScale.domain([0,d3.max(data, function(d) {return d.val2008;})]);

g.append("g")
    .attr("transform","translate(0,"+height+")")
    .call(d3.axisBottom(xScale));


g.append("g")
    .call(d3.axisLeft(yScale));

function onMouseOver(d,i) {
    d3.select(this)
        .style("cursor", "pointer")
        .attr('class','highlight');

    d3.select("#mytooltip")
        //.style("top", (d3.event.pageY-10)+"px")
        //.style("left", (d3.event.pageX+20)+"px")
		
		.style("top", "200px")
        .style("left", "500px")

        .style("display", "block")//set style to it
        .html("2008:"+d3.select(this).attr('val2008') + "</br>" + "2018:"+d3.select(this).attr('val2018'))


}

function onMouseOut(d,i) {
    d3.select(this)
        .attr('class','bar');

    d3.select("#mytooltip")
        .style("display", "none")
}


g.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class","bar")
    .attr("x", (d)=>xScale(d.region))
    .attr("y", (d)=>yScale(d.val2008))
    .attr("region", (d)=>d.region)
    .attr("val2008", (d)=>d.val2008)
	.attr("val2018", (d)=>d.val2018)
    .on("mouseover", onMouseOver)
    .on("mouseout", onMouseOut)

    .attr("width", xScale.bandwidth())
    .transition()
    .ease(d3.easeLinear)
    .duration(500)
    .delay((d,i)=>i*50)
    .attr("height", (d)=>height-yScale(d.val2008));
