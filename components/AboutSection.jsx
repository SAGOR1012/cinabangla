import Image from "next/image";
import { Check } from "lucide-react";
import Reveal from "./Reveal";
import { aboutPoints, site } from "@/data/site";

export default function AboutSection() {
  return (
    <section className="section bg-mist" aria-labelledby="about-title">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="grid grid-cols-5 grid-rows-2 gap-3">
            <div className="relative col-span-3 row-span-2 aspect-[3/4] overflow-hidden bg-ink">
              <Image src="/images/mileage-square.jpg" alt="Mileage Power battery" fill sizes="(min-width:1024px) 30vw, 60vw" className="object-cover" />
            </div>
            <div className="relative col-span-2 bg-white"><Image src="/images/china-gold.png" alt="China Gold water battery" fill sizes="20vw" className="object-contain p-3" /></div>
            <div className="relative col-span-2 bg-white"><Image src="/images/eilong-aluminium.png" alt="Eilong charger" fill sizes="20vw" className="object-contain p-3" /></div>
          </div>
          <div className="absolute -bottom-5 left-4 flex items-center gap-3 border border-line bg-white p-3 shadow-lift">
            <Image src="/images/logo.png" alt={`${site.name} logo`} width={900} height={850} className="h-16 w-auto" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 id="about-title" className="h-section">Powering Bangladesh With Reliable Energy Solutions</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            {site.name} is a battery and power solutions company based in Dhaka. We bring together batteries, chargers, solar products and accessories so customers can find dependable power in one place.
          </p>
          <ul className="mt-5 space-y-2.5">
            {aboutPoints.map((p) => <li key={p} className="flex gap-2.5 text-ink/80"><Check size={18} className="mt-1 shrink-0 text-brand-red" />{p}</li>)}
          </ul>
          <dl className="mt-7 grid gap-px border border-line bg-line sm:grid-cols-3">
            {[["Chairman", site.chairman], ["Head Office", site.headOffice], ["Branch Office", site.branchOffice]].map(([k, v]) => (
              <div key={k} className="bg-white p-4"><dt className="text-xs font-semibold text-brand-blue">{k}</dt><dd className="mt-1 text-sm font-medium">{v}</dd></div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
