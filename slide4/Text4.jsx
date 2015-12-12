Text4 = React.createClass({

    h3Style: {
	color: 'grey',
	fontSize: '18px',
	display: 'inline-block',
	maxWidth: '700px'
	    },

    render: function() {

	return (

	    <h3 style= {this.h3Style}>
	      The data suggest that human industry emits about 100 times more
	      carbon dioxide than volcanic activity, and eruptions release sulfate chemicals that can actually cool the atmosphere for a year or two.
	    </h3>
	);
    }
});
