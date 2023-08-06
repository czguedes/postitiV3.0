import AddIcon from '@mui/icons-material/Add';
import InboxIcon from '@mui/icons-material/Inbox';
import { Box, Container, Divider, Fab, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { mostraModal } from '../../store/modules/ContextoModal/contextoSlice';
import { showNotification } from '../../store/modules/notificationSlice';
import { listaTodosRecados } from '../../store/modules/Recados/recadosSlice';
import {
	logoutUser,
	setUser,
	UsuarioLogado,
} from '../../store/modules/Usuario/usuarioSlice';
import { Loading } from '../../utils/shared/Loading';
import { SnackBarComp } from '../../utils/shared/Snackbar';
import { PostitiAppbar } from './components/AppBar';
import { PostitiCards } from './components/Cards';
import { ModalMensagens } from './components/ModalMensagens';

export const Home: React.FC = () => {
	const [mostraArquivados, setMostraArquivados] = useState(false);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const selector = useAppSelector((s) => s.recados);

	const selectRecados = useAppSelector(listaTodosRecados);
	const selectUser = useAppSelector((s) => s.usuario);

	useEffect(() => {
		const userLogged: UsuarioLogado = JSON.parse(
			localStorage.getItem('userLogged') ?? '',
		);

		if (!userLogged) {
			dispatch(
				showNotification({
					success: false,
					message: 'You shall not pass!',
				}),
			);
			dispatch(logoutUser);
			localStorage.clear();
			navigate('/');
		}

		dispatch(setUser(userLogged));

		//lógica de montar o site
	}, [dispatch, navigate]);

	return (
		<>
			<Box
				display={'flex'}
				flexDirection={'column'}
				width={'100%'}
				position={'fixed'}
				top={0}
			>
				<PostitiAppbar />

				<Container sx={{ marginTop: '64px' }} component={'main'} fixed>
					<Typography variant="h6" color={'primary'} paddingY={'8px'}>
						{mostraArquivados ? 'Arquivados' : 'Seus recados'}
					</Typography>

					<Divider />

					<Grid container spacing={2}>
						<Grid item>
							{selectRecados.length === 0
								? 'Nada aqui!'
								: selectRecados
										.filter(
											(item) =>
												item.criadoPor ===
												selectUser.usuario.id,
										)
										.map(
											({
												criadoEm,
												recado,
												titulo,
												id,
												arquivado,
											}) => (
												<PostitiCards
													data={criadoEm}
													recado={recado}
													titulo={titulo}
													key={id}
													id={id}
													arquivado={arquivado}
												/>
											),
										)}
						</Grid>
					</Grid>
				</Container>
			</Box>
			<Box
				sx={{
					position: 'fixed',
					bottom: '24px',
					right: '24px',
					display: 'flex',
					flexDirection: 'column-reverse',
					gap: 2,
				}}
			>
				<Fab
					color="primary"
					aria-label="add"
					onClick={() => {
						dispatch(mostraModal('adicionar'));
					}}
					disabled={mostraArquivados}
				>
					<AddIcon />
				</Fab>
				<Fab
					color={mostraArquivados ? 'primary' : 'default'}
					aria-label="archive"
					onClick={() => {
						setMostraArquivados(!mostraArquivados);
					}}
				>
					<InboxIcon />
				</Fab>
			</Box>

			<SnackBarComp />
			<ModalMensagens />
			<Loading open={selector.loading} />
		</>
	);
};
