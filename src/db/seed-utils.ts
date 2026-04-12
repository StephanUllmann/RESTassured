// src/db/seed-utils.ts
import { sql } from 'drizzle-orm';
import { getTableConfig } from 'drizzle-orm/sqlite-core';
import * as schema from './schema.ts';

export const MOCK_PRODUCTS = [
  // Computers
  {
    title: 'Quantum Pro Laptop',
    desc: 'High-performance laptop for professionals with 32GB RAM.',
    categoryName: 'Computers',
    price: 1499.99,
    image: 'https://loremflickr.com/400/400/laptop',
  },
  {
    title: 'Desktop Workstation X',
    desc: 'Tower PC optimized for 3D rendering and heavy workloads.',
    categoryName: 'Computers',
    price: 2499.0,
    image: 'https://loremflickr.com/400/400/workstation',
  },
  {
    title: 'UltraWide Monitor 34',
    desc: 'Curved 34-inch display with 144Hz refresh rate.',
    categoryName: 'Computers',
    price: 599.5,
    image: 'https://loremflickr.com/400/400/monitor',
  },
  {
    title: 'Mechanical Keyboard',
    desc: 'Tactile mechanical keyboard with customizable RGB.',
    categoryName: 'Computers',
    price: 129.99,
    image: 'https://loremflickr.com/400/400/keyboard',
  },
  {
    title: 'Wireless Ergonomic Mouse',
    desc: 'Vertical mouse designed to prevent wrist strain.',
    categoryName: 'Computers',
    price: 59.9,
    image: 'https://loremflickr.com/400/400/mouse',
  },
  {
    title: 'NVMe SSD 2TB',
    desc: 'Ultra-fast PCIe Gen4 storage for gaming and productivity.',
    categoryName: 'Computers',
    price: 159.99,
    image: 'https://loremflickr.com/400/400/ssd',
  },
  {
    title: 'Compact Mini PC',
    desc: 'Space-saving desktop perfect for home offices.',
    categoryName: 'Computers',
    price: 450.0,
    image: 'https://loremflickr.com/400/400/pc',
  },
  {
    title: 'USB-C Docking Station',
    desc: "Expand your laptop's connectivity with dual HDMI and 4 USB ports.",
    categoryName: 'Computers',
    price: 89.99,
    image: 'https://loremflickr.com/400/400/dockingstation',
  },
  {
    title: '4K Web Camera',
    desc: 'Crystal clear video calls with auto-focus and built-in mic.',
    categoryName: 'Computers',
    price: 119.5,
    image: 'https://loremflickr.com/400/400/webcam',
  },
  {
    title: '32GB DDR5 RAM Kit',
    desc: 'Next-gen memory for lightning-fast multitasking.',
    categoryName: 'Computers',
    price: 135.0,
    image: 'https://loremflickr.com/400/400/ram',
  },
  {
    title: 'Dual Monitor Arm',
    desc: 'Fully adjustable desk mount for two 27-inch screens.',
    categoryName: 'Computers',
    price: 75.99,
    image: 'https://loremflickr.com/400/400/desksetup',
  },
  {
    title: 'High-Airflow PC Case',
    desc: 'Mid-tower case with tempered glass and 4 RGB fans.',
    categoryName: 'Computers',
    price: 110.0,
    image: 'https://loremflickr.com/400/400/pccase',
  },

  // Games
  {
    title: 'Elden Ring: Definitive',
    desc: 'Epic open-world fantasy action RPG.',
    categoryName: 'Games',
    price: 69.99,
    image: 'https://loremflickr.com/400/400/fantasygame',
  },
  {
    title: 'Cyber City 2089',
    desc: 'Sci-fi adventure game with immersive graphics.',
    categoryName: 'Games',
    price: 59.99,
    image: 'https://loremflickr.com/400/400/cyberpunk',
  },
  {
    title: 'Cozy Farm Simulator',
    desc: 'Relaxing farming and life simulation game.',
    categoryName: 'Games',
    price: 29.99,
    image: 'https://loremflickr.com/400/400/farmgame',
  },
  {
    title: 'Galactic Racer',
    desc: 'High-speed zero-gravity racing.',
    categoryName: 'Games',
    price: 39.99,
    image: 'https://loremflickr.com/400/400/spaceship',
  },
  {
    title: 'Mystery Mansion',
    desc: 'Co-op puzzle and survival horror.',
    categoryName: 'Games',
    price: 24.99,
    image: 'https://loremflickr.com/400/400/mansion',
  },
  {
    title: 'Retro Arcade Collection',
    desc: '30 classic arcade games in one bundle.',
    categoryName: 'Games',
    price: 19.99,
    image: 'https://loremflickr.com/400/400/arcade',
  },
  {
    title: 'Fantasy RPG VIII',
    desc: 'A sprawling saga of magic, crystals, and rebellion.',
    categoryName: 'Games',
    price: 49.99,
    image: 'https://loremflickr.com/400/400/rpg',
  },
  {
    title: 'Tactical Shooter Pro',
    desc: 'Competitive 5v5 multiplayer tactical FPS.',
    categoryName: 'Games',
    price: 34.99,
    image: 'https://loremflickr.com/400/400/shooter',
  },
  {
    title: 'Super Platformer Bros',
    desc: 'Classic jump-and-run action for all ages.',
    categoryName: 'Games',
    price: 49.99,
    image: 'https://loremflickr.com/400/400/platformer',
  },
  {
    title: 'Grand Strategy World',
    desc: 'Conquer continents and build your empire from scratch.',
    categoryName: 'Games',
    price: 59.99,
    image: 'https://loremflickr.com/400/400/strategygame',
  },
  {
    title: 'Fighting Tournament 5',
    desc: 'Next-gen 2D fighting game with a massive roster.',
    categoryName: 'Games',
    price: 59.99,
    image: 'https://loremflickr.com/400/400/fightinggame',
  },
  {
    title: 'VR Beat Rhythm',
    desc: 'Slice blocks to the beat of adrenaline-pumping music.',
    categoryName: 'Games',
    price: 29.99,
    image: 'https://loremflickr.com/400/400/vr',
  },

  // Books
  {
    title: 'The Pragmatic Programmer',
    desc: 'Your journey to mastery in software engineering.',
    categoryName: 'Books',
    price: 45.0,
    image: 'https://loremflickr.com/400/400/programmingbook',
  },
  {
    title: 'Sci-Fi Anthology',
    desc: 'A collection of short stories from the future.',
    categoryName: 'Books',
    price: 18.5,
    image: 'https://loremflickr.com/400/400/scifibook',
  },
  {
    title: 'Cooking for Beginners',
    desc: '100 easy recipes for everyday meals.',
    categoryName: 'Books',
    price: 22.99,
    image: 'https://loremflickr.com/400/400/cookbook',
  },
  {
    title: 'History of the Ancient World',
    desc: 'A deep dive into ancient civilizations.',
    categoryName: 'Books',
    price: 35.0,
    image: 'https://loremflickr.com/400/400/historybook',
  },
  {
    title: 'The Art of War',
    desc: 'Classic treatise on strategy and tactics.',
    categoryName: 'Books',
    price: 12.99,
    image: 'https://loremflickr.com/400/400/strategybook',
  },
  {
    title: 'Data-Intensive Applications',
    desc: 'The definitive guide to distributed systems.',
    categoryName: 'Books',
    price: 49.95,
    image: 'https://loremflickr.com/400/400/databasebook',
  },
  {
    title: 'Fantasy Epic: Book One',
    desc: 'The beginning of a legendary trilogy.',
    categoryName: 'Books',
    price: 24.99,
    image: 'https://loremflickr.com/400/400/fantasybook',
  },
  {
    title: 'Modern Web Development',
    desc: 'Mastering React, TypeScript, and full-stack architecture.',
    categoryName: 'Books',
    price: 39.99,
    image: 'https://loremflickr.com/400/400/webdevbook',
  },
  {
    title: 'The Psychology of Money',
    desc: 'Timeless lessons on wealth, greed, and happiness.',
    categoryName: 'Books',
    price: 19.99,
    image: 'https://loremflickr.com/400/400/financebook',
  },
  {
    title: 'Mystery of the Old Manor',
    desc: 'A thrilling whodunit that will keep you guessing.',
    categoryName: 'Books',
    price: 16.5,
    image: 'https://loremflickr.com/400/400/mysterybook',
  },
  {
    title: 'Learn Python in 30 Days',
    desc: 'A step-by-step crash course for beginners.',
    categoryName: 'Books',
    price: 29.99,
    image: 'https://loremflickr.com/400/400/pythonbook',
  },
  {
    title: 'Atomic Habits',
    desc: 'An easy and proven way to build good habits.',
    categoryName: 'Books',
    price: 21.0,
    image: 'https://loremflickr.com/400/400/habitsbook',
  },

  // Clothing
  {
    title: 'Classic Cotton T-Shirt',
    desc: '100% organic cotton, breathable and soft.',
    categoryName: 'Clothing',
    price: 19.99,
    image: 'https://loremflickr.com/400/400/tshirt',
  },
  {
    title: 'Vintage Denim Jacket',
    desc: 'Timeless blue denim jacket with brass buttons.',
    categoryName: 'Clothing',
    price: 89.5,
    image: 'https://loremflickr.com/400/400/denimjacket',
  },
  {
    title: 'Running Sneakers',
    desc: 'Lightweight shoes with maximum shock absorption.',
    categoryName: 'Clothing',
    price: 119.99,
    image: 'https://loremflickr.com/400/400/sneakers',
  },
  {
    title: 'Wool Winter Beanie',
    desc: 'Keep warm with this knitted merino wool beanie.',
    categoryName: 'Clothing',
    price: 24.0,
    image: 'https://loremflickr.com/400/400/beanie',
  },
  {
    title: 'Waterproof Hiking Jacket',
    desc: 'Breathable rain jacket for outdoor adventures.',
    categoryName: 'Clothing',
    price: 149.95,
    image: 'https://loremflickr.com/400/400/hikingjacket',
  },
  {
    title: 'Athletic Sweatpants',
    desc: 'Comfortable joggers for workouts or lounging.',
    categoryName: 'Clothing',
    price: 45.0,
    image: 'https://loremflickr.com/400/400/sweatpants',
  },
  {
    title: 'Cashmere Crewneck Sweater',
    desc: 'Luxuriously soft and warm for chilly evenings.',
    categoryName: 'Clothing',
    price: 129.0,
    image: 'https://loremflickr.com/400/400/sweater',
  },
  {
    title: 'Casual Chino Pants',
    desc: 'Versatile trousers suitable for work or weekend wear.',
    categoryName: 'Clothing',
    price: 55.0,
    image: 'https://loremflickr.com/400/400/chinos',
  },
  {
    title: 'Summer Flowy Dress',
    desc: 'Lightweight floral dress perfect for hot days.',
    categoryName: 'Clothing',
    price: 65.99,
    image: 'https://loremflickr.com/400/400/dress',
  },
  {
    title: 'Leather Ankle Boots',
    desc: 'Durable and stylish boots with a slight heel.',
    categoryName: 'Clothing',
    price: 135.0,
    image: 'https://loremflickr.com/400/400/boots',
  },
  {
    title: 'Graphic Print Hoodie',
    desc: 'Cozy fleece pullover with a retro design.',
    categoryName: 'Clothing',
    price: 59.99,
    image: 'https://loremflickr.com/400/400/hoodie',
  },
  {
    title: 'Polarized Sunglasses',
    desc: 'UV400 protection with a classic aviator frame.',
    categoryName: 'Clothing',
    price: 85.0,
    image: 'https://loremflickr.com/400/400/sunglasses',
  },

  // Electronics
  {
    title: 'Noise-Cancelling Headphones',
    desc: 'Over-ear wireless headphones with ANC.',
    categoryName: 'Electronics',
    price: 299.99,
    image: 'https://loremflickr.com/400/400/headphones',
  },
  {
    title: 'Smartphone Pro Max',
    desc: 'Latest flagship phone with an incredible camera.',
    categoryName: 'Electronics',
    price: 1199.0,
    image: 'https://loremflickr.com/400/400/smartphone',
  },
  {
    title: 'Smart Home Hub',
    desc: 'Control all your connected devices from one screen.',
    categoryName: 'Electronics',
    price: 99.99,
    image: 'https://loremflickr.com/400/400/smarthome',
  },
  {
    title: 'Bluetooth Speaker',
    desc: 'Portable waterproof speaker with deep bass.',
    categoryName: 'Electronics',
    price: 79.5,
    image: 'https://loremflickr.com/400/400/speaker',
  },
  {
    title: '4K Action Camera',
    desc: 'Rugged camera for recording extreme sports.',
    categoryName: 'Electronics',
    price: 349.99,
    image: 'https://loremflickr.com/400/400/actioncamera',
  },
  {
    title: 'Fitness Tracker Watch',
    desc: 'Monitor heart rate, sleep, and daily steps.',
    categoryName: 'Electronics',
    price: 149.0,
    image: 'https://loremflickr.com/400/400/smartwatch',
  },
  {
    title: '65-inch OLED TV',
    desc: 'Stunning 4K resolution with infinite contrast.',
    categoryName: 'Electronics',
    price: 1799.99,
    image: 'https://loremflickr.com/400/400/tv',
  },
  {
    title: 'Smart Thermostat',
    desc: "Save energy by intelligently managing your home's climate.",
    categoryName: 'Electronics',
    price: 199.0,
    image: 'https://loremflickr.com/400/400/thermostat',
  },
  {
    title: 'Wireless Charging Pad',
    desc: 'Fast-charge your phone and earbuds simultaneously.',
    categoryName: 'Electronics',
    price: 39.99,
    image: 'https://loremflickr.com/400/400/wirelesscharger',
  },
  {
    title: 'E-Reader Paper Display',
    desc: 'Glare-free screen that reads like real paper.',
    categoryName: 'Electronics',
    price: 129.99,
    image: 'https://loremflickr.com/400/400/ereader',
  },
  {
    title: 'Drone with 4K Camera',
    desc: 'Capture breathtaking aerial footage with ease.',
    categoryName: 'Electronics',
    price: 499.0,
    image: 'https://loremflickr.com/400/400/drone',
  },
  {
    title: 'Portable Power Bank 20000mAh',
    desc: 'Charge your devices multiple times on the go.',
    categoryName: 'Electronics',
    price: 49.99,
    image: 'https://loremflickr.com/400/400/powerbank',
  },
];

