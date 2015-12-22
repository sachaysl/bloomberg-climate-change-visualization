Slide11 = React.createClass({
    divStyle: {
	textAlign: 'center'
    },

    buttonStyle1: {
	float: 'left',
	marginLeft: '20px'
    },

    buttonStyle2: {
	float: 'right',
	marginRight: '20px'
    },

    render: function() {
	return (
	    <div style={this.divStyle}>
		<div className="btn-group" style= {this.buttonStyle1} role="group">
		  <button type="button" onClick = {this.props.hps} className="btn btn-primary">
		    Previous Slide
		  </button>
		</div>

	      <Header11 />
	      <Text11 />
	      <LineChart11 />	
	    </div>
	);
    }
});
