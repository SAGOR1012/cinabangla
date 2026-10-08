"use client";
import { useState } from "react";
import { MapPin, Phone, User, CheckCircle2 } from "lucide-react";
import { site } from "@/data/site";

export default function ContactSection() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: POST to your API route / email service.
    setSent(true);
  };
  return (
    <section className="section" aria-labelledby="contact-title">
      <div className="container-x grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <h2 id="contact-title" className="h-section">{site.name}</h2>
          <dl className="mt-6 space-y-5">
            <div className="flex gap-3"><Phone className="mt-1 shrink-0 text-brand-red" size={20} /><div><dt className="text-xs font-semibold text-brand-blue">Phone</dt><dd><a href={`tel:${site.phone}`} className="font-display text-3xl font-bold hover:text-brand-red">{site.phone}</a></dd></div></div>
            <div className="flex gap-3"><User className="mt-1 shrink-0 text-brand-red" size={20} /><div><dt className="text-xs font-semibold text-brand-blue">Chairman</dt><dd className="font-medium">{site.chairman}</dd></div></div>
            <div className="flex gap-3"><MapPin className="mt-1 shrink-0 text-brand-red" size={20} /><div><dt className="text-xs font-semibold text-brand-blue">Head Office</dt><dd className="font-medium">{site.headOfficeShort}</dd></div></div>
            <div className="flex gap-3"><MapPin className="mt-1 shrink-0 text-brand-red" size={20} /><div><dt className="text-xs font-semibold text-brand-blue">Branch Office</dt><dd className="font-medium">{site.branchOffice}</dd></div></div>
          </dl>
        </div>

        <div className="border border-line p-6 shadow-card sm:p-8 lg:col-span-3">
          {sent ? (
            <div className="py-10 text-center" role="status">
              <CheckCircle2 className="mx-auto text-green-600" size={48} />
              <h3 className="mt-3 font-display text-3xl font-bold">Message sent</h3>
              <p className="mt-1 text-ink/65">Thank you. We will call you on the number you provided.</p>
              <button className="btn-outline mt-5" onClick={() => setSent(false)}>Send another message</button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold">Name<input required name="name" className="field mt-1.5 font-normal" autoComplete="name" /></label>
              <label className="text-sm font-semibold">Phone<input required name="phone" type="tel" inputMode="tel" className="field mt-1.5 font-normal" autoComplete="tel" /></label>
              <label className="text-sm font-semibold sm:col-span-2">Email<input name="email" type="email" className="field mt-1.5 font-normal" autoComplete="email" /></label>
              <label className="text-sm font-semibold sm:col-span-2">Message<textarea required name="message" rows={5} className="field mt-1.5 font-normal" /></label>
              <button className="btn-red sm:col-span-2 sm:justify-self-start !px-8">Send Message</button>
            </form>
          )}
        </div>

        <div className="lg:col-span-5">
          <h3 className="mb-3 font-display text-2xl font-bold">Find our branch office</h3>
          <div className="aspect-[16/9] w-full overflow-hidden border border-line bg-mist sm:aspect-[21/9]">
            <iframe title={`Map: ${site.branchOffice}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full w-full"
              src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`} />
          </div>
        </div>
      </div>
    </section>
  );
}
