# China Bangla Power Tech: Next.js storefront

Next.js 15 (App Router), React JSX, Tailwind CSS 3, Framer Motion, Lucide React.

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```
Set `NEXT_PUBLIC_SITE_URL=https://your-domain.com` for correct SEO URLs (sitemap, Open Graph, JSON-LD).

## Edit content
| What | Where |
|---|---|
| Phone, address, chairman, nav, hero badges, slider, "Why us", stats | `data/site.js` |
| Products (price, rating, stock, specs, images) | `data/products.js` |
| Categories | `data/categories.js` |
| Brand colours | `tailwind.config.js` (taken from the logo wordmark) |
| Images | `public/images/` |

## Connect a backend later
Pages and components only call the async functions in `lib/api.js`
(`getProducts`, `getProductById`, `getCategories`, ...). Replace their bodies with `fetch()` or a MongoDB query.
Order and contact submissions have `TODO` markers in `components/CheckoutForm.jsx` and `components/ContactSection.jsx`.
Cart and wishlist live in `context/StoreContext.jsx` (persisted to localStorage).

## Placeholders to replace before launch
- Prices, old prices (discount badges) and star ratings in `data/products.js`
- Solar Battery and Accessories have no photo yet (an icon panel is shown)
- Stats in `data/site.js` show only verifiable values; add confirmed figures there
- Site URL, and bKash/Nagad payment instructions
# cinabangla
