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

export const PostitiCards: React.FC = () => {
	return (
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
					<IconButton>
						<EditNoteIcon />
					</IconButton>
					<IconButton>
						<DeleteIcon />
					</IconButton>
				</CardActions>
			</Card>
		</Grid>
	);
};
