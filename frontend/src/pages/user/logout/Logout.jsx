import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useUserLogout from '../../../hooks/user/useUserLogout';

const Logout = () => {
  const { loading, logout } = useUserLogout();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      logout()
      toast.success("Logout sucessfully");
      navigate("/")
    }
  }, [loading, logout, navigate]);

  return (
    <div>
      {loading ? 'Logging out...' : 'Logout'}
    </div>
  );
};

export default Logout;
