import React, { useEffect } from 'react';
import useProviderLogout from '../../../hooks/provider/useProviderLogout';

const ProviderLogout = () => {
  const { logout, loading } = useProviderLogout();

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div>{loading ? 'Logging out...' : 'ProviderLogout'}</div>
  );
}

export default ProviderLogout;
