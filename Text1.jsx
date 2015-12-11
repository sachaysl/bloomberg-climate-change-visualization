Text1 = React.createClass({

    h3Style: {
	color: 'grey',
	fontSize: '18px',
	display: 'inline-block',
	maxWidth: '700px'
	    },

    render: function() {

	return (

	    <h3 style= {this.h3Style}>
	      Skeptics of manmade climate change offer various natural causes to explain why the Earth has warmed 0.8 degrees Celsius since 1880. But can these account
	      for the planet's rising temperature? Click through these slides to see show how much different factors, both natural and industrial, contribute to global warming, based
	      on findings from NASA's Goddard Institute for Space Studies.
	    </h3>
	);
    }
});
