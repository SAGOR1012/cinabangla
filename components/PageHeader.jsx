import Link from "next/link";
export default function PageHeader({ title, subtitle, crumbs = [] }) {
  return (
    <div className="border-b border-line bg-mist">
      <div className="container-x py-10 md:py-14">
        <nav aria-label="Breadcrumb" className="mb-3 text-sm text-ink/60">
          <Link href="/" className="hover:text-brand-blue">Home</Link>
          {crumbs.map((c) => (<span key={c.label}> / {c.href ? <Link href={c.href} className="hover:text-brand-blue">{c.label}</Link> : c.label}</span>))}
        </nav>
        <h1 className="font-display text-4xl font-bold md:text-5xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-ink/65">{subtitle}</p>}
      </div>
    </div>
  );
}
