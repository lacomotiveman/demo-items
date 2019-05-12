import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

import {createStore, bindActionCreators} from 'redux';
import {connect, Provider}    from 'react-redux';

const stateInitial = {param1:'1', param2:'22'};

// IDs for TYPES of actions

const ID_ACTION_CHANGE_PARAM1 = 'ID_ACTION_CHANGE_PARAM1';
const ID_ACTION_CHANGE_PARAM2 = 'ID_ACTION_CHANGE_PARAM2';

// ACTIONS

const actionChangeParam1 = (newValue) =>{
	return {
		type: ID_ACTION_CHANGE_PARAM1,
		payload: newValue
	};
}

const actionChangeParam2 = (newValue) =>{
	return {
		type: ID_ACTION_CHANGE_PARAM2,
		payload: newValue
	};
}


// REDUCER

const reducerRoot = (state = stateInitial, action) =>{
	switch (action.type){
		case ID_ACTION_CHANGE_PARAM1:
			return {
				...state,
				param1: action.payload
			};

		case ID_ACTION_CHANGE_PARAM2:
			return {
				...state,
				param2: action.payload
			};
		default: return {...state};
	};
};

// STORE

const storeRedux = createStore(reducerRoot);

// прокидываем данные стейта в пропсы компонента
const putStateToProps = (state) => {
	//console.log(state);
	return { 
		param1: state.param1,
		param2: state.param2 
	};
}

// прокидываем методы изменения стейта в компонент
const putActionsToProps = (dispatch) =>{
	return {
		actionChangeParam1: bindActionCreators(actionChangeParam1, dispatch),
		actionChangeParam2: bindActionCreators(actionChangeParam2, dispatch)
	};
}

const WrappedApp = connect(putStateToProps,putActionsToProps)(App);

ReactDOM.render(

	<Provider store={storeRedux}>
		<WrappedApp />
	</Provider>,

	document.getElementById('root')
);