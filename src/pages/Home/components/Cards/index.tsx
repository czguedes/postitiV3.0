import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Grid,
	IconButton,
	Typography,
} from '@mui/material';
import React from 'react';

import { useAppDispatch } from '../../../../store/hooks';
import { mostraModal } from '../../../../store/modules/ContextoModal/contextoSlice';
import { ModalMensagens } from '../ModalMensagens';

export const PostitiCards: React.FC = () => {
	const dispatch = useAppDispatch();

	const showModal = (tipo: string) => {
		switch (tipo) {
			case 'editar':
				dispatch(mostraModal('editar')).payload;
				break;
			case 'excluir':
				dispatch(mostraModal('excluir')).payload;
				break;
		}
		return <ModalMensagens />;
	};

	return (
		<>
			<Grid item xs={12} md={6} lg={4}>
				<Card variant="outlined">
					<CardHeader title={'Título'} subheader={'xx/xx/xxxx'} />

					<CardContent>
						<Typography>
							Lorem ipsum dolor sit, amet consectetur adipisicing
							elit. Officia, voluptates!
						</Typography>
					</CardContent>
					<CardActions>
						<IconButton onClick={() => showModal('editar')}>
							<EditNoteIcon />
						</IconButton>
						<IconButton onClick={() => showModal('excluir')}>
							<DeleteIcon />
						</IconButton>
					</CardActions>
				</Card>
			</Grid>
			<ModalMensagens />
		</>
	);
};
