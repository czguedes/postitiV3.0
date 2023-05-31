import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../..';
import RecadoState from '../../types/Recados';

const recadosAdapter = createEntityAdapter<RecadoState>({
    selectId: (state) => state.id,
});

export const { selectAll } = recadosAdapter.getSelectors(
    (global: RootState) => global.recados,
);

const recadosSlice = createSlice({
    name: 'recado',
    initialState: recadosAdapter.getInitialState(),
    reducers: {
        adicionarRecado: recadosAdapter.addOne,
        removeRecado: recadosAdapter.removeOne,
        editarRecado: recadosAdapter.updateOne,
        lerRecado: recadosAdapter.setOne,
    },
});

export const { adicionarRecado, editarRecado, lerRecado, removeRecado } =
    recadosSlice.actions;

export default recadosSlice.reducer;
