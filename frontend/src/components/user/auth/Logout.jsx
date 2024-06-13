import React, { useEffect } from 'react';
import useLogout from "../../../hooks/user/useUserLogout";

const Logout = () => {
  const { logout } = useLogout();

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return null;
};

export default Logout;