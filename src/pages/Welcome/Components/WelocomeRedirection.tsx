import useLocalStore from '@/stores/useLocalStore';
import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const WelcomeRedirection: FC = () => {
  const { skipFeature } = useLocalStore();
  return <>{skipFeature ? <Navigate to="/start" /> : <Outlet />}</>;
};

export default WelcomeRedirection;
