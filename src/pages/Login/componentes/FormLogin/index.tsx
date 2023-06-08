import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ModalForm } from '../ModalForm';

export const FormLogin: React.FC = () => {
	const [open, setOpen] = useState(false);
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');

	const navigate = useNavigate();

	return (
		<>
			<Box component={'form'}>
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
							helperText={'Insira seu email cadastrado'}
							onChange={(ev) => setEmail(ev.target.value)}
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
							helperText={'Insira sua senha'}
							onChange={(ev) => setSenha(ev.target.value)}
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
									onClick={() => navigate('/postiti')}
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
