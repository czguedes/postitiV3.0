import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { showNotification } from '../../../../store/modules/notificationSlice';
import { buscarUsuarios } from '../../../../store/modules/Usuario/usuariosSlice';
import { ModalForm } from '../ModalForm';

export const FormLogin: React.FC = () => {
	const [open, setOpen] = useState(false);
	const [isError, setIsError] = useState(false);

	const navigate = useNavigate();
	const buscaUsuario = useAppSelector(buscarUsuarios);
	const dispatch = useAppDispatch();

	const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		const loginEmail = ev.currentTarget.email.value;
		const loginSenha = ev.currentTarget.senha.value;

		if (!ev.currentTarget.checkValidity()) {
			return;
		}

		const confirmaDados = buscaUsuario.some((item) => {
			if (item.email === loginEmail && item.senha === loginSenha) {
				item.isLogged = true;
				return true;
			}
			return false;
		});

		if (!confirmaDados) {
			setIsError(true);
			dispatch(
				showNotification({
					message: 'Email ou senha inválidos!',
					success: false,
				}),
			);
			return;
		}

		navigate('/postiti');
	};

	return (
		<>
			<Box component={'form'} onSubmit={handleSubmit}>
				<Grid container flexDirection={'column'} gap={2}>
					<Grid item>
						<TextField
							autoFocus
							aria-required
							type="email"
							fullWidth
							variant="filled"
							label={'Email'}
							id="email"
							name="email"
							error={isError}
							helperText="Insira um email cadastrado"
						/>
					</Grid>
					<Grid item>
						<TextField
							aria-required
							type="password"
							fullWidth
							variant="filled"
							id="senha"
							name="senha"
							label={'Senha'}
							error={isError}
							helperText={'Insira sua senha'}
						/>
					</Grid>
					<Grid item>
						<Grid container flexDirection={'column'} gap={4}>
							<Grid item>
								<Button
									type="submit"
									fullWidth
									variant="contained"
								>
									Entrar
								</Button>
							</Grid>
							<Grid item>
								<Typography textAlign={'center'}>
									Não possui uma conta?{' '}
									<Link
										component={'button'}
										type="button"
										sx={{
											textDecoration: 'none',
										}}
										onClick={() => setOpen(true)}
									>
										Inscreva-se!
									</Link>
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Box>
			<ModalForm open={open} setOpen={setOpen} />
		</>
	);
};
