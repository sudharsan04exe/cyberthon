import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // API call to backend
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        email,
        password
      });

      alert(response.data.message || 'Registered Successfully');
      navigate('/login');
    } catch (error) {
      // If user already exists or server error
      const msg = error.response?.data?.message || 'Registration failed';
      alert(msg);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
          Register
        </button>
        <p className="mt-3 text-sm text-center">
          Already have an account?{' '}
          <a className="text-blue-500" href="/login">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
