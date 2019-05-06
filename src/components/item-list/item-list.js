import React, {Component} from 'react';
import Item from '../item';
import './item-list.css';

export default class ItemList extends Component{
	
	render(){

		const itemList = this.props.items.map((item)=>{

			const { onDelete, onDone, onImportant } = this.props;
			const {id, ...itemProps} = item;
			
			return (
				<li key={id} className="list-group">
					<Item 
						{...itemProps} 
						onDelete={
							()=>{
								onDelete(id);
							}
						}
						onDone={
							()=>{
								onDone(id);
							}
						}
						onImportant={
							()=>{
								onImportant(id);
							}
						}

					/>
				</li>
			);
		});

		return(

			<ul className="item-list">
				{itemList}
			</ul>
		);
	}
}