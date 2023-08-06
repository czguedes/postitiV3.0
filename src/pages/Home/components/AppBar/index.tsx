import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { logoutUser } from '../../../../store/modules/Usuario/usuarioSlice';

export const PostitiAppbar: React.FC = () => {
	const navigate = useNavigate();
	const usuarioLogado = useAppSelector((s) => s.usuario);
	const dispatch = useAppDispatch();

	function deslogarUsuario() {
		dispatch(logoutUser);
		localStorage.clear();
		navigate('/');
	}

	return (
		<AppBar position="fixed">
			<Toolbar>
				<Typography variant="h6" component="p" sx={{ flexGrow: 1 }}>
					POSTITI | Olá {usuarioLogado.usuario.nome} !
				</Typography>
				<IconButton onClick={deslogarUsuario}>
					<LogoutIcon />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};
