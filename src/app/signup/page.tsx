'use client';

import React, { useState } from 'react';

interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
}

function Register() {
    const [user, setUser] = useState<User>({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleRegister = async () => {
        try {
            const response = await fetch('https://nestjs-backend-v9c5.onrender.com/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(handleRegister),
            });
            setUser({ name: '', email: '', password: ''});
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
                id='name'
                placeholder="Nome de usuário"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value})}
            />
            <input
                type="password"
                placeholder="Senha"
                id='password'
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value})}
            />
            <button onClick={handleRegister}>Registrar</button>
            {error && <p>{error}</p>}
        </div>
    );
}

export default Register;
