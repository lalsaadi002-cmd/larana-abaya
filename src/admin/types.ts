export type AdminSection =
  | 'home'
  | 'products'
  | 'add-product'
  | 'categories'
  | 'orders'
  | 'settings';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'manager' | 'editor';
  lastLogin?: string;
}

export interface AuthSession {
  token: string;
  user: AdminUser;
  expiresAt: number;
}

export interface DashboardMetric {
  title: string;
  value: number | string;
  change?: string;
  subtitle: string;
  iconName: string;
}
