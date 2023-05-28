import AddIcon from '@mui/icons-material/Add';
import { Box, Container, Fab, Grid } from '@mui/material';
import React from 'react';

import { PostitiAppbar } from './components/AppBar';
import { PostitiCards } from './components/Cards';

export const Home: React.FC = () => {
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
						<PostitiCards />
						<PostitiCards />
						<PostitiCards />
						<PostitiCards />
					</Grid>
				</Container>
			</Box>
			<Fab
				color="primary"
				aria-label="add"
				sx={{ position: 'fixed', bottom: '24px', right: '24px' }}
			>
				<AddIcon />
			</Fab>
		</>
	);
};
