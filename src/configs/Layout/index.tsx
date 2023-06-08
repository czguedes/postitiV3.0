import { Box } from '@mui/material';

interface BackgroundProps {
	children: React.ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
	return (
		<Box
			minWidth={'100vw'}
			bgcolor={'skyblue'}
			zIndex={-1}
			minHeight={'100vh'}
			display={'flex'}
			alignItems={'center'}
		>
			{children}
		</Box>
	);
};

export default Background;

Math.random();
