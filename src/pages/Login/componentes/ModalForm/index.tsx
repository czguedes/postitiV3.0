import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material';
import React, { useState } from 'react';

interface ModalFormProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalForm: React.FC<ModalFormProps> = ({ open, setOpen }) => {
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');

	const fechaModal = () => {
		setOpen(false);
	};
	return (
		<Box component={'form'}>
			<Dialog open={open} onClose={fechaModal}>
				<DialogTitle>Criar Conta</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						name="email"
						id="email"
						label="Email"
						type="email"
						fullWidth
						variant="filled"
						helperText={
							'Insira um endereço de email válido (exemplo@email.com)'
						}
						onChange={(ev) => setEmail(ev.target.value)}
						value={email}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="senha"
						name="senha"
						label="Senha"
						type="password"
						fullWidth
						variant="filled"
						helperText={
							'Uma senha válida possui 6 ou mais caracteres.'
						}
						onChange={(ev) => setSenha(ev.target.value)}
						value={senha}
					/>
				</DialogContent>
				<DialogActions>
					<Button type="reset" onClick={fechaModal}>
						Cancelar
					</Button>
					<Button type="submit" onClick={fechaModal}>
						Increver-se
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};
