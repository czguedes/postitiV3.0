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
import React, { useEffect, useState } from 'react';
import { v4 as geraID } from 'uuid';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { escondeModal } from '../../../../store/modules/ContextoModal/contextoSlice';
import { apagaId } from '../../../../store/modules/ModalMensagens';
import {
	adicionarRecado,
	editarRecado,
	removerRecado,
} from '../../../../store/modules/Recados/recadosSlice';
import { buscarUsuarios } from '../../../../store/modules/Usuario/usuariosSlice';

export const ModalMensagens: React.FC = () => {
	const [titulo, setTitulo] = useState('');
	const [recado, setRecado] = useState('');

	const dispatch = useAppDispatch();
	const { contexto, isOpen } = useAppSelector((state) => state.contexto);

	const recadoSelecionado = useAppSelector((state) => state.idRecado);

	useEffect(() => {
		if (isOpen) {
			if (
				contexto === 'editar' &&
				recadoSelecionado.tituloRecado &&
				recadoSelecionado.recado
			) {
				setTitulo(recadoSelecionado.tituloRecado);
				setRecado(recadoSelecionado.recado);
			}
		}
	}, [recadoSelecionado, contexto, isOpen]);

	const userLogged = useAppSelector(buscarUsuarios).find(
		(item) => item.isLogged === true,
	);

	const fechaModal = () => {
		dispatch(escondeModal());
	};

	const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();

		switch (contexto) {
			case 'adicionar':
				dispatch(
					adicionarRecado({
						id: String(geraID()),
						titulo: titulo,
						mensagem: recado,
						criadoEm: new Date().toLocaleString('pt-Br', {
							dateStyle: 'short',
						}),
						criadoPor: userLogged?.email ?? '',
					}),
				);
				fechaModal();
				break;
			case 'editar':
				//lógica para editar
				if (recadoSelecionado.idRecado) {
					dispatch(
						editarRecado({
							id: recadoSelecionado.idRecado,
							changes: {
								titulo: titulo,
								mensagem: recado,
							},
						}),
					);
				}
				setRecado('');
				setTitulo('');
				dispatch(apagaId());
				fechaModal();

				break;
			case 'excluir':
				//lógica de exclusão
				if (recadoSelecionado.idRecado) {
					dispatch(removerRecado(recadoSelecionado.idRecado));
				}
				dispatch(apagaId());
				fechaModal();
				break;
		}
	};

	return (
		<Dialog open={isOpen} onClose={fechaModal}>
			<Box component={'form'} onSubmit={handleSubmit}>
				<DialogTitle>
					{contexto === 'adicionar' && 'Adicionar recado'}
					{contexto === 'editar' && 'Editar recado'}
					{contexto === 'excluir' && 'Excluir recado'}
				</DialogTitle>
				{contexto !== 'excluir' && (
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

				{contexto === 'excluir' && (
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
