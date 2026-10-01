import React, { useState, useEffect } from 'react';
import { adminAuth } from './services/authService';
import { AuthSession, AdminUser } from './types';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';

interface AdminRootProps {
  onExit: () => void;
}

export const AdminRoot: React.FC<AdminRootProps> = ({ onExit }) => {
  // Determine if route is dashboard: /admin/dashboard or #/admin/dashboard or #admin/dashboard
  const isDashboardPath = () => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname;
    const hash = window.location.hash;
    return (
      path === '/admin/dashboard' ||
      path.startsWith('/admin/dashboard') ||
      hash.includes('dashboard')
    );
  };

  const [currentRoute, setCurrentRoute] = useState<'login' | 'dashboard'>(() =>
    isDashboardPath() ? 'dashboard' : 'login'
  );

  const [session, setSession] = useState<AuthSession | null>(() => adminAuth.getCurrentSession());

  useEffect(() => {
    const handleLocationChange = () => {
      if (isDashboardPath()) {
        setCurrentRoute('dashboard');
      } else {
        setCurrentRoute('login');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const handleLoginSuccess = (newSession: AuthSession) => {
    setSession(newSession);
    window.history.pushState(null, '', '/admin/dashboard');
    setCurrentRoute('dashboard');
  };

  const handleNavigateToDashboard = () => {
    // For development/preview mode: direct navigation to /admin/dashboard without credentials
    window.history.pushState(null, '', '/admin/dashboard');
    setCurrentRoute('dashboard');
  };

  const handleLogout = () => {
    adminAuth.logout();
    setSession(null);
    window.history.pushState(null, '', '/admin');
    setCurrentRoute('login');
  };

  // Default admin user for dashboard viewing
  const activeUser: AdminUser = session?.user || {
    id: 'adm_preview',
    email: 'admin@laranastore.om',
    name: 'إدارة لارانا ستور',
    role: 'super_admin',
  };

  // Route 1: /admin/dashboard
  if (currentRoute === 'dashboard') {
    return (
      <AdminDashboard
        user={activeUser}
        onLogout={handleLogout}
        onViewStore={onExit}
      />
    );
  }

  // Route 2: /admin
  return (
    <AdminLogin
      onLoginSuccess={handleLoginSuccess}
      onPreviewDashboard={handleNavigateToDashboard}
      onExitAdmin={onExit}
    />
  );
};
