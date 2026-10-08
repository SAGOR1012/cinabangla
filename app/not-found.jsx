import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container-x section text-center">
      <h1 className="font-display text-6xl font-bold text-brand-red">404</h1>
      <p className="mt-3 text-ink/70">We couldn't find that page.</p>
      <Link href="/products" className="btn-red mt-6">Browse products</Link>
    </div>
  );
}
