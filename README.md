# ShopNest - E-Commerce Platform

A modern, full-stack e-commerce application built with Next.js and Firebase.

![Products Page](https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80)

## ✨ Features

- 🛍️ **Product Catalog** - Browse products with categories and detailed views
- 🔐 **User Authentication** - Secure signup/login with Firebase Auth
- 🛒 **Shopping Cart** - Persistent cart that syncs across devices
- 📦 **Order Management** - Checkout and order history
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🌙 **Dark Mode Support** - Built-in theme switching

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (React 19)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Backend**: [Firebase](https://firebase.google.com/)
  - Authentication (Email/Password)
  - Cloud Firestore (Database)
- **Language**: TypeScript

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/e-commerce.git
   cd e-commerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Enable Firebase Authentication**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project
   - Navigate to **Authentication** → **Sign-in method**
   - Enable **Email/Password** provider

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
e-commerce/
├── app/                    # Next.js App Router pages
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout page
│   ├── login/             # Login page
│   ├── signup/            # Registration page
│   ├── products/          # Product listing & detail pages
│   └── order-success/     # Order confirmation page
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (Button, Card, etc.)
│   └── product/          # Product-specific components
├── contexts/              # React Context providers
│   └── store-context.tsx  # Global state management
├── lib/                   # Utility functions & services
│   ├── firebase.ts       # Firebase initialization
│   ├── auth-service.ts   # Authentication functions
│   ├── firestore-service.ts  # Database operations
│   └── mock-data.ts      # Fallback product data
└── scripts/              # Utility scripts
    └── seed-products.ts  # Seed Firestore with products
```

## 🔥 Firebase Setup

### Firestore Collections

| Collection | Description |
|------------|-------------|
| `products` | Product catalog |
| `users` | User profiles |
| `carts` | User shopping carts |
| `orders` | Order records |

### Seed Product Data (Optional)

```bash
npx ts-node --esm scripts/seed-products.ts
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Unsplash](https://unsplash.com/) for product images
