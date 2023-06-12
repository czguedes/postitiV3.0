import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
	buscarUsuarios,
	logaUsuario,
} from '../../../../store/modules/Usuario/usuariosSlice';

export const PostitiAppbar: React.FC = () => {
	const navigate = useNavigate();
	const select = useAppSelector;
	const dispatch = useAppDispatch();
	const usuarioLogado = select(buscarUsuarios).find(
		(item) => item.isLogged === true,
	);

	const desloga = () => {
		if (!usuarioLogado) {
			console.log('Algo de errado não está certo!');
			return;
		}

		dispatch(
			logaUsuario({
				id: usuarioLogado?.email,
				changes: { isLogged: false },
			}),
		);

		navigate('/');
	};
	return (
		<Box>
			<AppBar position="fixed">
				<Toolbar>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
					>
						POSTITI
					</Typography>
					<IconButton onClick={desloga}>
						<LogoutIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
