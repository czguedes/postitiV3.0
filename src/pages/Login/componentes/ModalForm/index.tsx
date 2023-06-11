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

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { showNotification } from '../../../../store/modules/notificationSlice';
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
	const select = useAppSelector((state) => state.usuario);
	const testeEmail = () => emailRegex.test(email);

	const fechaModal = () => {
		setOpen(false);
		setTimeout(() => {
			setEmail('');
			setSenha('');
		}, 1000);
	};

	const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();

		const buscaEmail = select.ids.some((id) => id === email);

		if (!ev.currentTarget.checkValidity()) {
			return;
		}

		if (buscaEmail) {
			dispatch(
				showNotification({
					message: 'Email já foi cadastrado!',
					success: false,
				}),
			);
			return;
		}

		if (!testeEmail()) {
			dispatch(
				showNotification({
					message: 'Email inválido!',
					success: false,
				}),
			);
			return;
		}

		if (senha.length < 8) {
			dispatch(
				showNotification({
					message: 'Sua senha deve possuir 8 ou mais caracteres!',
					success: false,
				}),
			);
			return;
		}

		dispatch(
			adicionarUsuario({
				email: email,
				senha: senha,
			}),
		);

		fechaModal();

		dispatch(
			showNotification({
				message: 'Conta criada com sucesso!',
				success: true,
			}),
		);
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
						error={!testeEmail()}
						helperText={
							!testeEmail() ? 'Insira um email válido!' : ''
						}
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
							senha.length < 8 && 'Insira uma senha válida!'
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
