import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { quickLinks, site } from "@/data/site";
import { categories } from "@/data/categories";

export default function Footer() {
  return (
    <footer className="border-t-4 border-brand-red bg-ink text-white">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="inline-block rounded bg-white p-2">
            <Image src="/images/logo.png" alt={`${site.name} logo`} width={900} height={850} className="h-24 w-auto" />
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            {site.name} provides reliable battery, charger, solar and power solutions in Bangladesh.
          </p>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
          <ul className="space-y-2.5 text-sm text-white/70">
            {quickLinks.map((l) => <li key={l.label}><Link href={l.href} className="hover:text-white">{l.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Products</h3>
          <ul className="space-y-2.5 text-sm text-white/70">
            {categories.slice(0, 5).map((c) => <li key={c.id}><Link href={`/products?category=${c.id}`} className="hover:text-white">{c.name}</Link></li>)}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Contact</h3>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex gap-2"><Phone size={16} className="mt-0.5 shrink-0 text-brand-red" /><a href={`tel:${site.phone}`} className="hover:text-white">{site.phone}</a></li>
            <li className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-brand-red" />{site.headOfficeShort}</li>
            <li className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-brand-red" />{site.branchOffice}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/55">
        © 2026 {site.name}. All Rights Reserved.
      </div>
    </footer>
  );
}
