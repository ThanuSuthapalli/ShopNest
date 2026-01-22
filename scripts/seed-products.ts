// Seed script to populate Firestore with initial product data
// Run with: npx ts-node --esm scripts/seed-products.ts

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyD-PvAaXNbmLflXpYXheNQSd6zLURTnRRs",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "e-mini-2545.firebaseapp.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "e-mini-2545",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "e-mini-2545.firebasestorage.app",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "234014239843",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:234014239843:web:834f3c4d0d26b8997bdc56",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

interface Product {
    name: string
    description: string
    price: number
    image: string
    category: string
}

const products: Record<string, Product> = {
    '1': {
        name: 'Premium Wireless Headphones',
        description: 'Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions for extended listening sessions. Perfect for music lovers and professionals alike.',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
        category: 'Electronics',
    },
    '2': {
        name: 'Minimalist Watch',
        description: 'A beautifully crafted minimalist watch with a genuine leather strap and scratch-resistant sapphire crystal. Water-resistant up to 50 meters. The perfect accessory for any occasion.',
        price: 189.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
        category: 'Accessories',
    },
    '3': {
        name: 'Organic Cotton T-Shirt',
        description: 'Ultra-soft organic cotton t-shirt made from sustainably sourced materials. Pre-shrunk for a perfect fit that lasts. Available in multiple colors.',
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
        category: 'Clothing',
    },
    '4': {
        name: 'Smart Fitness Tracker',
        description: 'Track your health and fitness goals with this advanced fitness tracker. Features heart rate monitoring, sleep tracking, GPS, and 7-day battery life. Syncs seamlessly with your smartphone.',
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&q=80',
        category: 'Electronics',
    },
    '5': {
        name: 'Leather Backpack',
        description: 'Handcrafted genuine leather backpack with multiple compartments and padded laptop sleeve. Perfect for work, travel, or everyday use. Ages beautifully over time.',
        price: 249.99,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
        category: 'Accessories',
    },
    '6': {
        name: 'Ceramic Coffee Mug Set',
        description: 'Set of 4 handmade ceramic mugs in earthy tones. Microwave and dishwasher safe. Each mug holds 12oz of your favorite beverage.',
        price: 44.99,
        image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80',
        category: 'Home',
    },
    '7': {
        name: 'Running Shoes',
        description: 'Lightweight running shoes with responsive cushioning and breathable mesh upper. Designed for comfort during long runs. Reflective details for low-light visibility.',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
        category: 'Footwear',
    },
    '8': {
        name: 'Portable Bluetooth Speaker',
        description: 'Compact yet powerful Bluetooth speaker with 360-degree sound. Waterproof design perfect for outdoor adventures. 12-hour playtime on a single charge.',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80',
        category: 'Electronics',
    },
}

async function seedProducts() {
    console.log('Starting to seed products...')

    const productsCollection = collection(db, 'products')

    for (const [id, product] of Object.entries(products)) {
        try {
            await setDoc(doc(productsCollection, id), product)
            console.log(`✓ Added product: ${product.name}`)
        } catch (error) {
            console.error(`✗ Failed to add product ${product.name}:`, error)
        }
    }

    console.log('\nSeeding complete!')
}

seedProducts()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error('Seeding failed:', error)
        process.exit(1)
    })
