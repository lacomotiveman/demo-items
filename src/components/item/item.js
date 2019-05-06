import React, {Component} from 'react';
import './item.css';

export default class Item extends Component{


	render(){
		const { label, done, important, onDelete, onImportant, onDone }  = this.props; 

		let classNames = 'item';
		if(done){
			classNames+=' done';
		}
		if(important){
			classNames+=' important';
		}
		return(
		<span className={classNames}>
			<span
				className="item-label"
				onClick = { onDone }
			>
				{label}
			</span>
			<button
				type="button"
				className="btn btn-outline-success btn-sm float-right"
				onClick = { onDelete }
			>Del</button>

			<button
				type="button"
				className="btn btn-outline-success btn-sm float-right"
				onClick = { onImportant }
			>Im</button>
		</span>
		);
	}
}