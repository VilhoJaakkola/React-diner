import { useCallback, useEffect, useRef, useState } from 'react';

import { AuthContext } from './auth-context';

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | null>(null);
  const logoutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const login = useCallback((uid: string, token: string, expirationDate?: Date) => {
    setToken(token);
    setUserId(uid);
    const expiration = expirationDate ?? new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(expiration);
    localStorage.setItem(
      'userData',
      JSON.stringify({ userId: uid, token, expiration: expiration.toISOString() }),
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('userData') ?? 'null');
    if (stored?.token && new Date(stored.expiration) > new Date()) {
      login(stored.userId, stored.token, new Date(stored.expiration));
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer.current = setTimeout(logout, remainingTime);
    } else {
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
    }
  }, [token, logout, tokenExpirationDate]);

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, token, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
