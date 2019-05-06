import React, {Component} from 'react';

export default class ItemFilter extends Component{

	state={
		buttons : [
			{name:'All', active: true},
			{name:'Active', active:false},
			{name:'Done', active:false}
		],
	}

	onItemFilter = (e)=>{
		e.preventDefault();
		e.target.className = "btn btn-outline-secondary";
		switch(e.target.innerHTML){
			case 'All': 
				this.props.onFilter('all');
				this.setState(
				{		buttons : [
							{name:'All', active: true},
							{name:'Active', active:false},
							{name:'Done', active:false}
						],}
				);
				break;

			case 'Active': 
				this.props.onFilter('active');
				this.setState(
				{		buttons : [
							{name:'All', active: false},
							{name:'Active', active:true},
							{name:'Done', active:false}
						],}
				);
				break;

			case 'Done': 
				this.props.onFilter('done');
				this.setState(
				{		buttons : [
							{name:'All', active: false},
							{name:'Active', active:false},
							{name:'Done', active:true}
						],}
				);
				break;
			default:
				this.props.onFilter('all');
				this.setState(
				{		buttons : [
							{name:'All', active: true},
							{name:'Active', active:false},
							{name:'Done', active:false}
						],}
				);
				break;
		}
		
	}

	render(){
		const buttons = this.state.buttons.map(({name, active})=>{
			return (<button 
					type="button"
					className={active ? "btn btn-warning" : "btn btn-info"}
					onClick={this.onItemFilter}
					key={name}
				>{name}</button>
			)
		});

		return(
			<div className="btn-group">
				{ buttons }
			</div>
		);
	}
}