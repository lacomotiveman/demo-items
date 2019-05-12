import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

import { createStore, bindActionCreators } from 'redux';
import {connect, Provider}  from 'react-redux';

import { reducerRoot } from './store/reducers';
import { actionChangeParam1, actionChangeParam2} from './store/actions';


// IDs for TYPES of actions

export const ID_ACTION_CHANGE_PARAM1 = 'ID_ACTION_CHANGE_PARAM1';
export const ID_ACTION_CHANGE_PARAM2 = 'ID_ACTION_CHANGE_PARAM2';




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