import {ID_ACTION_CHANGE_PARAM1, ID_ACTION_CHANGE_PARAM2} from '../index';


export const actionChangeParam1 = (newValue) =>{
	return {
		type: ID_ACTION_CHANGE_PARAM1,
		payload: newValue
	};
}

export const actionChangeParam2 = (newValue) =>{
	return {
		type: ID_ACTION_CHANGE_PARAM2,
		payload: newValue
	};
}
