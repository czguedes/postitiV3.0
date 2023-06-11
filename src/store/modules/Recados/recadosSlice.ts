import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../..';
import RecadoState from '../../types/Recados';

const recadosAdapter = createEntityAdapter<RecadoState>({
    selectId: (state) => state.id,
});

export const { selectAll: listaTodosRecados, selectById: listaPorId } =
    recadosAdapter.getSelectors((global: RootState) => global.recados);

const recadosSlice = createSlice({
    name: 'recados',
    initialState: recadosAdapter.getInitialState(),
    reducers: {
        adicionarRecado: recadosAdapter.addOne,
        removerRecado: recadosAdapter.removeOne,
        editarRecado: recadosAdapter.updateOne,
    },
});

export const { adicionarRecado, editarRecado, removerRecado } =
    recadosSlice.actions;

export default recadosSlice.reducer;
