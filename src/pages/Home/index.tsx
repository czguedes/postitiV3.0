import AddIcon from '@mui/icons-material/Add';
import InboxIcon from '@mui/icons-material/Inbox';
import { Box, Container, Divider, Fab, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { mostraModal } from '../../store/modules/ContextoModal/contextoSlice';
import { showNotification } from '../../store/modules/notificationSlice';
import {
	listarRecados,
	listaTodosRecados,
	refresh,
} from '../../store/modules/Recados/recadosSlice';
import {
	logoutUser,
	setUser,
	UsuarioLogado,
} from '../../store/modules/Usuario/usuarioSlice';
import { Loading } from '../../utils/shared/Loading';
import { SnackBarComp } from '../../utils/shared/Snackbar';
import { PostitiAppbar } from './components/AppBar';
import { AppVazio } from './components/AppVazio';
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
		dispatch(
			listarRecados({
				id: selectUser.usuario.id,
				arquivado: mostraArquivados,
			}),
		);
	}, [dispatch, mostraArquivados, navigate, selectUser.usuario.id]);

	return (
		<>
			<Box
				display={'flex'}
				flexDirection={'column'}
				width={'100%'}
				top={0}
			>
				<PostitiAppbar />

				<Container
					sx={{ position: 'fixed', top: '56px', bgcolor: 'skyblue' }}
				>
					<Typography
						variant="h6"
						color={'primary'}
						paddingY={'8px'}
						marginTop={'8px'}
					>
						{mostraArquivados ? 'Arquivados' : 'Seus recados'}
					</Typography>

					<Divider />
				</Container>

				<Container
					sx={{
						marginTop: '113px',
						paddingBottom: '24px',
					}}
					component={'main'}
					fixed
				>
					<Grid container spacing={2}>
						{selectRecados.length === 0 || !selectRecados ? (
							<AppVazio />
						) : (
							selectRecados
								.filter(
									(item) =>
										item.arquivado === mostraArquivados &&
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
								)
						)}
					</Grid>
				</Container>
				<Container
					sx={{
						position: 'fixed',
						bottom: 0,
						paddingBottom: '16px',
						bgcolor: 'skyblue',
					}}
				>
					<Divider />
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
						dispatch(
							listarRecados({
								id: selectUser.usuario.id,
								arquivado: mostraArquivados,
							}),
						);
						dispatch(refresh);
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
