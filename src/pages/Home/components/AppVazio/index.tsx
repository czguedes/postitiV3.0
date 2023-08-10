import { Box, Typography } from '@mui/material';

export const AppVazio = () => {
	return (
		<Box
			margin={'auto'}
			textAlign={'center'}
			padding={'64px'}
			display={'flex'}
			rowGap={2}
			flexDirection={'column'}
			maxHeight={'100%'}
			justifyContent={'center'}
		>
			<Typography variant="h1">👻</Typography>
			<Typography variant="body1" color={'GrayText'}>
				Ops! Parece que não tem nenhuma mensagem a ser mostrada!
			</Typography>
		</Box>
	);
};