export async function resetDatabase(db: any) {
  for (const key of Object.keys(schema)) {
    const table = (schema as any)[key];
    if (table && typeof table === 'object' && 'id' in table) {
      const { name } = getTableConfig(table);
      await db.run(sql.raw(`DELETE FROM ${name}`));
      await db.run(sql.raw(`DELETE FROM sqlite_sequence WHERE name='${name}'`));
    }
  }
}

export async function seedDatabase(db: any) {
  const BATCH_SIZE = 10;

  const categoriesToInsert = [
    'Computers',
    'Games',
    'Books',
    'Clothing',
    'Electronics',
  ].map((c) => ({ designation: c }));

  const insertedCategories = await db
    .insert(schema.productsCategories)
    .values(categoriesToInsert)
    .returning();

  const categoryMap = Object.fromEntries(
    insertedCategories.map((c: any) => [c.designation, c.id])
  );

  const productsToInsert = MOCK_PRODUCTS.map((product, i) => {
    // Deterministic prices and ratings based on index for stable testing
    const stableRating = Number.parseFloat((((i * 1.3) % 4) + 1).toFixed(1));
    const stableCount = (i * 123) % 5000;

    return {
      title: product.title,
      description: product.desc,
      image: product.image,
      price: product.price,
      categoryId: categoryMap[product.categoryName],
      ratingRate: stableRating,
      ratingCount: stableCount,
    };
  });

  for (let i = 0; i < productsToInsert.length; i += BATCH_SIZE) {
    const batch = productsToInsert.slice(i, i + BATCH_SIZE);
    await db.insert(schema.products).values(batch);
  }
}
