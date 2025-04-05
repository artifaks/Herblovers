import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

// Create a simple spinner component since we don't have the ui/spinner
const Spinner: React.FC<{ size?: string }> = ({ size = 'md' }) => {
  const sizeClass = size === 'lg' ? 'h-8 w-8' : 'h-4 w-4';
  return (
    <div className="animate-spin rounded-full border-t-2 border-b-2 border-primary" 
      style={{ width: size === 'lg' ? '2rem' : '1rem', height: size === 'lg' ? '2rem' : '1rem' }}>
    </div>
  );
};

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false 
}) => {
  const { isAuthenticated, isLoading, isAdminUser, user } = useAuth();

  console.log('ProtectedRoute - Auth State:', { isAuthenticated, isLoading, isAdminUser });
  console.log('ProtectedRoute - User:', user);
  console.log('ProtectedRoute - requireAdmin:', requireAdmin);

  if (isLoading) {
    console.log('ProtectedRoute - Loading...');
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('ProtectedRoute - Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // Check if admin access is required but user is not an admin
  if (requireAdmin && !isAdminUser) {
    console.log('ProtectedRoute - Not admin, redirecting to unauthorized');
    return <Navigate to="/unauthorized" replace />;
  }
  
  console.log('ProtectedRoute - Access granted');
  

  return <>{children}</>;
};

export default ProtectedRoute;
