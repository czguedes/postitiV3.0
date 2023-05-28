import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
	// a cada novo slice, adicionamos uma nova propriedade neste objeto
	// propriedade - nome na store
	// valor - reducer/manager deste estado global
});

export default rootReducer;
