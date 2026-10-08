const nf = new Intl.NumberFormat("en-IN");
export const formatPrice = (n) => `৳ ${nf.format(n)}`;
export const discountPercent = (p) => (p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0);
export const stockLabel = { in: "In stock", low: "Low stock", out: "Out of stock" };
