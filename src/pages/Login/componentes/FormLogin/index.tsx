import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { showNotification } from '../../../../store/modules/notificationSlice';
import { loginUsuario } from '../../../../store/modules/Usuario/usuarioSlice';
import { ModalForm } from '../ModalForm';

export const FormLogin: React.FC = () => {
	const [open, setOpen] = useState(false);
	const [isError, setIsError] = useState(false);
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const usuarioState = useAppSelector((state) => state.usuario);

	useEffect(() => {
		if (usuarioState.usuario.isLogged) {
			navigate('/postiti');
		}
	}, [navigate, usuarioState]);

	const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();

		const login = {
			email,
			senha,
		};

		if (!email || !senha) {
			setIsError(true);
			dispatch(
				showNotification({
					message: 'Necessário um email e uma senha válidos.',
					success: false,
				}),
			);
			return;
		}

		dispatch(loginUsuario(login));
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
							helperText={
								isError ? 'Insira um email cadastrado' : ''
							}
							onChange={(ev) => setEmail(ev.currentTarget.value)}
							value={email}
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
							helperText={isError ? 'Insira sua senha' : ''}
							onChange={(ev) => setSenha(ev.currentTarget.value)}
							value={senha}
						/>
					</Grid>
					<Grid item>
						<Grid container flexDirection={'column'} gap={4}>
							<Grid item>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									disabled={usuarioState.loading}
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
