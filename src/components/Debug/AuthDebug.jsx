import React from 'react';
import { useAuth } from '../../Context/auth';
import { useCart } from '../../Context/cart';

const AuthDebug = () => {
  const { auth, authLoading } = useAuth();
  const { canAccessCart } = useCart();

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '15px',
      borderRadius: '8px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '300px'
    }}>
      <h4>Auth Debug Info:</h4>
      <p><strong>Auth Loading:</strong> {String(authLoading)}</p>
      <p><strong>Auth User:</strong> {auth?.user ? JSON.stringify(auth.user, null, 2) : 'null'}</p>
      <p><strong>Auth Token:</strong> {auth?.token ? 'Present' : 'null'}</p>
      <p><strong>Can Access Cart:</strong> {String(canAccessCart())}</p>
      <p><strong>User ID:</strong> {auth?.user?.id || 'undefined'}</p>
      <p><strong>LocalStorage Auth:</strong></p>
      <pre style={{ fontSize: '10px', whiteSpace: 'pre-wrap' }}>
        {localStorage.getItem('auth') || 'null'}
      </pre>
    </div>
  );
};

export default AuthDebug;