// Seed script to populate Firestore with initial product data using Firebase Admin SDK
// Run with: npx ts-node --esm scripts/seed-products-admin.ts

import * as admin from 'firebase-admin'
import { readFileSync } from 'fs'

// Initialize Firebase Admin SDK
// You need to download the service account key from Firebase Console:
// 1. Go to https://console.firebase.google.com/project/e-mini-2545/settings/serviceaccounts/adminsdk
// 2. Click "Generate new private key"
// 3. Save the JSON file as serviceAccountKey.json in the project root
// 4. The script will use this key for authentication

const serviceAccount = JSON.parse(readFileSync('./serviceAccountKey.json', 'utf8'))

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'e-mini-2545'
  })
}

const db = admin.firestore()

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
    price: 24899,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
    category: 'Electronics',
  },
  '2': {
    name: 'Minimalist Watch',
    description: 'A beautifully crafted minimalist watch with a genuine leather strap and scratch-resistant sapphire crystal. Water-resistant up to 50 meters. The perfect accessory for any occasion.',
    price: 15779,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
    category: 'Accessories',
  },
  '3': {
    name: 'Organic Cotton T-Shirt',
    description: 'Ultra-soft organic cotton t-shirt made from sustainably sourced materials. Pre-shrunk for a perfect fit that lasts. Available in multiple colors.',
    price: 2904,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
    category: 'Clothing',
  },
  '4': {
    name: 'Smart Fitness Tracker',
    description: 'Track your health and fitness goals with this advanced fitness tracker. Features heart rate monitoring, sleep tracking, GPS, and 7-day battery life. Syncs seamlessly with your smartphone.',
    price: 12449,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&q=80',
    category: 'Electronics',
  },
  '5': {
    name: 'Leather Backpack',
    description: 'Handcrafted genuine leather backpack with multiple compartments and padded laptop sleeve. Perfect for work, travel, or everyday use. Ages beautifully over time.',
    price: 20749,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
    category: 'Accessories',
  },
  '6': {
    name: 'Ceramic Coffee Mug Set',
    description: 'Set of 4 handmade ceramic mugs in earthy tones. Microwave and dishwasher safe. Each mug holds 12oz of your favorite beverage.',
    price: 3734,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80',
    category: 'Home & Kitchen',
  },
  '7': {
    name: 'Running Shoes',
    description: 'Lightweight running shoes with responsive cushioning and breathable mesh upper. Designed for comfort during long runs. Reflective details for low-light visibility.',
    price: 10799,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    category: 'Footwear',
  },
  '8': {
    name: 'Portable Bluetooth Speaker',
    description: 'Compact yet powerful Bluetooth speaker with 360-degree sound. Waterproof design perfect for outdoor adventures. 12-hour playtime on a single charge.',
    price: 6639,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80',
    category: 'Electronics',
  },
  '9': {
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices. LED indicator shows charging status. Sleek design that complements any desk setup.',
    price: 3329,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&q=80',
    category: 'Electronics',
  },
  '10': {
    name: 'Stainless Steel Water Bottle',
    description: 'Insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and eco-friendly. Perfect for gym, office, or outdoor activities.',
    price: 2074,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80',
    category: 'Sports & Outdoors',
  },
  '11': {
    name: 'Yoga Mat',
    description: 'Premium non-slip yoga mat made from natural rubber. Extra thick for joint protection and cushioning. Includes carrying strap for easy transport.',
    price: 4159,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
    category: 'Sports & Outdoors',
  },
  '12': {
    name: 'Denim Jeans',
    description: 'Classic straight-fit denim jeans made from premium cotton blend. Comfortable stretch fabric with perfect fade and distressing. Available in multiple washes.',
    price: 6649,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80',
    category: 'Clothing',
  },
  '13': {
    name: 'Hooded Sweatshirt',
    description: 'Cozy cotton-blend hooded sweatshirt with kangaroo pocket. Perfect for layering or casual wear. Features ribbed cuffs and hem for a comfortable fit.',
    price: 5399,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80',
    category: 'Clothing',
  },
  '14': {
    name: 'Leather Wallet',
    description: 'Genuine leather bifold wallet with multiple card slots and coin pocket. Handcrafted with attention to detail. RFID blocking technology for security.',
    price: 3734,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80',
    category: 'Accessories',
  },
  '15': {
    name: 'Sunglasses',
    description: 'Polarized sunglasses with UV400 protection. Lightweight titanium frame with scratch-resistant lenses. Comes with protective case and cleaning cloth.',
    price: 8319,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80',
    category: 'Accessories',
  },
  '16': {
    name: 'Coffee Maker',
    description: 'Programmable 12-cup coffee maker with thermal carafe. Brew strength control and automatic shut-off. Perfect for coffee enthusiasts who want fresh brew every morning.',
    price: 12449,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
    category: 'Home & Kitchen',
  },
  '17': {
    name: 'Non-Stick Cookware Set',
    description: '10-piece non-stick cookware set including pots, pans, and utensils. PFOA-free coating for healthy cooking. Dishwasher safe with oven-safe up to 260°C.',
    price: 20749,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    category: 'Home & Kitchen',
  },
  '18': {
    name: 'Board Game Collection',
    description: 'Classic board game set including Monopoly, Scrabble, and Chess. Perfect for family game nights. High-quality pieces with durable storage boxes.',
    price: 6649,
    image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd60?w=600&q=80',
    category: 'Toys & Games',
  },
  '19': {
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision optical sensor. 2.4GHz wireless technology with long battery life. Compatible with Windows, Mac, and Linux.',
    price: 2074,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&q=80',
    category: 'Electronics',
  },
  '20': {
    name: 'Face Moisturizer',
    description: 'Hydrating face moisturizer with SPF 30 protection. Made with natural ingredients including aloe vera and vitamin E. Non-greasy formula suitable for all skin types.',
    price: 2904,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80',
    category: 'Beauty & Personal Care',
  },
  '21': {
    name: 'Hair Dryer',
    description: 'Professional ionic hair dryer with multiple heat and speed settings. Ceramic technology for faster drying and reduced frizz. Includes diffuser and concentrator nozzles.',
    price: 5399,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
    category: 'Beauty & Personal Care',
  },
  '22': {
    name: 'Camping Tent',
    description: '4-person waterproof camping tent with easy setup. Includes rainfly, stakes, and carrying bag. Perfect for family camping trips with excellent ventilation.',
    price: 16649,
    image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=600&q=80',
    category: 'Sports & Outdoors',
  },
  '23': {
    name: 'Dumbbell Set',
    description: 'Adjustable dumbbell set from 5-50 lbs. Chrome plated with secure locking mechanism. Perfect for home workouts and strength training.',
    price: 20749,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    category: 'Sports & Outdoors',
  },
  '24': {
    name: 'Throw Blanket',
    description: 'Ultra-soft fleece throw blanket perfect for couch or bed. Machine washable with cozy sherpa lining. Available in multiple colors and sizes.',
    price: 3329,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
    category: 'Home & Kitchen',
  },
  '25': {
    name: 'Desk Lamp',
    description: 'LED desk lamp with adjustable brightness and color temperature. USB charging port and memory function. Modern design that complements any workspace.',
    price: 5399,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    category: 'Home & Kitchen',
  },
  '26': {
    name: 'Sneakers',
    description: 'Comfortable canvas sneakers with rubber sole. Classic design with breathable cotton upper. Perfect for casual wear and light activities.',
    price: 6649,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80',
    category: 'Footwear',
  },
  '27': {
    name: 'Winter Jacket',
    description: 'Water-resistant winter jacket with synthetic insulation. Multiple pockets and adjustable hood. Perfect for cold weather activities.',
    price: 12449,
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=600&q=80',
    category: 'Clothing',
  },
  '28': {
    name: 'Smartphone Stand',
    description: 'Adjustable aluminum smartphone stand with anti-slip grip. Compatible with all phone sizes. Foldable design for easy storage and travel.',
    price: 1249,
    image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=600&q=80',
    category: 'Electronics',
  },
  '29': {
    name: 'Essential Oil Diffuser',
    description: 'Ultrasonic aromatherapy diffuser with 7 LED light colors. 300ml capacity with timer settings. Creates a calming atmosphere with your favorite essential oils.',
    price: 4159,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80',
    category: 'Home & Kitchen',
  },
  '30': {
    name: 'Puzzle Set',
    description: '500-piece jigsaw puzzle set with beautiful landscape design. High-quality pieces that fit together perfectly. Hours of engaging entertainment for all ages.',
    price: 1249,
    image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600&q=80',
    category: 'Toys & Games',
  },
  '31': {
    name: 'Digital Camera',
    description: '24MP digital camera with 4K video recording and image stabilization. Perfect for photography enthusiasts and content creators. Includes memory card and camera bag.',
    price: 33290,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&q=80',
    category: 'Electronics',
  },
  '32': {
    name: 'Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with blue switches for tactile feedback. Programmable keys and wrist rest included. Perfect for gaming and programming.',
    price: 12449,
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&q=80',
    category: 'Electronics',
  },
  '33': {
    name: 'Coffee Table Book Set',
    description: 'Collection of 5 beautifully illustrated coffee table books covering art, photography, and design. Perfect for home decor and intellectual stimulation.',
    price: 8319,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80',
    category: 'Books',
  },
  '34': {
    name: 'Aromatherapy Candle Set',
    description: 'Set of 6 soy wax candles in calming scents like lavender, eucalyptus, and vanilla. Hand-poured with essential oils. 40-hour burn time each.',
    price: 2904,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80',
    category: 'Home & Kitchen',
  },
  '35': {
    name: 'Protein Powder',
    description: 'Premium whey protein powder with 25g protein per serving. Chocolate flavor with added BCAAs and digestive enzymes. Perfect for post-workout recovery.',
    price: 5399,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    category: 'Sports & Outdoors',
  },
  '36': {
    name: 'Wireless Earbuds',
    description: 'True wireless earbuds with active noise cancellation and 8-hour battery life. Touch controls and wireless charging case. Crystal-clear call quality.',
    price: 12449,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80',
    category: 'Electronics',
  },
  '37': {
    name: 'Designer Sunglasses',
    description: 'Luxury polarized sunglasses with gold-tone frames and UV400 protection. Comes with premium case and cleaning cloth. Perfect for style and sun protection.',
    price: 16649,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80',
    category: 'Accessories',
  },
  '38': {
    name: 'Ceramic Plant Pots Set',
    description: 'Set of 3 decorative ceramic plant pots in matte finish. Includes drainage holes and saucers. Perfect for indoor plants and home decoration.',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
    category: 'Home & Kitchen',
  },
  '39': {
    name: 'Resistance Bands Set',
    description: '5-piece resistance bands set with different resistance levels. Includes door anchor and ankle straps. Perfect for home workouts and physical therapy.',
    price: 2074,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    category: 'Sports & Outdoors',
  },
  '40': {
    name: 'Luxury Perfume',
    description: 'Elegant floral fragrance with notes of jasmine, rose, and vanilla. Long-lasting scent suitable for all occasions. Comes in beautiful glass bottle.',
    price: 8319,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80',
    category: 'Beauty & Personal Care',
  },
  '41': {
    name: 'Smart Home Hub',
    description: 'Voice-controlled smart home hub compatible with all major smart devices. Control lights, thermostats, and security cameras with voice commands.',
    price: 12449,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    category: 'Electronics',
  },
  '42': {
    name: 'Leather Boots',
    description: 'Handcrafted leather ankle boots with waterproof treatment. Comfortable insole and durable rubber sole. Perfect for casual and professional wear.',
    price: 20749,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80',
    category: 'Footwear',
  },
  '43': {
    name: 'Gourmet Chocolate Box',
    description: 'Assortment of 24 premium dark chocolate pieces with various fillings. Handcrafted by master chocolatiers. Perfect gift for chocolate lovers.',
    price: 3734,
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&q=80',
    category: 'Food & Beverages',
  },
  '44': {
    name: 'Portable Power Bank',
    description: '20000mAh portable charger with fast charging technology. Dual USB ports and wireless charging pad. LED battery indicator and compact design.',
    price: 3329,
    image: 'https://images.unsplash.com/photo-1609592806580-9de6a6b40d86?w=600&q=80',
    category: 'Electronics',
  },
  '45': {
    name: 'Yoga Block Set',
    description: 'Set of 2 cork yoga blocks with non-slip surface. Lightweight and durable. Perfect for beginners and advanced practitioners to enhance their practice.',
    price: 1664,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
    category: 'Sports & Outdoors',
  },
  '46': {
    name: 'Silk Scarf',
    description: 'Luxurious 100% silk scarf with beautiful floral pattern. Lightweight and breathable. Perfect accessory for any outfit or as a hair accessory.',
    price: 5399,
    image: 'https://images.unsplash.com/photo-1601762603332-db5e4b90cca7?w=600&q=80',
    category: 'Accessories',
  },
  '47': {
    name: 'Air Purifier',
    description: 'HEPA air purifier with activated carbon filter. Covers up to 500 sq ft. Quiet operation with air quality indicator. Perfect for allergy sufferers.',
    price: 20749,
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80',
    category: 'Home & Kitchen',
  },
  '48': {
    name: 'Drone with Camera',
    description: 'Foldable drone with 4K camera and GPS stabilization. 25-minute flight time with live video transmission. Perfect for aerial photography and videography.',
    price: 41590,
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80',
    category: 'Electronics',
  },
  '49': {
    name: 'Vintage Record Player',
    description: 'Retro-style record player with built-in speakers and Bluetooth connectivity. Plays vinyl records and streams music wirelessly. Nostalgic design.',
    price: 24990,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80',
    category: 'Electronics',
  },
  '50': {
    name: 'Artisanal Tea Set',
    description: 'Premium loose leaf tea assortment with 10 different varieties. Includes infuser and tasting notes. Perfect for tea enthusiasts and gift giving.',
    price: 5399,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=80',
    category: 'Food & Beverages',
  },
}

async function seedProducts() {
  console.log('Starting to seed products with Firebase Admin SDK...')

  const batch = db.batch()
  const productsRef = db.collection('products')

  for (const [id, product] of Object.entries(products)) {
    const docRef = productsRef.doc(id)
    batch.set(docRef, product)
  }

  try {
    await batch.commit()
    console.log('✓ Successfully added all products to Firebase!')
    console.log(`Total products seeded: ${Object.keys(products).length}`)
  } catch (error) {
    console.error('✗ Failed to seed products:', error)
  }
}

seedProducts().catch(console.error)