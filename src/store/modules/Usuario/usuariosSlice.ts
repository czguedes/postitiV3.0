import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../..';
import UsuarioState from '../../types/Usuarios';

const usersAdapter = createEntityAdapter<UsuarioState>({
	selectId: (state) => state.email,
});

export const { selectAll: buscarUsuarios } = usersAdapter.getSelectors(
	(global: RootState) => global.usuario,
);

export const usuariosSlice = createSlice({
	name: 'usuarios',
	initialState: usersAdapter.getInitialState(),
	reducers: {
		adicionarUsuario: usersAdapter.addOne,
		logaUsuario: usersAdapter.updateOne,
	},
});

export const { adicionarUsuario, logaUsuario } = usuariosSlice.actions;

export default usuariosSlice.reducer;
