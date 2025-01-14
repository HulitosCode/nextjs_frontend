'use client'

import { useState } from "react"

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const res = await fetch('https://nestjs-backend-v9c5.onrender.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'aplication/json',
                },
                body: JSON.stringify({email, password}),
            });

            if (!res.ok) {
                throw new Error('E-mail ou senha invalida!')
            }

            const data = await res.json();
            const token = data.accessToken;

            // Armazenar o token em um cookies ou localStorege
            localStorage.setItem('token', token);

            //Renderizar para outra pagina apos o login bem-sucedido
            window.location.href = '/posts';
        } catch (error) {
            setError(error.message);
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