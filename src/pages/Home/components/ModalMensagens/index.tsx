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

interface ModalMensagensProps {
	context: 'adicionar' | 'editar' | 'excluir';
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalMensagens: React.FC<ModalMensagensProps> = ({
	open,
	setOpen,
	context,
}) => {
	const [titulo, setTitulo] = useState('');
	const [recado, setRecado] = useState('');
	const fechaModal = () => {
		setOpen(false);
	};
	return (
		<Box component={'form'}>
			<Dialog open={open} onClose={fechaModal}>
				{context === 'adicionar' && (
					<>
						<DialogTitle>Adicionar Recado</DialogTitle>
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
							/>
						</DialogContent>
						<DialogActions>
							<Button type="reset" onClick={fechaModal}>
								Cancelar
							</Button>
							<Button type="submit" onClick={fechaModal}>
								Adicionar
							</Button>
						</DialogActions>
					</>
				)}
				{context === 'excluir' && (
					<>
						<DialogTitle>Excluir mensagem</DialogTitle>
						<DialogContent>
							<Typography variant="body1">
								Você deseja mesmo excluir esse recado?
							</Typography>
						</DialogContent>

						<DialogActions>
							<Button
								type="reset"
								onClick={fechaModal}
								variant="outlined"
							>
								Cancelar
							</Button>
							<Button
								type="button"
								onClick={fechaModal}
								color="error"
								variant="contained"
							>
								Excluir
							</Button>
						</DialogActions>
					</>
				)}
			</Dialog>
		</Box>
	);
};
