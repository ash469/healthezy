export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    discount?: string;
    imageUrl: string;
    qty?: number;
}

export const products: Product[] = [
    {
        id: 'p1',
        name: 'BP Monitor',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: 499,
        imageUrl: '/product.png', 
    },
    {
        id: 'p2',
        name: 'BP Monitor',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: 499,
        imageUrl: '/product.png',
    },
    {
        id: 'p3',
        name: 'BP Monitor',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: 499,
        imageUrl: '/product.png',
    },
    {
        id: 'p4',
        name: 'BP Monitor',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: 429,
        imageUrl: '/product.png',
    },
    {
        id: 'p5',
        name: 'BP Monitor',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: 499,
        imageUrl: '/product.png',
    },
    {
        id: 'p6',
        name: 'BP Monitor',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: 499,
        imageUrl: '/product.png',
    },
];

export const getProductById = (id: string): Product | undefined => {
    return products.find(p => p.id === id);
};
