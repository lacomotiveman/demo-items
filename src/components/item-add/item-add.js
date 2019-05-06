import React, {Component} from 'react';
import './item-add.css';
export default class ItemAdd extends Component{

	state = {
		label:'',
	};

	onLabelChange = (e) =>{
		// состояние не зависит от предыдущего состояния state
		this.setState({
			label: e.target.value
		}); 
	}

	onSubmit = (e) => {
		e.preventDefault(); // отключаем перезагрузку страницы при submit формы
		this.props.onItemAdd(this.state.label);
		this.setState({
			label: ''
		});
	}

	render(){
		return(
			<form className="item-add f-flex"
				onSubmit={this.onSubmit}
			>
				<input 
					type="text" 
					className="form-control"
					placeholder="write something"
					onChange={this.onLabelChange}
					value={this.state.label}
				/>

				<button
					className="btn btn-info"
				>Add Item</button>

			</form>
		);
	}
}