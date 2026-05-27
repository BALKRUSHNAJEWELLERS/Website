// types/index.ts

export interface MetalRateDoc {
    _id?: string; // MongoDB document ID
    gold: number;
    silver: number;
    lastUpdated: string;
}

export interface SliderItemDoc {
    _id?: string; // MongoDB document ID
    id: string; // Your custom ID (uuidv4)
    image: string;
    title: string;
    subtitle: string;
    link: string;
}

export interface ProductDoc {
    _id?: string; // MongoDB document ID
    id: string; // Your custom ID (uuidv4)
    name: string;
    category: string;
    price: number;
    image: string;
    metal: string;
    purity: string;
    weight: string;
    inStock: boolean;
}

export interface GoldSchemeDoc {
    _id?: string; // MongoDB document ID
    id: string; // Your custom ID (uuidv4)
    name: string;
    duration: string;
    monthlyAmount: string;
    totalAmount: string;
    goldValue: string;
    discount: string;
    features: string[];
    color: string;
    popular: boolean;
    rules: string;
    image?: string;
    sortOrder?: number;
    createdAt?: string;
    updatedAt?: string;
}
