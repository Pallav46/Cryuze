import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useUserLogout from '../../../hooks/user/useUserLogout';

const Logout = () => {
  const { data, error, loading } = useUserLogout();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (error) {
        console.error('Error during logout:', error);
        toast.error('Logout failed. Please try again.');
      } else {
        //console.log('Logout successful:', data);
        toast.success('Sucessfully logged out!');
        navigate('/');
      }
    }
  }, [data, error, loading, navigate]);

  return (
    <div>
      {loading ? 'Logging out...' : 'Logout'}
      {error && <div>Error: {error.message}</div>}
    </div>
  );
};

export default Logout;
