type ProductFiltersInput = {
  query?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  maxRating?: number;
  category?: string;
};

export const DEFAULT_ITEM_LIMIT = 10;
export const DEFAULT_PAGE = 1;

export function getPagination({
  page,
  limit,
}: {
  page?: number;
  limit?: number;
}) {
  const safeLimit = Math.min(Math.max(limit ?? DEFAULT_ITEM_LIMIT, 1), 100);
  const safePage = Math.max(page ?? DEFAULT_PAGE, 1);
  const offset = (safePage - 1) * safeLimit;
  return { safeLimit, offset };
}

export function getProductFilters({
  query,
  minPrice,
  maxPrice,
  minRating,
  maxRating,
  category,
}: ProductFiltersInput) {
  const conditions: object[] = [];

  if (query) {
    conditions.push({
      OR: [
        { title: { like: `%${query}%` } },
        { description: { like: `%${query}%` } },
      ],
    });
  }

  if (minPrice !== undefined) {
    conditions.push({ price: { gte: minPrice } });
  }
  if (maxPrice !== undefined) {
    conditions.push({ price: { lte: maxPrice } });
  }

  if (minRating !== undefined) {
    conditions.push({ ratingRate: { gte: minRating } });
  }
  if (maxRating !== undefined) {
    conditions.push({ ratingRate: { lte: maxRating } });
  }
  if (category !== undefined) {
    conditions.push({ category: { designation: { like: `%${category}%` } } });
  }

  if (conditions.length === 0) return null;
  if (conditions.length === 1) return conditions[0];
  return { AND: conditions };
}
