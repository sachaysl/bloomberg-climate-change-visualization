AreaChart = React.createClass({

    updateChart: function(props) {
	var height = props.height;
	var width = props.width;
	var parse = d3.time.format("%b %Y").parse;

	// 2 standard deviations in Celsius
	var env = 1.96*.14;

	var interpolation = "linear";
	

	// Scales and axes. Note the inverted domain for the y-scale: bigger is up!
	var x = d3.scale.linear().range([0, width]),
	    y = d3.scale.linear().range([height, 0]),
	    xAxis = d3.svg.axis().scale(x).tickSize(-height)
		.tickSubdivide(true)
		.tickFormat(d3.format("d")),
	    yAxis = d3.svg.axis().scale(y).ticks(4).orient("right");

	// An area generator, for the light fill.
//	var area = d3.svg.area()
//		.interpolate("monotone")
//		.x(function(d) { return x(d.year); })
//		.y0(height)
	//		.y1(function(d) { return y(d.annualMean); });

	var areaOrbit = d3.svg.area()
		.interpolate(interpolation)
		.x(function(d) { return x(d.year); })
		.y0(function(d) { return y(d.annualMeanLower); })
		.y1(function(d) { return y(d.annualMeanUpper); });


	// A line generator, for the dark stroke.
	var line = d3.svg.line()
		.interpolate("monotone")
		.x(function(d) { return x(d.year); })
		.y(function(d) { return y(d.annualMean); });

	d3.csv("data/observed.csv", type, function(error, data) {
              
            var values = data;
	    
	  

	x.domain([values[0].year, values[values.length - 1].year]);
	y.domain([-1, 1]);

	    // Add an SVG element with the desired dimensions and margin.
	    var svg = d3.select("svg")
	            .append("g")
	            .attr("transform", "translate(" + props.marginLeft + "," + props.marginTop + ")")

	    // Add the clip path.
	    svg.append("clipPath")
	        .attr("id", "clip")
	        .append("rect")
	        .attr("width", props.width)
	        .attr("height", props.height);

	    // Add the x-axis.
	    svg.append("g")
	        .attr("class", "x axis")
	        .attr("transform", "translate(0," + props.height + ")")
	        .call(xAxis);

	    // Add the y-axis.
	    svg.append("g")
	        .attr("class", "y axis")
	        .attr("transform", "translate(" + props.width + ",0)")
	        .call(yAxis);

	// Add an x-axis label.
		svg.append("text")
	        .attr("class", "x label")
	        .attr("text-anchor", "end")
	        .attr("x", width/2)
	        .attr("y", 380)
	        .text("Year")
		.style("font-size", "11px");

	    // Add a y-axis label.
	    svg.append("text")
	        .attr("class", "y label")
	        .attr("text-anchor", "end")
		.attr("x", 0)
	        .attr("y", 855)
	        .attr("dy", ".75em")
	        .attr("transform", "rotate(-90)")
	        .text("Cumulative change in annual mean temperature (°C) since 1880")
		.style("font-size", "11px");

	    var colors = d3.scale.category10();

	    // Add area graph

	    svg.append('path')
		.attr({ "class": "area confidence"})
		.data([values])
		.style('fill', 'green')
	        //.attr('clip-path', 'url(#clip)')
		.attr('d', areaOrbit);

	    // Add line

	    
	    svg.selectAll('.line')
	        .data([values])
	        .enter()
	        .append('path')
	        .attr('class', 'line')
	        .style('stroke', function(d) {
		    return colors(Math.random() * 50);
		})
	        .attr('clip-path', 'url(#clip)')
	        .attr('d', function(d) {
		    return line(d); //this is where we interpolate
		});



	}); 

	// Parse years and means. We assume years are sorted.
	function type(d) {
	    d.year = parseInt(d.year);
	    d.annualMean = +d.annualMean + 0.23;
	    d.annualMeanUpper = env + d.annualMean;
            d.annualMeanLower = +d.annualMean  - env;

	    return d;
	}

    },
    

    componentDidMount: function() {
	//this is invoked once when the component is first rendered
	var el = this.getDOMNode(); //this is the div we are rendering
	var svg = d3.select(el)
		.append("svg")
	        .attr("width", this.props.width + this.props.marginLeft + this.props.marginRight)
	        .attr("height", this.props.height + this.props.marginTop + this.props.marginBottom)

	this.updateChart(this.props);
    },

    componentWillUpdate: function(nextProps) {
	//this is invoked every time the props change
	this.updateChart(nextProps);
    },

    getDefaultProps: function() {
	//this is a protection for the case that not all props are passed
	return {
	    width: 800,
	    height: 340,
	    marginLeft: 80,
	    marginRight: 80,
	    marginTop: 40,
	    marginBottom: 40
	}
    },


    render: function() {
	return (
	    <div className="chart"></div>
	);
    }
});
