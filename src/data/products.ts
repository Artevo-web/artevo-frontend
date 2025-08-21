export interface Product {
    slug: string;
    name: string;
    price: number;
    description: string;
    image: string;
    sizes: string[];
}

export const products: Product[] = [
    {
        slug: "t-shirt1",
        name: "Eat a Priest, Save a Child",
        price: 29.99,
        description: "Unisex T-Shirt mit coolem Design",
        image: "/images/shirt.jpg",
        sizes: ["S", "M", "L", "XL"],
    },
    {
        slug: "hoodie1",
        name: "Another Design",
        price: 39.99,
        description: "Stylischer Hoodie",
        image: "/images/hoodie.jpg",
        sizes: ["S", "M", "L", "XL"],
    },
];
