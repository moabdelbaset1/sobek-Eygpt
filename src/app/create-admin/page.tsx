'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function CreateAdminPage() {
  const [formData, setFormData] = useState({
    email: 'admin@devegy.com',
    password: '',
    name: 'Admin User'
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/create-admin', {
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
          Create Admin Account
        </h1>

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
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              minLength={8}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Creating Account...' : 'Create Admin Account'}
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
                <h3 className="font-medium text-green-800">✅ Account Created Successfully!</h3>
                <p className="text-sm mt-1">You can now login with the following credentials:</p>
                <ul className="text-sm mt-2 space-y-1">
                  <li>Email: {result.user.email}</li>
                  <li>Name: {result.user.name}</li>
                  <li>Role: {result.user.role}</li>
                </ul>
              </div>
            ) : (
              <div>
                <h3 className="font-medium text-red-800">❌ Creation Failed</h3>
                <p className="text-sm mt-1">{result.error}</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 text-center">
          <a
            href="/admin"
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Go to Admin Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}