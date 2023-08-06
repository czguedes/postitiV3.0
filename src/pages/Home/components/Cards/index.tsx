import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
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
import { capturaId } from '../../../../store/modules/ModalMensagens';

interface PostitiCardsProps {
	titulo: string;
	recado: string;
	data: string;
	id: string;
	arquivado: boolean;
}

export const PostitiCards: React.FC<PostitiCardsProps> = ({
	data,
	recado,
	titulo,
	id,
	arquivado,
}) => {
	const dispatch = useAppDispatch();

	const showModal = (tipo: string) => {
		switch (tipo) {
			case 'editar':
				dispatch(mostraModal('editar'));
				dispatch(
					capturaId({
						idRecado: id,
						recado: recado,
						tituloRecado: titulo,
					}),
				);
				break;
			case 'excluir':
				dispatch(mostraModal('excluir'));
				dispatch(
					capturaId({
						idRecado: id,
						recado: recado,
						tituloRecado: titulo,
					}),
				);
				break;
			case 'arquivar':
			//lógica p mudar estado do recado
		}
	};

	return (
		<>
			<Grid item xs={12} md={6} lg={4}>
				<Card variant="outlined" id={id}>
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
						<IconButton onClick={() => showModal('arquivar')}>
							{arquivado ? (
								<BookmarkIcon />
							) : (
								<BookmarkBorderIcon />
							)}
						</IconButton>
					</CardActions>
				</Card>
			</Grid>
		</>
	);
};
