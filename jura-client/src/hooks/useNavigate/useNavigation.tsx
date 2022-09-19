import { useNavigate } from 'react-router-dom';

export const useNavigation = () => {
  const navigate = useNavigate();

  return {
    toSignin: () => navigate('/signin'),
    toSignup: () => navigate('/signup'),
    toDashboard: () => navigate('/dashboard'),
    toHome: () => navigate('/')
  };
};
