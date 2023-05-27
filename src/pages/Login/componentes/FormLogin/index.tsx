import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import React from 'react';

export const FormLogin: React.FC = () => {
	return (
		<Box component={'form'}>
			<Grid container flexDirection={'column'} gap={2}>
				<Grid item>
					<TextField
						type="email"
						fullWidth
						variant="filled"
						label={'Email'}
						helperText={'Insira seu email cadastrado'}
					/>
				</Grid>
				<Grid item>
					<TextField
						type="password"
						fullWidth
						variant="filled"
						label={'Senha'}
						helperText={'Insira sua senha'}
					/>
				</Grid>
				<Grid item>
					<Grid container flexDirection={'column'} gap={1}>
						<Grid item>
							<Button type="submit" fullWidth variant="contained">
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
								>
									Inscreva-se!
								</Link>
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
};
