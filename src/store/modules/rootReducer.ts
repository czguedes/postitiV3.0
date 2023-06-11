import { combineReducers } from '@reduxjs/toolkit';

import contextoSlice from './ContextoModal/contextoSlice';
import notificationSlice from './notificationSlice';
import recadosSlice from './Recados/recadosSlice';
import usuariosSlice from './Usuario/usuariosSlice';

const rootReducer = combineReducers({
	usuario: usuariosSlice,
	recados: recadosSlice,
	notification: notificationSlice,
	contexto: contextoSlice,
});

export default rootReducer;
