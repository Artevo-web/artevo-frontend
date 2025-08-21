"use client";

import { useCart } from "@/context/CartContext";

export default function MiniCart() {
    const { cart } = useCart();

    return (
        <div className="fixed top-4 right-4 w-72 p-4 border rounded bg-white shadow-lg z-50">
            <h2 className="text-xl font-bold mb-2">Warenkorb</h2>
            {cart.length === 0 ? (
                <p className="text-gray-500">Noch keine Artikel</p>
            ) : (
                <ul className="mb-2">
                    {cart.map((item, index) => (
                        <li key={index}>
                            {item.name} – Größe: {item.size} – {item.price} €
                        </li>
                    ))}
                </ul>
            )}
            <p className="font-semibold">
                Gesamt: {cart.reduce((total, item) => total + item.price, 0).toFixed(2)} €
            </p>
        </div>
    );
}
