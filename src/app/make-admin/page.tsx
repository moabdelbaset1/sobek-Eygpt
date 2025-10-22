'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function MakeAdminPage() {
  const [formData, setFormData] = useState({
    email: 'admin@devegy.com',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/make-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setResult(data);

      if (data.success) {
        setFormData({ ...formData, password: '' });
      }
    } catch (error) {
      setResult({
        success: false,
        error: 'Network error occurred'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Grant Admin Privileges
        </h1>

        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> This will grant admin privileges to an existing user account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password (for verification)
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Enter your current password"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Granting Admin Access...' : 'Grant Admin Privileges'}
          </Button>
        </form>

        {result && (
          <div className={`mt-4 p-4 rounded-md ${
            result.success 
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {result.success ? (
              <div>
                <h3 className="font-medium text-green-800">✅ Admin Privileges Granted!</h3>
                <p className="text-sm mt-1">The user now has admin access:</p>
                <ul className="text-sm mt-2 space-y-1">
                  <li>Email: {result.user.email}</li>
                  <li>Name: {result.user.name}</li>
                  <li>Role: {result.user.role}</li>
                  <li>Status: {result.user.status}</li>
                </ul>
              </div>
            ) : (
              <div>
                <h3 className="font-medium text-red-800">❌ Failed to Grant Privileges</h3>
                <p className="text-sm mt-1">{result.error}</p>
                {result.redirectTo && (
                  <p className="text-sm mt-2">
                    <a href={result.redirectTo} className="underline">
                      Try creating a new admin account instead
                    </a>
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        <div className="mt-6 text-center space-y-2">
          <div>
            <a
              href="/admin/login"
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Go to Admin Login
            </a>
          </div>
          <div>
            <a
              href="/create-admin"
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              Create New Admin Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}