"use client";

import { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import MiniCart from "@/components/MiniCart";

export default function ProductLayout({ children }: { children: ReactNode }) {
    return (
        <CartProvider>
            {children}
            <MiniCart />
        </CartProvider>
    );
}
