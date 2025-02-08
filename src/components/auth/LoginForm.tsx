import React, { useState } from "react";
import { authApi } from "../../utils/api";
import { auth } from "../../utils/auth";
import type { LoginInput } from "../../types/auth";

const LoginForm = () => {
  const [formData, setFormData] = useState<LoginInput>({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { access_token, user } = await authApi.login(formData);
      auth.login(access_token, user);
      window.location.href = '/';
    } catch (err) {
      setError(err instanceof Error ? err.message: 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="card w-96 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl pacifico-bold text-center text-pink-500 mb-4">
          Login
        </h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-pink-500 pacifico-regular text-white rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{' '}
          <a href="/register" className="text-pink-500 pacifico-regular hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  )
}

export default LoginForm;