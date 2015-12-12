Legend = React.createClass({

    updateDesign: function(props) {
	    var colorbrewer = {
    //BLUES
    Observed: ""
    
	    }

    

    d3.select("#paletteDiv")
    .selectAll(".palette")
    .data(d3.entries(colorbrewer))
    .enter().append("span")
    .attr("class", "palette")
	    .attr("title", function(d) { return d.key; })
	    .style("background-color", function(d) { return d.value; })
	    .on("click", function(d) {

		props.setCurrentColour(d.value); })
   // .on("mouseover", function(d) { 
    .selectAll(".swatch")
    .data(function(d) { return d.value[d3.keys(d.value).map(Number).sort(d3.descending)[0]]; })
	    .enter().append("span")
	    .attr("class", "swatch")
	    .text("Observed")	
    .style("background-color", function(d) { return d; })
    .on("mouseover", function(d) { d3.select(this).attr("class","swatchLarge")})
    .on("mouseout",  function(d) { d3.select(this).attr("class","swatch")})
	
    },
    

    componentDidMount: function() {
	//this is invoked once when the component is first rendered
	var el = this.getDOMNode(); //this is the div we are rendering
	//var svg = d3.select(el)
	//	.append("svg")
	//	.attr("width", this.props.width)
	//	.attr("height", this.props.height);

	this.updateDesign(this.props);
    },

    componentWillUpdate: function(nextProps) {
	//this is invoked every time the props change
//	this.updateChart(nextProps);
    },

    getDefaultProps: function() {
	//this is a protection for the case that not all props are passed
	return {
	    width: 640,
	    height: 480
	}
    },


    render: function() {
	return (
	    <div className="palette-container" id="paletteDiv"></div>
	);
    }
});
