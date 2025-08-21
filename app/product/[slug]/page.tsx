"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = use(params);
    const product = products.find((p) => p.slug === resolvedParams.slug);

    const [selectedSize, setSelectedSize] = useState<string>("");
    const { addToCart } = useCart();

    if (!product) return <h1>Produkt nicht gefunden 😢</h1>;

    const handleAddToCart = () => {
        if (!selectedSize) return;
        addToCart({ name: product.name, size: selectedSize, price: product.price });
        setSelectedSize("");
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <Link
                href="/product"
                className="inline-block mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
                ← Zurück zur Übersicht
            </Link>

            <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={400}
                className="mb-4 rounded"
            />

            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-xl text-gray-700 mb-2">Preis: {product.price} €</p>
            <p className="text-gray-600 mb-4">{product.description}</p>

            <div className="mb-4">
                <label className="mr-2 font-semibold">Größe:</label>
                {product.sizes.map((size) => (
                    <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`mr-2 px-3 py-1 border rounded ${
                            selectedSize === size ? "bg-blue-500 text-white" : "bg-white text-black"
                        }`}
                    >
                        {size}
                    </button>
                ))}
            </div>

            <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="px-6 py-2 bg-green-500 text-white rounded disabled:bg-gray-300"
            >
                In den Warenkorb
            </button>
        </div>
    );
}
