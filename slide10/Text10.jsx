Text10 = React.createClass({

    h3Style: {
	color: 'grey',
	fontSize: '18px',
	display: 'inline-block',
	maxWidth: '700px'
	    },

    render: function() {

	return (

	    <h3 style= {this.h3Style}>
	      Greenhouse gases warm the atmosphere. Aerosols cool it a little bit. Ozone and
	      land-use changes add and subtract a little. Together they match the observed
	      temperature, particularly since 1950.
	    </h3>
	);
    }
});
