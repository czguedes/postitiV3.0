import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import serviceAPI from '../../../configs/services/service.api';
import { RespostaCadastro } from '../../types/RetornoRequests';
import { UsuarioLogin, UsuarioState } from '../../types/Usuarios';
import { showNotification } from '../notificationSlice';

export type UsuarioLogado = {
	id: string;
	nome: string;
	isLogged: boolean;
};

const initialState = {
	usuario: { id: '', nome: '', isLogged: false },
	loading: false,
};

// Criar action async para sign up
export const cadastrarUsuario = createAsyncThunk(
	'usuario/cadastro',
	async (novoUsuario: UsuarioState, { dispatch }) => {
		//try catch - toda vez q for feita uma requisição externa

		try {
			const resposta = await serviceAPI.post(
				'/usuarios/cadastrar',
				novoUsuario,
			);

			const respostaAPI = resposta.data as RespostaCadastro;

			dispatch(
				showNotification({
					message: respostaAPI.mensagem,
					success: respostaAPI.sucesso,
				}),
			);

			return respostaAPI;
		} catch (error) {
			if (error instanceof AxiosError) {
				const response = error.response?.data as RespostaCadastro;

				dispatch(
					showNotification({
						message: response.mensagem,
						success: response.sucesso,
					}),
				);

				return response;
			}

			return {
				success: false,
				message: 'Erro inesperado.',
			};
		}
	},
);

// Criar action async para sign in
export const loginUsuario = createAsyncThunk(
	'usuario/login',
	async (login: UsuarioLogin, { dispatch }) => {
		try {
			const resposta = await serviceAPI.post('/usuarios/logar', login);

			const respostaAPI = resposta.data as RespostaCadastro;

			dispatch(
				showNotification({
					message: respostaAPI.mensagem,
					success: respostaAPI.sucesso,
				}),
			);

			return respostaAPI;
		} catch (error) {
			if (error instanceof AxiosError) {
				const response = error.response?.data as RespostaCadastro;

				dispatch(
					showNotification({
						message: response.mensagem,
						success: response.sucesso,
					}),
				);

				return response;
			}

			return {
				success: false,
				message: 'Erro inesperado.',
			};
		}
	},
);

export const usuariosSlice = createSlice({
	name: 'usuario',
	initialState: initialState,
	reducers: {
		setUser: (estadoAtual, action: PayloadAction<UsuarioLogado>) => {
			return {
				...estadoAtual,
				usuario: {
					id: action.payload.id,
					isLogged: action.payload.isLogged,
					nome: action.payload.nome,
				},
			};
		},
		logoutUser: (estadoAtual) => {
			return initialState;
		},
	},
	extraReducers: (builder) => {
		//cadastro
		builder.addCase(cadastrarUsuario.pending, (estadoAtual) => {
			return {
				...estadoAtual,
				loading: true,
			};
		});
		builder.addCase(cadastrarUsuario.fulfilled, (estadoAtual, action) => {
			const payload = action.payload as RespostaCadastro;

			if (payload.sucesso && payload.dadoCadastrado) {
				return {
					usuario: {
						id: payload.dadoCadastrado?.id,
						nome: payload.dadoCadastrado?.nome,
						isLogged: false,
					},
					loading: false,
				};
			}

			if (!payload.sucesso) {
				return {
					...estadoAtual,
					loading: false,
				};
			}
		});
		builder.addCase(cadastrarUsuario.rejected, (estadoAtual) => {
			return {
				...estadoAtual,
				loading: false,
			};
		});

		//Login
		builder.addCase(loginUsuario.pending, (estadoAtual) => {
			return {
				...estadoAtual,
				loading: true,
			};
		});
		builder.addCase(loginUsuario.fulfilled, (estadoAtual, action) => {
			const payload = action.payload as RespostaCadastro;

			if (payload.sucesso && payload.dadoCadastrado) {
				localStorage.setItem(
					'userLogged',
					JSON.stringify(payload.dadoCadastrado),
				);

				return {
					...estadoAtual,
					usuario: {
						id: payload.dadoCadastrado.id,
						isLogged: true,
						nome: payload.dadoCadastrado.nome,
					},
					loading: false,
				};
			}

			if (!payload.sucesso) {
				return {
					usuario: {
						id: '',
						isLogged: false,
						nome: '',
					},
					loading: false,
				};
			}
		});
		builder.addCase(loginUsuario.rejected, (estadoAtual) => {
			return {
				...estadoAtual,
				loading: false,
			};
		});
	},
});

export const { setUser, logoutUser } = usuariosSlice.actions;
export default usuariosSlice.reducer;
