import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { drizzle } from 'drizzle-orm/d1';
import { getPagination, getProductFilters } from './utils';
import { productsCategories, relations } from './db/schema';

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

app.get('/products', async (c) => {
  const db = drizzle(c.env.assured_d1, { relations });
  const { page, limit, query, category } = c.req.query();
  const { safeLimit, offset } = getPagination({ page, limit });

  const filters = getProductFilters(query);

  let where = null;
  if (filters && category) {
    where = {
      AND: [filters, { category: { designation: { like: `%${category}%` } } }],
    };
  } else if (filters) {
    where = filters;
  } else if (category) {
    where = { category: { designation: { like: `%${category}%` } } };
  }

  const rows = await db.query.products.findMany({
    with: { category: true },
    columns: { categoryId: false },
    limit: safeLimit,
    offset,
    where: where as any,
  });
  return c.json(rows);
});

app.get('/products/category', async (c) => {
  const db = drizzle(c.env.assured_d1);
  const rows = await db.select().from(productsCategories);
  return c.json(rows);
});

app.get('/products/category/:category', async (c) => {
  const db = drizzle(c.env.assured_d1, { relations });
  const category = c.req.param('category');
  const { page, limit, query } = c.req.query();
  const { safeLimit, offset } = getPagination({ page, limit });

  const filters = getProductFilters(query);

  let where = null;
  if (filters && category) {
    where = {
      AND: [filters, { category: { designation: { like: `%${category}%` } } }],
    };
  } else if (filters) {
    where = filters;
  } else if (category) {
    where = { category: { designation: { like: `%${category}%` } } };
  }

  const rows = await db.query.products.findMany({
    with: { category: true },
    columns: { categoryId: false },
    limit: safeLimit,
    offset,
    where: where as any,
  });
  return c.json(rows);
});

app.onError((err, c) => {
  console.error(`${err}`);
  return c.text('Custom Error Message', 500);
});

export default app;
