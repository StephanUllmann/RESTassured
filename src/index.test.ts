// @ts-ignore
import { env } from 'cloudflare:test';
import { describe, expect, test } from 'vitest';
import app from './index';
import { productWithCategorySchema } from './db/schema';
import z from 'zod';

const rootResponseSchema = z.object({
  msg: z.literal('Running'),
  success: z.literal(true),
  time: z.string(),
});

const parseProducts = (data: unknown) =>
  z.array(productWithCategorySchema).parse(data);

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
});
