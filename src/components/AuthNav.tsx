import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
// We'll use the logout function from AuthContext instead of signOut from supabase
import { toast } from 'sonner';
import { LogIn, LogOut, User, Shield } from 'lucide-react';

const AuthNav: React.FC = () => {
  const { user, isAuthenticated, isAdminUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Failed to log out');
    }
  };

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <div className="flex items-center gap-4">
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback>{getInitials(user?.email || '')}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="flex flex-col space-y-1 p-2">
              <p className="text-sm font-medium">{user?.email}</p>
              {isAdminUser && (
                <p className="text-xs text-muted-foreground flex items-center">
                  <Shield className="h-3 w-3 mr-1" /> Administrator
                </p>
              )}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile" className="cursor-pointer flex w-full items-center">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            {isAdminUser && (
              <DropdownMenuItem asChild>
                <Link to="/admin" className="cursor-pointer flex w-full items-center">
                  <Shield className="mr-2 h-4 w-4" />
                  Admin Dashboard
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="cursor-pointer flex items-center text-red-500 focus:text-red-500" 
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button asChild variant="outline" size="sm">
          <Link to="/login" className="flex items-center">
            <LogIn className="mr-2 h-4 w-4" />
            Log in
          </Link>
        </Button>
      )}
    </div>
  );
};

export default AuthNav;
