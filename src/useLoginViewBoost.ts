// src/useLoginViewBoost.ts
import { useEffect } from 'react';

interface UseLoginViewBoostProps {
  onSuccess: (code: string) => void;
  onFailed: (error: string) => void;
}

const useLoginViewBoost = ({ onSuccess, onFailed }: UseLoginViewBoostProps) => {
  const login = ({
    redirectUrl,
    clientKey,
    scope,
  }: {
    redirectUrl: string;
    clientKey: string;
    scope: string;
  }) => {
    if (!redirectUrl) {
      console.error('redirectUrl is required');
      onFailed('redirectUrl is required');
      return;
    }

    const loginUrl = `https://account.viewboost.xyz/?redirectUrl=${redirectUrl}&clientKey=${clientKey}&responseType=code&scope=${scope}`;
    window.open(loginUrl);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      localStorage.setItem('code', code);
      localStorage.setItem('forceLogin', 'true');
      window.close();
    }
  }, []);

  useEffect(() => {
    const handleStorageEvent = (event: StorageEvent) => {
      if (event.key === 'forceLogin' && event.newValue === 'true') {
        localStorage.removeItem('forceLogin');
        const code = localStorage.getItem('code');

        if (code) {
          onSuccess(code);
        } else {
          onFailed('Login failed');
        }
      }
    };
git 
    window.addEventListener('storage', handleStorageEvent);

    return () => {
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, [onSuccess, onFailed]);

  return { login };
};

export default useLoginViewBoost;
