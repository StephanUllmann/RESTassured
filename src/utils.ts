export const DEFAULT_ITEM_LIMIT = 10;
export const DEFAULT_PAGE = 1;

export function getPagination({ page, limit }: Record<string, string>) {
  const rawLimit = parseInt(limit as string, 10);
  const rawPage = parseInt(page as string, 10);
  const safeLimit = Math.min(Math.max(rawLimit || DEFAULT_ITEM_LIMIT, 1), 100);
  const safePage = Math.max(rawPage || DEFAULT_PAGE, 1);
  const offset = (safePage - 1) * safeLimit;
  return { safeLimit, offset };
}

export function getProductFilters(query?: string) {
  return query
    ? {
        OR: [
          {
            title: {
              like: `%${query}%`,
            },
          },
          {
            description: {
              like: `%${query}%`,
            },
          },
        ],
      }
    : null;
}
