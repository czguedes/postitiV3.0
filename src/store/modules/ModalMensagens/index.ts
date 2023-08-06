import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ModalMensagensProps {
	idRecado: string | undefined;
	tituloRecado: string | undefined;
	recado: string | undefined;
}

const initialState: ModalMensagensProps = {
	idRecado: '',
	recado: '',
	tituloRecado: '',
};

export const idRecadoSlice = createSlice({
	name: 'modalMensagens',
	initialState,
	reducers: {
		capturaId: (state, action: PayloadAction<ModalMensagensProps>) => {
			return {
				idRecado: action.payload.idRecado ?? '',
				recado: action.payload.recado ?? '',
				tituloRecado: action.payload.tituloRecado ?? '',
			};
		},
		apagaId: (state) => {
			return initialState;
		},
	},
});

export const { apagaId, capturaId } = idRecadoSlice.actions;

export default idRecadoSlice.reducer;
