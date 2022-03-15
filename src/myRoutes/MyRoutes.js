import React, { Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router, Routes, Navigate, Outlet } from 'react-router-dom';

import Loading from '../components/Loading';
import { publicRoutes, privatRouts } from "./routs"
import { getAuthMe } from "../utils/getAuthMe"

const NotFound = lazy(() => import('../pages/NotFound'));

const PublicRoute = () => {
	const authMe = getAuthMe();
	return authMe ? <Navigate to={'/users'} /> : <Outlet />;
}
const PrivateRoute = () => {
	const authMe = getAuthMe();
	return authMe ? <Outlet /> : <Navigate to={'/login'} />;
}

const MyRoutes = () => {
	return (
		<Router>
			<Suspense fallback={<Loading />}>
				<Routes>
					<Route
						path="/"
						element={<Navigate to="/users" />}
					/>
					{publicRoutes.map(({ path, exact, component: Component }) => (
						<Route
							key={path}
							path={path}
							exact={exact}
							element={<PublicRoute />}
						>
							<Route exact={exact} path={path} element={<Component />} />
						</Route>
					))}

					{privatRouts.map(({ path, exact, component: Component }) => (
						<Route
							key={path}
							path={path}
							exact={exact}
							element={<PrivateRoute />}
						>
							<Route exact={exact} path={path} element={<Component />} />
						</Route>
					))}
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Suspense>
		</Router>
	)
};

export default MyRoutes;
