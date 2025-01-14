'use client'

import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch('https://nestjs-backend-v9c5.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error('E-mail ou senha inválidos!');
      }

      const data = await res.json();
      const token = data.accessToken;

      // Armazenar o token em cookies ou localStorage
      localStorage.setItem('token', token);

      // Redirecionar para outra página após o login bem-sucedido
      window.location.href = '/posts';
    } catch (error: unknown) {
      // Verificar se o erro é uma instância de Error antes de acessar 'message'
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Ocorreu um erro desconhecido');
      }
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
