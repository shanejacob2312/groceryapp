const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const sampleProducts = [
  {
    name: 'Fresh Organic Apples',
    description: 'Sweet and crisp organic apples, perfect for snacking or baking. Grown without pesticides.',
    category: 'Fruits & Vegetables',
    price: 4.99,
    originalPrice: 5.99,
    discount: 17,
    unit: 'kg',
    stock: 50,
    minStock: 10,
    images: [
      'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=400&h=300&fit=crop'
    ],
    brand: 'Organic Valley',
    weight: 1,
    weightUnit: 'kg',
    isOrganic: true,
    isGlutenFree: true,
    isVegan: true,
    tags: ['organic', 'fresh', 'healthy'],
    isFeatured: true,
    sku: 'APPLE-ORG-001'
  },
  {
    name: 'Whole Milk',
    description: 'Fresh whole milk from grass-fed cows. Rich and creamy, perfect for drinking or cooking.',
    category: 'Dairy & Eggs',
    price: 3.49,
    unit: 'l',
    stock: 30,
    minStock: 5,
    images: [
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop'
    ],
    brand: 'Farm Fresh',
    weight: 1,
    weightUnit: 'l',
    isOrganic: false,
    isGlutenFree: true,
    isVegan: false,
    tags: ['dairy', 'fresh', 'calcium'],
    isFeatured: true,
    sku: 'MILK-WHOLE-001'
  },
  {
    name: 'Fresh Spinach',
    description: 'Nutrient-rich fresh spinach leaves. Perfect for salads, smoothies, or cooking.',
    category: 'Fruits & Vegetables',
    price: 2.99,
    unit: 'pack',
    stock: 25,
    minStock: 8,
    images: [
      'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop'
    ],
    brand: 'Green Valley',
    weight: 200,
    weightUnit: 'g',
    isOrganic: true,
    isGlutenFree: true,
    isVegan: true,
    tags: ['organic', 'leafy', 'healthy'],
    isFeatured: false,
    sku: 'SPINACH-FRESH-001'
  },
  {
    name: 'Chicken Breast',
    description: 'Boneless, skinless chicken breast. Lean and protein-rich, perfect for healthy meals.',
    category: 'Meat & Seafood',
    price: 12.99,
    unit: 'kg',
    stock: 15,
    minStock: 3,
    images: [
      'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop'
    ],
    brand: 'Premium Meats',
    weight: 1,
    weightUnit: 'kg',
    isOrganic: false,
    isGlutenFree: true,
    isVegan: false,
    tags: ['protein', 'lean', 'fresh'],
    isFeatured: true,
    sku: 'CHICKEN-BREAST-001'
  },
  {
    name: 'Artisan Bread',
    description: 'Freshly baked artisan bread with a crispy crust and soft interior. Made with premium flour.',
    category: 'Bakery',
    price: 4.49,
    unit: 'pcs',
    stock: 20,
    minStock: 5,
    images: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop'
    ],
    brand: 'Bakery Fresh',
    weight: 500,
    weightUnit: 'g',
    isOrganic: false,
    isGlutenFree: false,
    isVegan: true,
    tags: ['fresh', 'artisan', 'bakery'],
    isFeatured: false,
    sku: 'BREAD-ARTISAN-001'
  },
  {
    name: 'Extra Virgin Olive Oil',
    description: 'Premium extra virgin olive oil from Italian olives. Perfect for cooking and dressings.',
    category: 'Pantry',
    price: 8.99,
    unit: 'bottle',
    stock: 40,
    minStock: 10,
    images: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=300&fit=crop'
    ],
    brand: 'Mediterranean Gold',
    weight: 500,
    weightUnit: 'ml',
    isOrganic: true,
    isGlutenFree: true,
    isVegan: true,
    tags: ['organic', 'premium', 'healthy'],
    isFeatured: true,
    sku: 'OLIVE-OIL-EV-001'
  },
  {
    name: 'Greek Yogurt',
    description: 'Creamy Greek yogurt with live cultures. High in protein and perfect for breakfast or snacks.',
    category: 'Dairy & Eggs',
    price: 5.49,
    unit: 'pack',
    stock: 35,
    minStock: 8,
    images: [
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop'
    ],
    brand: 'Greek Delight',
    weight: 500,
    weightUnit: 'g',
    isOrganic: false,
    isGlutenFree: true,
    isVegan: false,
    tags: ['protein', 'probiotic', 'healthy'],
    isFeatured: false,
    sku: 'YOGURT-GREEK-001'
  },
  {
    name: 'Fresh Tomatoes',
    description: 'Ripe and juicy tomatoes. Perfect for salads, cooking, or making sauces.',
    category: 'Fruits & Vegetables',
    price: 3.99,
    unit: 'kg',
    stock: 30,
    minStock: 8,
    images: [
      'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=300&fit=crop'
    ],
    brand: 'Garden Fresh',
    weight: 1,
    weightUnit: 'kg',
    isOrganic: false,
    isGlutenFree: true,
    isVegan: true,
    tags: ['fresh', 'versatile', 'healthy'],
    isFeatured: false,
    sku: 'TOMATO-FRESH-001'
  },
  {
    name: 'Salmon Fillet',
    description: 'Fresh Atlantic salmon fillet. Rich in omega-3 fatty acids and perfect for healthy meals.',
    category: 'Meat & Seafood',
    price: 18.99,
    unit: 'kg',
    stock: 12,
    minStock: 3,
    images: [
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop'
    ],
    brand: 'Ocean Fresh',
    weight: 1,
    weightUnit: 'kg',
    isOrganic: false,
    isGlutenFree: true,
    isVegan: false,
    tags: ['omega-3', 'protein', 'healthy'],
    isFeatured: true,
    sku: 'SALMON-FILLET-001'
  },
  {
    name: 'Dark Chocolate',
    description: 'Premium dark chocolate with 70% cocoa. Rich and smooth, perfect for indulging.',
    category: 'Snacks',
    price: 6.99,
    unit: 'pack',
    stock: 45,
    minStock: 12,
    images: [
      'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&h=300&fit=crop'
    ],
    brand: 'Chocolate Delight',
    weight: 100,
    weightUnit: 'g',
    isOrganic: true,
    isGlutenFree: true,
    isVegan: true,
    tags: ['organic', 'premium', 'indulgent'],
    isFeatured: false,
    sku: 'CHOCOLATE-DARK-001'
  }
];

async function seedProducts() {
  try {
    // Connect to MongoDB Atlas
    const dbUrl = process.env.MONGODB_URI || 'mongodb+srv://shanejacob2312:$Shane2312@cluster0.uxda6.mongodb.net/';
    console.log('🔗 Connecting to MongoDB Atlas...');
    console.log('Database URL:', dbUrl);
    
    await mongoose.connect(dbUrl);
    console.log('✅ Connected to MongoDB Atlas');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🧹 Cleared existing products');

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ Successfully seeded ${products.length} products`);

    // Display some sample products
    console.log('\n📋 Sample products created:');
    products.forEach(product => {
      console.log(`- ${product.name} (${product.category}) - $${product.price}`);
    });

    mongoose.connection.close();
    console.log('\n✅ Database connection closed');
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedProducts(); 