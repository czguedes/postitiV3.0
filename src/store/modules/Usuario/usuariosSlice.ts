import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../..';
import { emailRegex } from '../../../utils/validations/regexEmail';
import UsuarioState from '../../types/Usuarios';

const initialState: UsuarioState = {
	email: '',
	senha: '',
};

export const usuariosSlice = createSlice({
	name: 'usuarios',
	initialState,
	reducers: {
		adicionarUsuario: (prevState, action: PayloadAction<UsuarioState>) => {
			if (
				!action.payload.email ||
				!emailRegex.test(action.payload.email)
			) {
				return prevState;
			}

			if (!action.payload.senha || action.payload.senha.length < 8) {
				return prevState;
			}

			return {
				email: action.payload.email,
				senha: action.payload.senha,
			};
		},
		removerUsuario: () => {
			return initialState;
		},
	},
});

export const { adicionarUsuario, removerUsuario } = usuariosSlice.actions;

export const selectUsuario = (globalState: RootState) => {
	globalState.usuario.email;
};

export default usuariosSlice.reducer;
