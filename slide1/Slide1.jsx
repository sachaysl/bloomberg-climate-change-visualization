Slide1 = React.createClass({

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
		  <button type="button" className="btn btn-primary">Previous Slide</button>
		</div>
		<div class="btn-group" style = {this.buttonStyle2} role="group">
		  <button type="button" className="btn btn-primary">Next Slide</button>
		</div>
	

	      <WhatsReallyWarmingTheWorld />
	      <Text1 />
	      <LineChart />	
	    </div>
	);
    }
});
