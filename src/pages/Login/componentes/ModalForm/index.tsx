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

import { useAppDispatch } from '../../../../store/hooks';
import { adicionarUsuario } from '../../../../store/modules/Usuario/usuariosSlice';
import { emailRegex } from '../../../../utils/validations/regexEmail';

interface ModalFormProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalForm: React.FC<ModalFormProps> = ({ open, setOpen }) => {
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');

	const dispatch = useAppDispatch();

	const testeEmail = () => !emailRegex.test(email);

	const fechaModal = () => {
		setOpen(false);
		setTimeout(() => {
			setEmail('');
			setSenha('');
		}, 1000);
	};

	const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		console.log('foi');

		if (!ev.currentTarget.checkValidity()) {
			return;
		}

		dispatch(
			adicionarUsuario({
				email: email,
				senha: senha,
			}),
		);

		fechaModal();
	};

	return (
		<Dialog open={open} onClose={fechaModal}>
			<Box component={'form'} onSubmit={handleSubmit}>
				<DialogTitle>Criar Conta</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						aria-required
						margin="dense"
						name="email"
						id="email"
						label="Email"
						type="email"
						fullWidth
						variant="filled"
						onChange={(ev) => setEmail(ev.currentTarget.value)}
						value={email}
						error={testeEmail() ?? true}
						helperText={testeEmail() && 'Insira um email válido!'}
					/>
					<TextField
						aria-required
						margin="dense"
						id="senha"
						name="senha"
						label="Senha"
						type="password"
						fullWidth
						variant="filled"
						onChange={(ev) => setSenha(ev.currentTarget.value)}
						value={senha}
						error={senha.length < 8 ? true : false}
						helperText={
							senha.length < 8 &&
							'Uma senha válida possui 8 ou mais caracteres!'
						}
					/>
				</DialogContent>
				<DialogActions>
					<Button type="button" onClick={fechaModal}>
						Cancelar
					</Button>
					<Button type="submit">Criar conta</Button>
				</DialogActions>
			</Box>
		</Dialog>
	);
};
