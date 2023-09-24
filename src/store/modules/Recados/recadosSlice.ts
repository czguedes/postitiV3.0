import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { RootState } from '../..';
import serviceAPI from '../../../configs/services/service.api';
import {
	DeleteRecado,
	PesquisaRecado,
	RecadoDTO,
	RecadoState,
} from '../../types/Recados';
import { RespostaRecado } from '../../types/RetornoRequests';
import { showNotification } from '../notificationSlice';

export const criarRecado = createAsyncThunk(
	'recados/criar',
	async (dadosRecado: RecadoDTO, { dispatch }) => {
		try {
			const resposta = await serviceAPI.post('/recados', dadosRecado);
			dispatch(
				showNotification({
					success: resposta.data.sucesso,
					message: resposta.data.mensagem,
				}),
			);

			return resposta.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				const retorno: RespostaRecado = {
					sucesso: error.response?.data.sucesso,
					mensagem: error.response?.data.mensagem,
				};
				dispatch(
					showNotification({
						message: error.response?.data.mensagem,
						success: false,
					}),
				);
				return retorno;
			}

			return {
				sucesso: false,
				mensagem:
					'Algo de errado não está certo... A requisição falhou!',
			};
		}
	},
);

export const atualizarRecado = createAsyncThunk(
	'recados/atualizar',
	async (dadosRecado: RecadoDTO, { dispatch }) => {
		try {
			const retorno = await serviceAPI.put(
				`/recados/editar/${dadosRecado.criadoPor}`,
				dadosRecado,
			);
			dispatch(
				showNotification({
					message: retorno.data.mensagem,
					success: retorno.data.sucesso,
				}),
			);
			return retorno.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				const retorno: RespostaRecado = {
					sucesso: error.response?.data.sucesso,
					mensagem: error.response?.data.mensagem,
				};
				dispatch(
					showNotification({
						message: error.response?.data.mensagem,
						success: false,
					}),
				);
				return retorno;
			}

			return {
				sucesso: false,
				mensagem:
					'Algo de errado não está certo... A requisição falhou!',
			};
		}
	},
);

export const deletarRecado = createAsyncThunk(
	'recados/excluir',
	async (dados: DeleteRecado, { dispatch }) => {
		try {
			const retorno = await serviceAPI.delete(
				`/recados/${dados.idRecado}`,
				dados.idUsuario,
			);
			dispatch(
				showNotification({
					message: retorno.data.mensagem,
					success: retorno.data.sucesso,
				}),
			);
			return retorno.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				const retorno: RespostaRecado = {
					sucesso: error.response?.data.sucesso,
					mensagem: error.response?.data.mensagem,
				};
				dispatch(
					showNotification({
						message: error.response?.data.mensagem,
						success: false,
					}),
				);
				return retorno;
			}

			return {
				sucesso: false,
				mensagem:
					'Algo de errado não está certo... A requisição falhou!',
			};
		}
	},
);

export const listarRecados = createAsyncThunk(
	'recados/listar',
	async (dados: PesquisaRecado, { dispatch }) => {
		try {
			const resposta = await serviceAPI.get(`/recados/${dados.id}`, {
				params: {
					arquivado: dados.arquivado,
				},
			});
			dispatch(
				showNotification({
					success: resposta.data.sucesso,
					message: resposta.data.mensagem,
				}),
			);

			return resposta.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				const retorno: RespostaRecado = {
					sucesso: error.response?.data.sucesso,
					mensagem: error.response?.data.mensagem,
				};
				dispatch(
					showNotification({
						message: error.response?.data.mensagem,
						success: false,
					}),
				);
				return retorno;
			}

			return {
				sucesso: false,
				mensagem:
					'Algo de errado não está certo... A requisição falhou!',
			};
		}
	},
);

const recadosAdapter = createEntityAdapter<RecadoState>({
	selectId: (state) => state.id,
});

export const { selectAll: listaTodosRecados } = recadosAdapter.getSelectors(
	(global: RootState) => global.recados,
);

const recadosSlice = createSlice({
	name: 'recados',
	initialState: recadosAdapter.getInitialState({
		loading: false,
		mensagem: '',
	}),
	reducers: {
		refresh(estadoAtual) {
			return { ...estadoAtual };
		},
	},
	extraReducers: (builder) => {
		////////////////////////////////get
		builder.addCase(listarRecados.pending, (estadoAtual) => {
			estadoAtual.loading = true;
			estadoAtual.mensagem = 'Carregando recados...';
		});
		builder.addCase(listarRecados.fulfilled, (estadoAtual, acao) => {
			const { mensagem, dadosRetornados } = acao.payload;
			estadoAtual.loading = false;
			estadoAtual.mensagem = mensagem;

			if (!dadosRetornados || dadosRetornados.length === 0) {
				estadoAtual.mensagem = 'Nada encontrado.';
				return;
			}

			recadosAdapter.setAll(estadoAtual, dadosRetornados);
		});
		builder.addCase(listarRecados.rejected, (estadoAtual) => {
			estadoAtual.loading = false;
			estadoAtual.mensagem = 'Recados não foram listados.';
		});

		///////////////////////////////post
		builder.addCase(criarRecado.pending, (estadoAtual) => {
			estadoAtual.loading = true;
			estadoAtual.mensagem = 'Criando recado...';
		});

		builder.addCase(criarRecado.fulfilled, (estadoAtual, acao) => {
			const { dadosRetornados, mensagem } = acao.payload;
			estadoAtual.loading = false;
			estadoAtual.mensagem = mensagem;

			if (!dadosRetornados?.id) {
				console.log(acao.payload);
				return;
			}

			recadosAdapter.addOne(estadoAtual, dadosRetornados);
		});

		builder.addCase(criarRecado.rejected, (estadoAtual) => {
			estadoAtual.loading = false;
			estadoAtual.mensagem = 'Recado não criado.';
		});

		/////////////////////////////put
		builder.addCase(atualizarRecado.pending, (estadoAtual) => {
			estadoAtual.loading = true;
			estadoAtual.mensagem = 'Atualizando recado...';
		});
		builder.addCase(atualizarRecado.fulfilled, (estadoAtual, acao) => {
			const { mensagem, dadosRetornados } = acao.payload;
			estadoAtual.loading = false;
			estadoAtual.mensagem = mensagem;

			if (!dadosRetornados || !dadosRetornados.id) {
				console.log(acao.payload);
				return;
			}

			recadosAdapter.updateOne(estadoAtual, {
				id: dadosRetornados.id,
				changes: dadosRetornados,
			});
		});
		builder.addCase(atualizarRecado.rejected, (estadoAtual) => {
			estadoAtual.loading = false;
			estadoAtual.mensagem = 'Recado não atualizado.';
		});

		/////////////////////////////delete
		builder.addCase(deletarRecado.pending, (estadoAtual) => {
			estadoAtual.loading = true;
			estadoAtual.mensagem = 'Apagando recado...';
		});
		builder.addCase(deletarRecado.fulfilled, (estadoAtual, acao) => {
			const { mensagem, dadosRetornados } = acao.payload;
			estadoAtual.loading = false;
			estadoAtual.mensagem = mensagem;

			if (!dadosRetornados) {
				console.log(acao.payload);
				return;
			}

			recadosAdapter.removeOne(estadoAtual, dadosRetornados);
		});
		builder.addCase(deletarRecado.rejected, (estadoAtual) => {
			estadoAtual.loading = false;
			estadoAtual.mensagem = 'Recado não apagado.';
		});
	},
});

export default recadosSlice.reducer;
export const { refresh } = recadosSlice.actions;
