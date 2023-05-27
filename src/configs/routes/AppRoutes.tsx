import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Home } from '../../pages/Home';
import { Login } from '../../pages/Login';
import Background from '../Layout';

const AppRoutes: React.FC = () => {
	return (
		<Background>
			<BrowserRouter>
				<Routes>
					<Route path="*" element={<Navigate to={'/'} />} />
					<Route path="/" element={<Login />} />
					<Route path="/postiti" element={<Home />} />
				</Routes>
			</BrowserRouter>
		</Background>
	);
};

export default AppRoutes;
