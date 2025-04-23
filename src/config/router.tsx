// hostory 模式路由 // hash模式
import { createHashRouter, Navigate, Outlet } from 'react-router-dom';
import ErrorPage from '@/Components/ErrorPage';
import StartPage from '@/pages/StartPage/inedx';
import SignInPage from '@/pages/SignIn/index';
import WelcomeRedirection from '@/pages/Welcome/Components/WelocomeRedirection';
// import ItemCreate from '@/pages/Item/components/Create';
import Welcome from '../pages/Welcome';
import ItemList from '@/pages/Item';
import ItemCreate from '@/pages/Item/Create';
import request, { Result } from './request';
import { User } from '@/api/types/common';
import { ErrorUnauthorized } from '@/utils/errors';

const router = createHashRouter([
  {
    path: '/',
    element: <Outlet />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/welcome" replace />,
      },
      {
        path: '/welcome',
        element: <WelcomeRedirection />,
        children: [
          {
            index: true,
            element: <Navigate to="/welcome/1" replace />,
          },
          {
            path: ':id',
            element: <Welcome />,
          },
        ],
      },
      {
        path: '/sign-in',
        element: <SignInPage />,
      },
    ],
  },
  {
    path: '/',
    element: <Outlet />,
    errorElement: <ErrorPage />,
    loader: async () => {
      return await request.get<Result<User>>('/me').catch((e) => {
        if (e.response.status === 401) throw new ErrorUnauthorized();
        throw e;
      });
    },
    children: [
      {
        path: '/start',
        element: <StartPage />,
      },
      {
        path: '/items',
        element: <Outlet />,
        children: [
          {
            path: '',
            element: <ItemList />,
          },
          {
            path: 'create',
            element: <ItemCreate />,
          },
        ],
      },
    ],
  },
]);

export default router;
