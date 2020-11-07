let DATA = [
  {id:1,value:8,name:"KZ", isVisible:true},
  {id:2,value:9,name:"RU", isVisible:true},
  {id:3,value:7,name:"CH", isVisible:true},
  {id:4,value:4,name:"EN", isVisible:true}
]

const listItems = d3.select('ul')
                    .selectAll('li')
                    .data(DATA, (data)=>data.name)
                    .enter()
                    .append('li');

listItems.append('span')
          .text((data)=>data.name);


const xScale = d3.scaleBand()
                 .domain(DATA.map( (dp) => dp.name )).rangeRound([0,200]).padding(0.2);

const yScale = d3.scaleLinear().domain([0,20]).rangeRound([0,200]);


const container = d3.select("svg")
                    .append('g')
                    .call(d3.axisBottom(xScale))
                    .attr('color','#1f559c')
                    
const update = (initialData = DATA) => {
  
  container
      .selectAll(".bar")
      .data(initialData)
      .enter()
      .append('rect')
      .classed('bar',true)
      .attr('width',xScale.bandwidth())
      .attr('height',data=>yScale(data.value))
      .attr('x',data=>xScale(data.name))
      .attr('y', data=>200-yScale(data.value));
}


update()


listItems
        .append('input')
        .attr('type','checkbox')
        .attr('checked',true)
        .attr('id',(data) => data.id)
        .on('change', (event)=>{

          cid = parseInt(event.target.id);
          DATA[cid-1].isVisible = event.target.checked

          const filtered = DATA.filter(i => i.isVisible !== false)
          
          d3.selectAll(".bar").remove()
          update(filtered)
             
        });


const M = d3.scaleBand()
            .domain(['Q1','Q2','Q3','Q4','Overall'])
            .range([1,2]);