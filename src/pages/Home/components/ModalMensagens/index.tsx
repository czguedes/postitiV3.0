import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Typography,
} from '@mui/material';
import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { escondeModal } from '../../../../store/modules/ContextoModal/contextoSlice';

export const ModalMensagens: React.FC = () => {
	const dispatch = useAppDispatch();
	const select = useAppSelector((state) => state.contexto);
	const context = select.contexto;

	const fechaModal = () => {
		dispatch(escondeModal());
	};

	const [titulo, setTitulo] = useState('');
	const [recado, setRecado] = useState('');

	return (
		<Dialog open={select.isOpen} onClose={fechaModal}>
			<Box component={'form'}>
				<DialogTitle>
					{context === 'adicionar' && 'Adicionar recado'}
					{context === 'editar' && 'Editar recado'}
					{context === 'excluir' && 'Excluir recado'}
				</DialogTitle>
				{context !== 'excluir' && (
					<>
						<DialogContent>
							<TextField
								autoFocus
								margin="dense"
								name="titulo"
								id="titulo"
								label="Título"
								type="text"
								fullWidth
								variant="filled"
								onChange={(ev) => setTitulo(ev.target.value)}
								value={titulo}
							/>
							<TextField
								autoFocus
								margin="dense"
								id="recado"
								name="recado"
								label="Escreva aqui seu recado..."
								type="text"
								fullWidth
								variant="filled"
								onChange={(ev) => setRecado(ev.target.value)}
								value={recado}
								multiline
								minRows={3}
							/>
						</DialogContent>
						<DialogActions>
							<Button
								type="button"
								onClick={fechaModal}
								variant="outlined"
							>
								Cancelar
							</Button>
							<Button
								type="submit"
								color="success"
								variant="contained"
							>
								Adicionar
							</Button>
						</DialogActions>
					</>
				)}

				{context === 'excluir' && (
					<>
						<DialogContent>
							<Typography variant="body1">
								Você deseja mesmo excluir esse recado?
							</Typography>
						</DialogContent>

						<DialogActions>
							<Button
								type="button"
								onClick={fechaModal}
								variant="outlined"
							>
								Cancelar
							</Button>
							<Button
								type="button"
								color="error"
								variant="contained"
							>
								Excluir
							</Button>
						</DialogActions>
					</>
				)}
			</Box>
		</Dialog>
	);
};
