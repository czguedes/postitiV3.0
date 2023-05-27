import { Container, Grid, Typography } from '@mui/material';
import React from 'react';

import { FormLogin } from './componentes/FormLogin';

export const Login: React.FC = () => {
	return (
		<>
			<Container>
				<Grid container>
					<Grid item xs={12} md={8}>
						<Typography variant="h1" textAlign={'center'}>
							Postiti
						</Typography>
					</Grid>
					<Grid item xs={12} md={4}>
						<FormLogin />
					</Grid>
				</Grid>
			</Container>
		</>
	);
};
