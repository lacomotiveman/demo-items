import React, {Component} from 'react';

export default class ItemSearch extends Component{

	state = {
		searchText:''
	}

	onSearchChange = (e) =>{
		this.setState({
			searchText: e.target.value
		});

		this.props.onSearchChange (e.target.value);
	}

	render(){
		return(
			<input 
				type="text" 
				className="form-control search-input item-search" 
				placeholder="search item"
				onChange = { this.onSearchChange }
				value={this.state.searchText}
			/>
		);
	}
}