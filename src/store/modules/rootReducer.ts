import { combineReducers } from '@reduxjs/toolkit';

import recadosSlice from './Recados/recadosSlice';
import usuariosSlice from './Usuario/usuariosSlice';

const rootReducer = combineReducers({
	usuario: usuariosSlice,
	recados: recadosSlice,
});

export default rootReducer;
