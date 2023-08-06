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
import { showNotification } from '../../../../store/modules/notificationSlice';
import { cadastrarUsuario } from '../../../../store/modules/Usuario/usuarioSlice';
import { emailRegex } from '../../../../utils/validations/regexEmail';

interface ModalFormProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalForm: React.FC<ModalFormProps> = ({ open, setOpen }) => {
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');
	const [nome, setNome] = useState('');

	const dispatch = useAppDispatch();
	const testeEmail = () => emailRegex.test(email);

	const fechaModal = () => {
		setOpen(false);
		setTimeout(() => {
			setEmail('');
			setSenha('');
			setNome('');
		}, 1000);
	};

	const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();

		if (!ev.currentTarget.checkValidity()) {
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

		const novoUsuario = {
			nome: nome,
			email: email,
			senha: senha,
		};

		dispatch(cadastrarUsuario(novoUsuario));

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
						name="nome"
						id="nome"
						label="Nome de Usuário"
						type="text"
						fullWidth
						variant="filled"
						onChange={(ev) => setNome(ev.currentTarget.value)}
						value={nome}
						error={nome.length <= 0 ? true : false}
						helperText={
							nome.length <= 0 && 'Insira um nome válido!'
						}
					/>
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
