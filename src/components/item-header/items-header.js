import React, {Component} from 'react';
import './item-header.css';

export default class ItemHeader extends Component{
	render(){
		const h1 = this.props.h1 ? <h1>{this.props.h1}</h1> : null;
		const h2 = this.props.h2 ? <h2>{this.props.h2}</h2> : null;
		const h3 = this.props.left ? <h2>Clean {this.props.left}, Сrossed out {this.props.done}, Total {this.props.total}</h2> : null;
		return(
			<div className="item-header">
	      		{h1}
	      		{h2}
	      		{h3}
      		</div>
		);
	}
}