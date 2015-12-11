App = React.createClass({

    getInitialState: function() {
	return {
	    slide: 1
	};
    },

    handleNextSlide: function() {
	this.setState(function(previousState, currentProps) {

	    return { slide: previousState.slide + 1};
	});
    },

    handlePreviousSlide: function() {
	this.setState(function(previousState, currentProps) {

	    return { slide: previousState.slide - 1};
	});
    },

    render: function() {
	var slide = this.state.slide;

	if (slide == 1) {
	    return (
		<Slide1 hns = {this.handleNextSlide} />
	    );
	}

	if (slide == 2) {
	    return (

		<Slide2 hps = {this.handlePreviousSlide}  hns = {this.handleNextSlide}/>
	    );
	}
    }
});
		     
			
	
