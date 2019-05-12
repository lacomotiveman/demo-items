// REDUCER
import {ID_ACTION_CHANGE_PARAM1, ID_ACTION_CHANGE_PARAM2} from '../index';

const stateInitial = {param1:'1', param2:'22'};

export const reducerRoot = (state = stateInitial, action) =>{
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
