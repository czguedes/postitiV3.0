import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { RootState } from '../..';
import serviceAPI from '../../../configs/services/service.api';
import { RecadoDTO, RecadoState } from '../../types/Recados';
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

			return resposta.data as RespostaRecado;
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

export const { selectAll: listaTodosRecados, selectById: listaPorId } =
	recadosAdapter.getSelectors((global: RootState) => global.recados);

const recadosSlice = createSlice({
	name: 'recados',
	initialState: recadosAdapter.getInitialState({
		loading: false,
		mensagem: '',
		mostraArquivados: false,
	}),
	reducers: {},
	extraReducers: (builder) => {
		//get

		//post
		builder.addCase(criarRecado.pending, (estadoAtual) => {
			estadoAtual.loading = true;
			estadoAtual.mensagem = 'Criando recado...';
		});

		builder.addCase(criarRecado.fulfilled, (estadoAtual, acao) => {
			const { dadoCadastrado, mensagem } = acao.payload;
			estadoAtual.loading = false;
			estadoAtual.mensagem = mensagem;

			if (!dadoCadastrado) {
				return;
			}

			recadosAdapter.addOne(estadoAtual, dadoCadastrado);
		});

		builder.addCase(criarRecado.rejected, (estadoAtual) => {
			estadoAtual.loading = false;
			estadoAtual.mensagem = 'Recado não criado.';
		});

		//put

		//delete
	},
});

export default recadosSlice.reducer;
