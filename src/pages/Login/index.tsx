import { Container, Grid, Typography } from '@mui/material';
import React from 'react';

import { SnackBarComp } from '../../utils/shared/Snackbar';
import { FormLogin } from './componentes/FormLogin';

export const Login: React.FC = () => {
	return (
		<>
			<Container>
				<Grid container alignItems={'center'} spacing={4}>
					<Grid item xs={12} md={7} textAlign={'center'}>
						<Typography variant="h1">Postiti</Typography>
						<Typography variant="body1">
							Anote. Organize.
						</Typography>
					</Grid>
					<Grid item xs={12} md={5}>
						<FormLogin />
					</Grid>
				</Grid>
				<SnackBarComp />
			</Container>
		</>
	);
};
