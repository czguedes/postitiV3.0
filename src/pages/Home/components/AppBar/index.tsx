import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const PostitiAppbar: React.FC = () => {
	const navigate = useNavigate();
	return (
		<Box>
			<AppBar position="fixed">
				<Toolbar>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
					>
						POSTITI
					</Typography>
					<IconButton onClick={() => navigate('/')}>
						<LogoutIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
