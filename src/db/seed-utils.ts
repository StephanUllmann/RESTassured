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
  },
  {
    title: 'Desktop Workstation X',
    desc: 'Tower PC optimized for 3D rendering and heavy workloads.',
    categoryName: 'Computers',
  },
  {
    title: 'UltraWide Monitor 34',
    desc: 'Curved 34-inch display with 144Hz refresh rate.',
    categoryName: 'Computers',
  },
  {
    title: 'Mechanical Keyboard',
    desc: 'Tactile mechanical keyboard with customizable RGB.',
    categoryName: 'Computers',
  },
  {
    title: 'Wireless Ergonomic Mouse',
    desc: 'Vertical mouse designed to prevent wrist strain.',
    categoryName: 'Computers',
  },
  {
    title: 'NVMe SSD 2TB',
    desc: 'Ultra-fast PCIe Gen4 storage for gaming and productivity.',
    categoryName: 'Computers',
  },
  {
    title: 'Compact Mini PC',
    desc: 'Space-saving desktop perfect for home offices.',
    categoryName: 'Computers',
  },
  {
    title: 'USB-C Docking Station',
    desc: "Expand your laptop's connectivity with dual HDMI and 4 USB ports.",
    categoryName: 'Computers',
  },
  {
    title: '4K Web Camera',
    desc: 'Crystal clear video calls with auto-focus and built-in mic.',
    categoryName: 'Computers',
  },
  {
    title: '32GB DDR5 RAM Kit',
    desc: 'Next-gen memory for lightning-fast multitasking.',
    categoryName: 'Computers',
  },
  {
    title: 'Dual Monitor Arm',
    desc: 'Fully adjustable desk mount for two 27-inch screens.',
    categoryName: 'Computers',
  },
  {
    title: 'High-Airflow PC Case',
    desc: 'Mid-tower case with tempered glass and 4 RGB fans.',
    categoryName: 'Computers',
  },

  // Games
  {
    title: 'Elden Ring: Definitive',
    desc: 'Epic open-world fantasy action RPG.',
    categoryName: 'Games',
  },
  {
    title: 'Cyber City 2089',
    desc: 'Sci-fi adventure game with immersive graphics.',
    categoryName: 'Games',
  },
  {
    title: 'Cozy Farm Simulator',
    desc: 'Relaxing farming and life simulation game.',
    categoryName: 'Games',
  },
  {
    title: 'Galactic Racer',
    desc: 'High-speed zero-gravity racing.',
    categoryName: 'Games',
  },
  {
    title: 'Mystery Mansion',
    desc: 'Co-op puzzle and survival horror.',
    categoryName: 'Games',
  },
  {
    title: 'Retro Arcade Collection',
    desc: '30 classic arcade games in one bundle.',
    categoryName: 'Games',
  },
  {
    title: 'Fantasy RPG VIII',
    desc: 'A sprawling saga of magic, crystals, and rebellion.',
    categoryName: 'Games',
  },
  {
    title: 'Tactical Shooter Pro',
    desc: 'Competitive 5v5 multiplayer tactical FPS.',
    categoryName: 'Games',
  },
  {
    title: 'Super Platformer Bros',
    desc: 'Classic jump-and-run action for all ages.',
    categoryName: 'Games',
  },
  {
    title: 'Grand Strategy World',
    desc: 'Conquer continents and build your empire from scratch.',
    categoryName: 'Games',
  },
  {
    title: 'Fighting Tournament 5',
    desc: 'Next-gen 2D fighting game with a massive roster.',
    categoryName: 'Games',
  },
  {
    title: 'VR Beat Rhythm',
    desc: 'Slice blocks to the beat of adrenaline-pumping music.',
    categoryName: 'Games',
  },

  // Books
  {
    title: 'The Pragmatic Programmer',
    desc: 'Your journey to mastery in software engineering.',
    categoryName: 'Books',
  },
  {
    title: 'Sci-Fi Anthology',
    desc: 'A collection of short stories from the future.',
    categoryName: 'Books',
  },
  {
    title: 'Cooking for Beginners',
    desc: '100 easy recipes for everyday meals.',
    categoryName: 'Books',
  },
  {
    title: 'History of the Ancient World',
    desc: 'A deep dive into ancient civilizations.',
    categoryName: 'Books',
  },
  {
    title: 'The Art of War',
    desc: 'Classic treatise on strategy and tactics.',
    categoryName: 'Books',
  },
  {
    title: 'Data-Intensive Applications',
    desc: 'The definitive guide to distributed systems.',
    categoryName: 'Books',
  },
  {
    title: 'Fantasy Epic: Book One',
    desc: 'The beginning of a legendary trilogy.',
    categoryName: 'Books',
  },
  {
    title: 'Modern Web Development',
    desc: 'Mastering React, TypeScript, and full-stack architecture.',
    categoryName: 'Books',
  },
  {
    title: 'The Psychology of Money',
    desc: 'Timeless lessons on wealth, greed, and happiness.',
    categoryName: 'Books',
  },
  {
    title: 'Mystery of the Old Manor',
    desc: 'A thrilling whodunit that will keep you guessing.',
    categoryName: 'Books',
  },
  {
    title: 'Learn Python in 30 Days',
    desc: 'A step-by-step crash course for beginners.',
    categoryName: 'Books',
  },
  {
    title: 'Atomic Habits',
    desc: 'An easy and proven way to build good habits.',
    categoryName: 'Books',
  },

  // Clothing
  {
    title: 'Classic Cotton T-Shirt',
    desc: '100% organic cotton, breathable and soft.',
    categoryName: 'Clothing',
  },
  {
    title: 'Vintage Denim Jacket',
    desc: 'Timeless blue denim jacket with brass buttons.',
    categoryName: 'Clothing',
  },
  {
    title: 'Running Sneakers',
    desc: 'Lightweight shoes with maximum shock absorption.',
    categoryName: 'Clothing',
  },
  {
    title: 'Wool Winter Beanie',
    desc: 'Keep warm with this knitted merino wool beanie.',
    categoryName: 'Clothing',
  },
  {
    title: 'Waterproof Hiking Jacket',
    desc: 'Breathable rain jacket for outdoor adventures.',
    categoryName: 'Clothing',
  },
  {
    title: 'Athletic Sweatpants',
    desc: 'Comfortable joggers for workouts or lounging.',
    categoryName: 'Clothing',
  },
  {
    title: 'Cashmere Crewneck Sweater',
    desc: 'Luxuriously soft and warm for chilly evenings.',
    categoryName: 'Clothing',
  },
  {
    title: 'Casual Chino Pants',
    desc: 'Versatile trousers suitable for work or weekend wear.',
    categoryName: 'Clothing',
  },
  {
    title: 'Summer Flowy Dress',
    desc: 'Lightweight floral dress perfect for hot days.',
    categoryName: 'Clothing',
  },
  {
    title: 'Leather Ankle Boots',
    desc: 'Durable and stylish boots with a slight heel.',
    categoryName: 'Clothing',
  },
  {
    title: 'Graphic Print Hoodie',
    desc: 'Cozy fleece pullover with a retro design.',
    categoryName: 'Clothing',
  },
  {
    title: 'Polarized Sunglasses',
    desc: 'UV400 protection with a classic aviator frame.',
    categoryName: 'Clothing',
  },

  // Electronics
  {
    title: 'Noise-Cancelling Headphones',
    desc: 'Over-ear wireless headphones with ANC.',
    categoryName: 'Electronics',
  },
  {
    title: 'Smartphone Pro Max',
    desc: 'Latest flagship phone with an incredible camera.',
    categoryName: 'Electronics',
  },
  {
    title: 'Smart Home Hub',
    desc: 'Control all your connected devices from one screen.',
    categoryName: 'Electronics',
  },
  {
    title: 'Bluetooth Speaker',
    desc: 'Portable waterproof speaker with deep bass.',
    categoryName: 'Electronics',
  },
  {
    title: '4K Action Camera',
    desc: 'Rugged camera for recording extreme sports.',
    categoryName: 'Electronics',
  },
  {
    title: 'Fitness Tracker Watch',
    desc: 'Monitor heart rate, sleep, and daily steps.',
    categoryName: 'Electronics',
  },
  {
    title: '65-inch OLED TV',
    desc: 'Stunning 4K resolution with infinite contrast.',
    categoryName: 'Electronics',
  },
  {
    title: 'Smart Thermostat',
    desc: "Save energy by intelligently managing your home's climate.",
    categoryName: 'Electronics',
  },
  {
    title: 'Wireless Charging Pad',
    desc: 'Fast-charge your phone and earbuds simultaneously.',
    categoryName: 'Electronics',
  },
  {
    title: 'E-Reader Paper Display',
    desc: 'Glare-free screen that reads like real paper.',
    categoryName: 'Electronics',
  },
  {
    title: 'Drone with 4K Camera',
    desc: 'Capture breathtaking aerial footage with ease.',
    categoryName: 'Electronics',
  },
  {
    title: 'Portable Power Bank 20000mAh',
    desc: 'Charge your devices multiple times on the go.',
    categoryName: 'Electronics',
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
    const stablePrice = Number.parseFloat((((i * 37) % 1500) + 5).toFixed(2));
    const stableRating = Number.parseFloat((((i * 1.3) % 4) + 1).toFixed(1));
    const stableCount = (i * 123) % 5000;

    return {
      title: product.title,
      description: product.desc,
      image: `https://picsum.photos/seed/product${i + 1}/800/800`,
      price: stablePrice,
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
