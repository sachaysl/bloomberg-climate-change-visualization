App = React.createClass({

    getInitialState: function() {
	return {
	    slide: 0
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

	if (slide == 0) {
	    return (
		<Slide0 hns = {this.handleNextSlide} />
	    );
	}
	

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

	if (slide == 3) {
	    return (
		<Slide3 hps = {this.handlePreviousSlide}  hns = {this.handleNextSlide}/>
	    );
        }

	if (slide == 4) {
	    return (
		<Slide4 hps = {this.handlePreviousSlide}  hns = {this.handleNextSlide}/>
	    );
        }

 	if (slide == 5) {
	    return (
		<Slide5 hps = {this.handlePreviousSlide}  hns = {this.handleNextSlide}/>
	    );
	}

	if (slide == 6) {
	    return (
		<Slide6 hps = {this.handlePreviousSlide}  hns = {this.handleNextSlide}/>
	    );
	}
	
	if (slide == 7) {
	    return (
		<Slide7 hps = {this.handlePreviousSlide}  hns = {this.handleNextSlide}/>
	    );
	}

	if (slide == 8) {
	    return (
		<Slide8 hps = {this.handlePreviousSlide}  hns = {this.handleNextSlide}/>
	    );
	}
	
	if (slide == 9) {
	    return (
		<Slide9 hps = {this.handlePreviousSlide}  hns = {this.handleNextSlide}/>
	    );
	}

	if (slide == 10) {
	    return (
		<Slide10 hps = {this.handlePreviousSlide}  hns = {this.handleNextSlide}/>
	    );
	}
	
	if (slide == 11) {
	    return (
		<Slide11 hps = {this.handlePreviousSlide}/>
	    );
	}




    }
});
		     
			
	
