import AddIcon from '@mui/icons-material/Add';
import { Box, Container, Fab, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { mostraModal } from '../../store/modules/ContextoModal/contextoSlice';
import { listaTodosRecados } from '../../store/modules/Recados/recadosSlice';
import { buscarUsuarios } from '../../store/modules/Usuario/usuariosSlice';
import { SnackBarComp } from '../../utils/shared/Snackbar';
import { PostitiAppbar } from './components/AppBar';
import { PostitiCards } from './components/Cards';
import { ModalMensagens } from './components/ModalMensagens';

export const Home: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const selectRecados = useAppSelector(listaTodosRecados);
	const userLogged = useAppSelector(buscarUsuarios).find(
		(item) => item.isLogged === true,
	);

	useEffect(() => {
		if (!userLogged) {
			navigate('/');
		}
	}, [navigate, userLogged]);

	return (
		<>
			<Box
				display={'flex'}
				flexDirection={'column'}
				width={'100%'}
				gap={4}
			>
				<PostitiAppbar />
				<Container sx={{ marginY: 4 }}>
					<Grid container spacing={2}>
						{selectRecados
							.filter(
								(item) => item.criadoPor === userLogged?.email,
							)
							.map(({ criadoEm, mensagem, titulo, id }) => (
								<PostitiCards
									data={criadoEm}
									recado={mensagem}
									titulo={titulo}
									key={id}
									id={id}
								/>
							))}
					</Grid>
				</Container>
			</Box>
			<Fab
				color="primary"
				aria-label="add"
				sx={{ position: 'fixed', bottom: '24px', right: '24px' }}
				onClick={() => {
					dispatch(mostraModal('adicionar'));
				}}
			>
				<AddIcon />
			</Fab>
			<SnackBarComp />
			<ModalMensagens />
		</>
	);
};
