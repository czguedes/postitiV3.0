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
	const [titulo, setTitulo] = useState('');
	const [recado, setRecado] = useState('');

	const dispatch = useAppDispatch();
	const select = useAppSelector((state) => state.contexto);
	const context = select.contexto;

	const selector = useAppSelector;

	const fechaModal = () => {
		dispatch(escondeModal());
		setTimeout(() => {
			setTitulo('');
			setRecado('');
		}, 1000);
	};

	const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();

		// switch (context) {
		// 	case 'adicionar':
		// 		dispatch(
		// 			adicionarRecado({
		// 				id: String(geraID()),
		// 				titulo: titulo,
		// 				mensagem: recado,
		// 				criadoEm: new Date().toLocaleString('pt-Br', {
		// 					dateStyle: 'short',
		// 				}),
		// 				criadoPor: 'fulano',
		// 			}),
		// 		);
		// 		fechaModal();
		// 		break;
		// 	case 'editar':
		// 		//lógica para editar

		// 		break;
		// 	case 'excluir':
		// 		//lógica de exclusão
		// 		break;
		// }
	};

	return (
		<Dialog open={select.isOpen} onClose={fechaModal}>
			<Box component={'form'} onSubmit={handleSubmit}>
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
								Salvar
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
								type="submit"
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
