import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';
import { drizzle } from 'drizzle-orm/d1';
import z, { ZodError } from 'zod';
import { getPagination, getProductFilters, zValidator } from './utils';
import {
  insertProductSchema,
  productsCategories,
  relations,
} from './db/schema';
import { productQuerySchema } from './schemas';

const app = new Hono<{ Bindings: Env }>();
app.use('/*', cors());

app.get('/', async (c) => {
  const db = drizzle(c.env.assured_d1);
  const { success, results } = await db.run(`SELECT datetime('now');`);
  if (!success) {
    c.status(503);
    return c.json({ msg: 'DB unconnected' });
  }

  const time = (results[0] as { "datetime('now')": string })["datetime('now')"];
  return c.json({
    msg: 'Running',
    success,
    time,
  });
});

app.on(
  'GET',
  ['/products', '/products/category/:category'],
  zValidator('query', productQuerySchema),
  async (c) => {
    const env = c.env as Env;
    const db = drizzle(env.assured_d1, { relations });
    const queries = c.req.valid('query');
    let { category } = queries;
    const paramsCat = c.req.param('category');
    if (paramsCat) category = paramsCat;

    const { safeLimit: limit, offset } = getPagination(queries);
    const filters = getProductFilters({ ...queries, category });

    const rows = await db.query.products.findMany({
      with: { category: true },
      columns: { categoryId: false },
      limit,
      offset,
      where: filters as any,
    });
    return c.json(rows);
  }
);

app.get('/products/category', async (c) => {
  const db = drizzle(c.env.assured_d1);
  const rows = await db.select().from(productsCategories);
  return c.json(rows);
});

app.post('/products', zValidator('json', insertProductSchema), async (c) => {
  const body = c.req.valid('json');

  c.status(201);
  return c.json({ success: true, data: body });
});

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    c.status(err.status || 500);
    let message = err.message;
    if (err.cause instanceof ZodError) {
      message = z.prettifyError(err.cause);
      const zodErrors = z.treeifyError(err.cause);
      return c.json({ success: false, message, zodErrors });
    }
    return c.json({ success: false, message });
  }
  console.error(`${err}`);
  return c.text('Something went wrong :(', 500);
});

export default app;
