import React, {Component} from 'react';
import './three-slider.css';

export default class ThreeSlider extends Component{
	state = {
		value:0
	}

	onChange = (e) =>{
		e.preventDefault();
		this.setValue(e.target.value);
		this.props.onChangeSlider(e.target.value);
	}

	setValue = (val) =>{
		if(this.state.value!==val){
			this.setState({
				value: val
			});
		}
	}

	render(){

		const { compName, min, max, step } = this.props;

		return(
			<div className="form-group">
				<label htmlFor="formControlRange">{ compName }</label>
				<input
					id="formControlRange"
					type="range"
					min={min}
					max={max}
					step={step}
					className="form-control-range"
					onChange = { this.onChange }
					value={this.state.value}
				/>
			</div>
		);
	}
}