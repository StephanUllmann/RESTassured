// @ts-ignore
import { env } from 'cloudflare:test';
import { describe, expect, test } from 'vitest';
import app from './index';
import {
  insertProductSchema,
  productWithCategorySchema,
  selectCategorySchema,
} from './db/schema';
import z from 'zod';

const rootResponseSchema = z.object({
  msg: z.literal('Running'),
  success: z.literal(true),
  time: z.string(),
});

const parseProducts = (data: unknown) =>
  z.array(productWithCategorySchema).parse(data);

const parseCategories = (data: unknown) =>
  z.array(selectCategorySchema).parse(data);

const postResponseSchema = z.object({
  success: z.literal(true),
  data: insertProductSchema,
});

const errorResponseSchema = z.object({
  success: z.literal(false),
  message: z.unknown(),
  zodErrors: z.unknown().optional(),
});

describe('GET /', () => {
  test('returns a success message with the current time', async () => {
    const res = await app.request('/', {}, env);
    expect(res.status).toBe(200);

    const json = rootResponseSchema.parse(await res.json());

    expect(json.msg).toBe('Running');
    expect(json.success).toBe(true);
    expect(json.time).toBeDefined();
  });
});

describe('GET /products', () => {
  test('returns 10 products by default', async () => {
    const res = await app.request('/products', {}, env);
    expect(res.status).toBe(200);

    const json = parseProducts(await res.json());
    expect(json.length).toBe(10);
  });

  test('page 2 returns with starting id 11', async () => {
    const res = await app.request('/products?page=2', {}, env);
    expect(res.status).toBe(200);

    const json = parseProducts(await res.json());

    expect(json.length).toBe(10);
    expect(json[0].id).toBe(11);
  });

  test('page 3, limit 1 returns id 3', async () => {
    const res = await app.request('/products?page=3&limit=1', {}, env);
    expect(res.status).toBe(200);

    const json = parseProducts(await res.json());

    expect(json.length).toBe(1);
    expect(json[0].id).toBe(3);
  });

  test('filters by category', async () => {
    const res = await app.request('/products?category=Computers', {}, env);
    expect(res.status).toBe(200);

    const json = parseProducts(await res.json());

    expect(json.every((p) => p.category.designation === 'Computers')).toBe(
      true
    );
  });

  test('category by path param', async () => {
    const res = await app.request('/products/category/book', {}, env);
    expect(res.status).toBe(200);

    const json = parseProducts(await res.json());

    expect(json.every((p) => p.category.designation === 'Books')).toBe(true);
  });

  test('filters by query', async () => {
    const query = 'phone';
    const res = await app.request(`/products?query=${query}`, {}, env);
    expect(res.status).toBe(200);

    const json = parseProducts(await res.json());

    expect(
      json.every(
        (p) => p.title.includes(query) || p.description.includes(query)
      )
    ).toBe(true);
  });

  test('filters categories by query', async () => {
    const query = 'key';
    const category = 'Electronics';
    const res = await app.request(
      `/products?query=${query}&category=${category}`,
      {},
      env
    );
    expect(res.status).toBe(200);

    const json = parseProducts(await res.json());

    expect(
      json.every(
        (p) =>
          p.title.includes(query) ||
          (p.description.includes(query) && p.category.designation === category)
      )
    ).toBe(true);
  });

  test('filters by minPrice', async () => {
    const res = await app.request('/products?minPrice=500', {}, env);
    expect(res.status).toBe(200);

    const json = parseProducts(await res.json());

    expect(json.every((p) => p.price >= 500)).toBe(true);
  });

  test('filters by maxPrice', async () => {
    const res = await app.request('/products?maxPrice=100', {}, env);
    expect(res.status).toBe(200);

    const json = parseProducts(await res.json());

    expect(json.every((p) => p.price <= 100)).toBe(true);
  });

  test('filters by minRating', async () => {
    const res = await app.request('/products?minRating=4', {}, env);
    expect(res.status).toBe(200);

    const json = parseProducts(await res.json());

    expect(json.every((p) => p.ratingRate! >= 4)).toBe(true);
  });

  test('filters by maxRating', async () => {
    const res = await app.request('/products?maxRating=3', {}, env);
    expect(res.status).toBe(200);

    const json = parseProducts(await res.json());

    expect(json.every((p) => p.ratingRate! <= 3)).toBe(true);
  });

  test('returns 400 for invalid page parameter', async () => {
    const res = await app.request('/products?page=-1', {}, env);
    expect(res.status).toBe(400);
  });

  test('returns 400 for limit exceeding maximum', async () => {
    const res = await app.request('/products?limit=101', {}, env);
    expect(res.status).toBe(400);
  });

  test('returns 400 for invalid rating range', async () => {
    const res = await app.request('/products?minRating=6', {}, env);
    expect(res.status).toBe(400);
  });
});

describe('GET /products/categories', () => {
  test('returns all categories', async () => {
    const res = await app.request('/products/category', {}, env);
    expect(res.status).toBe(200);
    const json = parseCategories(await res.json());
    expect(json.length).toBeGreaterThan(0);
    expect(json[0].id).toBeDefined();
    expect(json[0].designation).toBeDefined();
  });
});

describe('POST /products', () => {
  test('successfully add a product', async () => {
    const newProduct = {
      title: 'Test Product',
      description: 'A test product for validation',
      image: 'https://example.com/image.png',
      price: 19.99,
      categoryId: 1,
    };
    const res = await app.request(
      '/products',
      {
        method: 'POST',
        body: JSON.stringify(newProduct),
        headers: { 'Content-Type': 'application/json' },
      },
      env
    );
    expect(res.status).toBe(201);
    const data = await res.json();
    console.log('DATA:', data);
    const json = postResponseSchema.parse(data);
    expect(json.success).toBe(true);
    expect(json.data.title).toBe(newProduct.title);
    expect(json.data.description).toBe(newProduct.description);
    expect(json.data.price).toBe(newProduct.price);
    expect(json.data.categoryId).toBe(newProduct.categoryId);
  });

  test('return 400 for invalid request body', async () => {
    const invalidProduct = {
      title: 'Invalid Product',
      price: 'not a number',
    };
    const res = await app.request(
      '/products',
      {
        method: 'POST',
        body: JSON.stringify(invalidProduct),
        headers: { 'Content-Type': 'application/json' },
      },
      env
    );
    expect(res.status).toBe(400);
    const json = errorResponseSchema.parse(await res.json());
    expect(json.success).toBe(false);
  });
});
