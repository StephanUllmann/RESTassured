import { defineRelations } from 'drizzle-orm';
import {
  customType,
  int,
  real,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import * as z from 'zod/mini';

const cents = customType<{ data: number; driverData: number }>({
  dataType() {
    return 'integer';
  },
  toDriver(val: number): number {
    return Math.round(val * 100);
  },
  fromDriver(val: number): number {
    return Number.parseFloat((val / 100).toFixed(2));
  },
});

export const products = sqliteTable(
  'products',
  {
    id: int().primaryKey({ autoIncrement: true }),
    title: text().notNull(),
    description: text().notNull(),
    image: text().notNull(),
    price: cents().notNull(),
    categoryId: int()
      .references(() => productsCategories.id)
      .notNull(),
    ratingRate: real('rating_rate').default(0),
    ratingCount: int('rating_count').default(0),
  },
  (table) => [uniqueIndex('title_idx').on(table.title)]
);

export const productsCategories = sqliteTable(
  'products_categories',
  {
    id: int().primaryKey({ autoIncrement: true }),
    designation: text({ length: 128 }).notNull(),
  },
  (table) => [uniqueIndex('designation_idx').on(table.designation)]
);

export const relations = defineRelations(
  { products, productsCategories },
  (r) => ({
    products: {
      category: r.one.productsCategories({
        from: r.products.categoryId,
        to: r.productsCategories.id,
      }),
    },
    productsCategories: {
      products: r.many.products(),
    },
  })
);

export const insertProductSchema = createInsertSchema(products, {
  image: (schema) => schema.check(z.url()),
});
export const insertProductCategorySchema =
  createInsertSchema(productsCategories);

export const selectProductSchema = createSelectSchema(products);
export const selectCategorySchema = createSelectSchema(productsCategories);
export const productWithCategorySchema = selectProductSchema.extend({
  category: selectCategorySchema,
});

export type ProductWithCategory = z.infer<typeof productWithCategorySchema>;
