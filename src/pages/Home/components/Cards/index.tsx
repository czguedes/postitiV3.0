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

interface PostitiCardsProps {
	titulo: string;
	recado: string;
	data: string;
}

export const PostitiCards: React.FC<PostitiCardsProps> = ({
	data,
	recado,
	titulo,
}) => {
	const dispatch = useAppDispatch();

	const showModal = (tipo: string) => {
		switch (tipo) {
			case 'editar':
				dispatch(mostraModal('editar'));
				break;
			case 'excluir':
				dispatch(mostraModal('excluir'));
				break;
		}
		return <ModalMensagens />;
	};

	return (
		<>
			<Grid item xs={12} md={6} lg={4}>
				<Card variant="outlined">
					<CardHeader title={titulo} subheader={data} />

					<CardContent>
						<Typography>{recado}</Typography>
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
