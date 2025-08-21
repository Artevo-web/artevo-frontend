"use client";

import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";

export default function ProductList() {
    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Unsere Produkte</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <Link
                        key={product.slug}
                        href={`/product/${product.slug}`}
                        className="border rounded p-4 hover:shadow-lg transition"
                    >
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={300}
                            height={300}
                            className="mb-4 rounded"
                        />
                        <h2 className="text-xl font-semibold mb-1">{product.name}</h2>
                        <p className="text-gray-700">{product.price} €</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
