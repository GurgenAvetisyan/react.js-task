import { lazy } from 'react';

export const privatRouts = [
	{
		path: "/users",
		component: lazy(() => import('../pages/UserList')),
		exact: true
	},
	{
		path: "/users/:id",
		component: lazy(() => import('../pages/MoreUserInfo')),
		exact: true
	},
];

export const publicRoutes = [
	{
		path: "/login",
		component: lazy(() => import('../pages/Login')),
		exact: true
	},
];
