import React, {Component} from 'react';
import ItemHeader from '../item-header';
import ItemSearch from '../item-search';
import ItemList from '../item-list';
import ItemFilter from '../item-filter';
import ItemAdd from '../item-add';
import ThreeScene from '../three-scene';



import './app.css';


export default class App extends Component{

	state = {
		items: [
		  { id: 1, label: 'Item1', important: false, done: false },
		  { id: 2, label: 'Item22', important: true, done: false },
		  { id: 3, label: 'Item333', important: false, done: false },
		  { id: 4, label: 'Item4444', important: false, done: false },
		],
		searchString:'',
		filterString:'all'
	}

	deleteItem = (id)=>{
		this.setState(
			( { items } )=>{  // предыдущее состояние
				// ищем индекс элемента в стейте
				const arrStateIndex = items.findIndex(
					(element)=>{
						return element.id === id;	// устанавливаем новый стейт
					}
				);

				// вот так делать нельзя, т.к. splice напрямую меняет state!
				// items.splice( arrStateIndex, 1 );
				const del_1 = items.slice(0,arrStateIndex);
				const del_2 = items.slice(arrStateIndex+1); // и до конца

				const delFinal=[...del_1,...del_2];

				return({
					 items: delFinal
				})
			}
		);
	}

	modifyItem = (id,propName)=>{

		this.setState(
			( { items } )=>{
				// копируем исходный массив, меняя значение у элемента с нужным id
				const newItems = items.map((item)=>{
					if(item.id===id){
						const updatedItem = {...item};
						updatedItem[propName] = !updatedItem[propName];
						return (updatedItem);
					}else{
						return ({...item});
					}
				});
				return({items:newItems});
			}
		)

	}

	doneItem = (id) => { this.modifyItem(id, 'done'); }

	importantItem = (id) => { this.modifyItem(id, 'important'); }

	addItem =(labelText)=>{
		this.setState(
			( { items } )=>{

				let maxId = -1;
				items.forEach(
					(item)=>{
						if(item.id > maxId)  maxId=item.id ;
					}
				);

				maxId++;
				const newItem = {id:maxId, label:labelText, important: false, done: false};
				const newItems = [...items, newItem];
				return({items:newItems});
			}
		)
	}

	onFilter = (filterType)=>{
		this.setState({
			filterString: filterType
		});
	}



	searchItem = (searchStr) =>{
		const { items } = this.state;

		if(searchStr.length===0) return items;

		return items.filter((item)=>{
			return (item.label.indexOf(searchStr)>-1); // если не находит  == -1
		});

	}

	onSearchChange = (searchText)=>{
		this.setState({
			searchString: searchText
		});
	}

	render(){

		// REDUX STORE
		const { param1, param2, actionChangeParam1, actionChangeParam2 } = this.props;

		const { items, searchString } = this.state;
		const  doneCounter = items.filter((item)=>item.done).length;
		const  leftCounter = items.length - doneCounter;
		const  searchedItems = this.searchItem(searchString).filter((item)=>{
				switch(this.state.filterString){
					case 'done':
						return (item.done ? true : false);

					case 'active':
						return (!item.done ? true : false);

					default:
						return true;
				}
			}
		);

		return(
			<div className="demo-app">
				<ItemHeader 
					h1="Items React App" 
					h2="Demo" 
					left={leftCounter} 
					done={doneCounter} 
					total={items.length}
				/>
				<ItemSearch onSearchChange={this.onSearchChange}/>
				<ItemFilter onFilter={this.onFilter}/>
				<ItemList
					items={ searchedItems }
					onDelete={(id)=>this.deleteItem(id)}
					onDone={(id)=>this.doneItem(id)}
					onImportant={(id)=>this.importantItem(id)}
				/>
				<ItemAdd onItemAdd={this.addItem}/>

				<p></p>
			
				<ItemHeader 
					h1="WebGL" 
					h2="Try to Drag Slider or Orbit 3D-View"
				/>
				<ThreeScene/>

				<p></p>

				<div className="jumbotron">
					<ItemHeader 
						h1="REDUX in App Component" 
						h2="Try to Press Change Param button"
					/>				
					<p>state param1: { param1 }</p>
					<p>state param2: { param2 }</p>
					<button className="btn btn-info" onClick={()=>actionChangeParam1('new1')}>Change PARAM1 to NEW1</button> <span>    </span>
					<button className="btn btn-info float-right" onClick={()=>actionChangeParam2('new22')}>Change PARAM2 to NEW22</button>
				</div>
				
			</div>
		);
	}

};