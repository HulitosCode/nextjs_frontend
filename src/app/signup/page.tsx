'use client';

import React, { useState } from 'react';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async () => {
        try {
            const response = await fetch('http://localhost:8000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Usuário registrado com sucesso!');
            } else {
                setError(data.detail);
            }
        } catch (error) {
            console.error("Erro ao criar artigo:", error);
        }
    };

    return (
        <div>
            <h2>Registro</h2>
            <input
                type="text"
                placeholder="Nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Registrar</button>
            {error && <p>{error}</p>}
        </div>
    );
}

export default Register;
