import { ErrorUnauthorized } from '@/utils/errors';
import { FC } from 'react';
import { Navigate, useLocation, useRouteError } from 'react-router-dom';

const ErrorPage: FC = () => {
  const error = useRouteError() as Error;
  const loc = useLocation()
  const from = encodeURIComponent(`${loc.pathname}${loc.search}`)
  if (error instanceof ErrorUnauthorized) {
    return <Navigate to={`/sign-in?from=${from}`} replace />
  } else {
    return <div>未知错误</div>
  }
};
export default ErrorPage;
