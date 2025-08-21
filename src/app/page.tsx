"use client";

import { useState } from "react";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("http://localhost:8080/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (res.ok) {
            const data = await res.json();
            setMessage("Login erfolgreich! Token: " + data.token);
        } else {
            setMessage("Login fehlgeschlagen");
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
            <form
                onSubmit={handleLogin}
                className="bg-gray-800 p-6 rounded-xl shadow-lg w-80"
            >
                <h1 className="text-2xl font-bold mb-4">Artevo Login</h1>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
                />

                <input
                    type="password"
                    placeholder="Passwort"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
                />

                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 p-2 rounded font-semibold"
                >
                    Login
                </button>

                {message && <p className="mt-3 text-sm">{message}</p>}
            </form>
        </main>
    );
}
