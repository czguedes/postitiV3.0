import AddIcon from '@mui/icons-material/Add';
import { Box, Container, Fab, Grid } from '@mui/material';
import React from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { mostraModal } from '../../store/modules/ContextoModal/contextoSlice';
import { listaTodosRecados } from '../../store/modules/Recados/recadosSlice';
import { SnackBarComp } from '../../utils/shared/Snackbar';
import { PostitiAppbar } from './components/AppBar';
import { PostitiCards } from './components/Cards';
import { ModalMensagens } from './components/ModalMensagens';

export const Home: React.FC = () => {
	const dispatch = useAppDispatch();
	const selectRecados = useAppSelector(listaTodosRecados);

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
						{selectRecados.map(
							({ criadoEm, mensagem, titulo, id, criadoPor }) => (
								<PostitiCards
									data={criadoEm}
									recado={mensagem}
									titulo={titulo}
									key={criadoPor}
									id={id}
								/>
							),
						)}
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
