import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';

const Unauthorized: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center">
      <ShieldAlert className="h-16 w-16 text-red-500 mb-4" />
      <h1 className="text-3xl font-bold tracking-tight">Access Denied</h1>
      <p className="mt-4 text-lg text-gray-600 max-w-md">
        You don't have permission to access this page. Please contact an administrator if you believe this is an error.
      </p>
      <div className="mt-8">
        <Button asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
