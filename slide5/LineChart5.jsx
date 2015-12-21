LineChart5 = React.createClass({

    updateChart: function(props) {
	var height = props.height;
	var width = props.width;
	var parse = d3.time.format("%b %Y").parse;

	// 2 standard deviations in Celsius
	var env = 1.96*.14;
	
	// Scales and axes. Note the inverted domain for the y-scale: bigger is up!
	var x = d3.scale.linear().range([0, width]),
	    y = d3.scale.linear().range([height, 0]),
	    xAxis = d3.svg.axis().scale(x).tickSize(-height)
		.tickSubdivide(true)
		.tickFormat(d3.format("d")),
	    yAxis = d3.svg.axis().scale(y).ticks(4).orient("right");

	// An area generator, for the light fill.
	var area = d3.svg.area()
		.interpolate("monotone")
		.x(function(d) { return x(d.year); })
		.y0(height)
		.y1(function(d) { return y(d.annualMean); });
	
        var areaNatural = d3.svg.area()
		.interpolate(interpolation)
		.x(function(d) { return x(d.year); })
		.y0(function(d) { return y(d.naturalLower); })
		.y1(function(d) { return y(d.naturalUpper); });

	// A line generator, for the dark stroke.

	var interpolation = "linear";
	

	var line = d3.svg.line()
		.interpolate("monotone")
		.x(function(d) { return x(d.year); })
		.y(function(d) { return y(d.annualMean); });

	var line2 = d3.svg.line()
		.interpolate("monotone")
		.x(function(d) { return x(d.year); })
		.y(function(d) { return y(d.orbitalChanges); });

	var line3 = d3.svg.line()
		.interpolate("monotone")
		.x(function(d) { return x(d.year); })
		.y(function(d) { return y(d.solar); });

	var line4 = d3.svg.line()
		.interpolate("monotone")
		.x(function(d) { return x(d.year); })
		.y(function(d) { return y(d.volcanic); });

	var line5 = d3.svg.line()
		.interpolate("monotone")
		.x(function(d) { return x(d.year); })
		.y(function(d) { return y(d.natural); });

	d3.csv("data/observed.csv", type, function(data) {
	    d3.csv("data/forcings.csv",type2, function(data2) {

	    // Filter to one symbol; the S&P 500.
	  //  var values = data.filter(function(d) {
	//	return d.symbol == "AMZN";;
	  //  });

	 //   var msft = data.filter(function(d) {
	//	return d.symbol == "MSFT";
	 //   });

	 //   var ibm = data.filter(function(d) {
	    //	return d.symbol == 'IBM';
              
		var values = data;
		var values2 = data2;
	    
	  
	    // Compute the minimum and maximum date, and the maximum price.
	x.domain([values[0].year, values[values.length - 1].year]);
	y.domain([-1, 1]);

	    // Add an SVG element with the desired dimensions and margin.
	    var svg = d3.select("svg")
	            .append("g")
	            .attr("transform", "translate(" + props.marginLeft + "," + props.marginTop + ")");

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
		var domain = ["observed","solar","greenhouse","volcanic","aerosol","natural",
			      "ozone","human","land","orbital"
			      ];
		colors.domain(domain);
		
		//

	        svg.append('path')
		.attr({ "class": "area confidence"})
		.data([values2])
		.style('fill', function(d) {
		    return colors("natural");
		})
	        .attr('clip-path', 'url(#clip)')
		.attr('d', areaNatural);

		
		svg.selectAll('.line3')
	        .data([values2])
	        .enter()
	        .append('path')
	        .attr('class', 'line')
	        .style('stroke', function(d) {
		    return colors("orbital");
		})
	        .attr('clip-path', 'url(#clip)')
	        .attr('d', function(d) {
		    return line2(d);
		});

		svg.selectAll('.line3')
	        .data([values2])
	        .enter()
	        .append('path')
	        .attr('class', 'line')
	        .style('stroke', function(d) {
		    return colors("solar");
		})
	        .attr('clip-path', 'url(#clip)')
	        .attr('d', function(d) {
		    return line3(d);
		});

		svg.selectAll('.line3')
	        .data([values2])
	        .enter()
	        .append('path')
	        .attr('class', 'line')
	        .style('stroke', function(d) {
		    return colors("volcanic");
		})
	        .attr('clip-path', 'url(#clip)')
	        .attr('d', function(d) {
		    return line4(d);
		});

	    //placeholder for orbitalChanges forcing
	     //    svg.append('line')
	       //     .attr('stroke', 'rgb(0,0,0)')
	      //      .attr('stroke-width', 0.5)
	      //      .attr('x1', 0)
	      //      .attr('y1', 200)
	      //      .attr('x2', 800)
	      //      .attr('y2', 200);
	    //end of placeholder


	    /* Add 'curtain' rectangle to hide entire graph */
	    var curtain = svg.append('rect')
	            .attr('x', -1 * props.width)
	            .attr('y', -1 * props.height)
	            .attr('height', props.height)
	            .attr('width', props.width)
	            .attr('class', 'curtain')
	            .attr('transform', 'rotate(180)')
	            .style('fill', '#ffffff');

	    /* Optionally add a guideline */
	    var guideline = svg.append('line')
	            .attr('stroke', '#333')
	            .attr('stroke-width', 0)
	            .attr('class', 'guide')
	            .attr('x1', 1)
	            .attr('y1', 1)
	            .attr('x2', 1)
	            .attr('y2', props.height);

	    /* Create a shared transition for anything we're animating */
	    var t = svg.transition()
	            .delay(300)
	            .duration(4000)
	            .ease('linear')
	            .each('end', function() {
			d3.select('line.guide')
			    .transition()
			    .style('opacity', 0)
			    .remove();
		    });

	    t.select('rect.curtain')
	        .attr('width', 0);
	    t.select('line.guide')
	        .attr('transform', 'translate(' + props.width + ', 0)');

	//    d3.select("#show_guideline").on("change", function(e) {
	//	guideline.attr('stroke-width', this.checked ? 1 : 0);
	//	curtain.attr("opacity", this.checked ? 0.75 : 1);
	    //  })

	    svg.selectAll('.line2')
	        .data([values])
	        .enter()
	        .append('path')
	        .attr('class', 'lineTwo')	
	        .style('stroke', function(d) {
		    return colors("observed");
		})
	        .attr('clip-path', 'url(#clip)')
	        .attr('d', function(d) {
		    return line(d);
		});

	    	    svg.append('line')
	            .attr('stroke', 'rgb(0,0,0)')
	            .attr('stroke-width', 0.5)
	            .attr('x1', 0)
	            .attr('y1', 171)
	            .attr('x2', 800)
	            .attr('y2', 171);
//Legend
		    svg.append("rect")
		    .attr("x", 0)
		    .attr("y", 0)
		    .attr("width", 20)
		    .attr("height", 20)
		    .style("fill", function() { return colors("observed")});

       		svg.append("text")
		    .text("Observed Land-Ocean Temperature")
		    .attr("font-family", "helvetica")
		    .style("font-size", "11px")
		    .attr("x", 25)
		    .attr("y", 12);

		svg.append("rect")
		    .attr("x", 0)
		    .attr("y", 25)
		    .attr("width", 20)
		    .attr("height", 20)
		    .style("fill", function() { return colors("orbital")});

       		svg.append("text")
		    .text("Influence of Orbital Changes")
		    .attr("font-family", "helvetica")
		    .style("font-size", "11px")
		    .attr("x", 25)
		    .attr("y", 37);

		svg.append("rect")
		    .attr("x", 0)
		    .attr("y", 50)
		    .attr("width", 20)
		    .attr("height", 20)
		    .style("fill", function() { return colors("solar")});

       		svg.append("text")
		    .text("Influence of the Sun")
		    .attr("font-family", "helvetica")
		    .style("font-size", "11px")
		    .attr("x", 25)
		    .attr("y", 62);
		
		svg.append("rect")
		    .attr("x", 0)
		    .attr("y", 75)
		    .attr("width", 20)
		    .attr("height", 20)
		    .style("fill", function() { return colors("volcanic")});
		
       		svg.append("text")
		    .text("Influence of Volcanoes")
		    .attr("font-family", "helvetica")
		    .style("font-size", "11px")
		    .attr("x", 25)
		    .attr("y", 87);

		svg.append("rect")
		    .attr("x", 0)
		    .attr("y", 100)
		    .attr("width", 20)
		    .attr("height", 20)
		    .style("fill", function() { return colors("natural")});
		
       		svg.append("text")
		    .text("Combined Influence of Natural Factors ")
		    .attr("font-family", "helvetica")
		    .style("font-size", "11px")
		    .attr("x", 25)
		    .attr("y", 112);


		var t0 = svg.transition().delay(4000).duration(3000);

		t0.selectAll(".line")
		    .style('stroke', function(d) {
		    return colors("natural");
		    })
		    .attr("d", line5);

		svg.append("text")
		    .text("Shaded Region Represents 95% Confidence Interval")
		    .attr("font-family", "helvetica")
		    .style("font-size", "11px")
		    .style("fill", function() { return colors("natural")})
		    .attr("x", 250)
		    .attr("y", 300);



	    
	    });
	});

	// Parse years and means. We assume years are sorted.
	function type(d) {
	    d.year = parseInt(d.year);
	    d.annualMean = +d.annualMean + 0.23;

	    return d;
	}

	// Kelvin To Celsius
	function kToC(t){
	    // 272.15K = 1 C
	    return (t - 272.15);
	}

	function type2(d) {
	    d.year = parseInt(d.year);
	    d.orbitalChanges = kToC(+d.orbitalChanges) - kToC(287.50310744057606);
	    d.solar =  kToC(+d.solar) - kToC(287.50310744057606);
	    d.volcanic = kToC(+d.volcanic) - kToC(287.50310744057606);
	    d.natural = kToC(+d.natural) - kToC(287.50310744057606);
	    d.naturalLower = env + d.natural;
	    d.naturalUpper = -env + d.natural;
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
