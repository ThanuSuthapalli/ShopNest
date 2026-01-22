// Mock data for development - will be replaced with API calls
import type { Product } from '@/lib/api'

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions for extended listening sessions. Perfect for music lovers and professionals alike.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
    category: 'Electronics',
  },
  {
    id: '2',
    name: 'Minimalist Watch',
    description: 'A beautifully crafted minimalist watch with a genuine leather strap and scratch-resistant sapphire crystal. Water-resistant up to 50 meters. The perfect accessory for any occasion.',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
    category: 'Accessories',
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    description: 'Ultra-soft organic cotton t-shirt made from sustainably sourced materials. Pre-shrunk for a perfect fit that lasts. Available in multiple colors.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
    category: 'Clothing',
  },
  {
    id: '4',
    name: 'Smart Fitness Tracker',
    description: 'Track your health and fitness goals with this advanced fitness tracker. Features heart rate monitoring, sleep tracking, GPS, and 7-day battery life. Syncs seamlessly with your smartphone.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&q=80',
    category: 'Electronics',
  },
  {
    id: '5',
    name: 'Leather Backpack',
    description: 'Handcrafted genuine leather backpack with multiple compartments and padded laptop sleeve. Perfect for work, travel, or everyday use. Ages beautifully over time.',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
    category: 'Accessories',
  },
  {
    id: '6',
    name: 'Ceramic Coffee Mug Set',
    description: 'Set of 4 handmade ceramic mugs in earthy tones. Microwave and dishwasher safe. Each mug holds 12oz of your favorite beverage.',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80',
    category: 'Home',
  },
  {
    id: '7',
    name: 'Running Shoes',
    description: 'Lightweight running shoes with responsive cushioning and breathable mesh upper. Designed for comfort during long runs. Reflective details for low-light visibility.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    category: 'Footwear',
  },
  {
    id: '8',
    name: 'Portable Bluetooth Speaker',
    description: 'Compact yet powerful Bluetooth speaker with 360-degree sound. Waterproof design perfect for outdoor adventures. 12-hour playtime on a single charge.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80',
    category: 'Electronics',
  },
]

export function getProductById(id: string): Product | undefined {
  return mockProducts.find(product => product.id === id)
}

export function getAllProducts(): Product[] {
  return mockProducts
}
