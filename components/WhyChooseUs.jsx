import { Icon } from "./icons";
import Reveal from "./Reveal";
import { whyChooseUs } from "@/data/site";

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="section scroll-mt-24" aria-labelledby="why-title">
      <div className="container-x">
        <Reveal><h2 id="why-title" className="h-section max-w-2xl">Why Choose China Bangla Power Tech?</h2></Reveal>
        <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.07} className="group bg-white p-7 transition-colors hover:bg-brand-bluelight">
              <span className="grid h-12 w-12 place-items-center bg-brand-red text-white transition-colors group-hover:bg-brand-blue"><Icon name={f.icon} size={24} aria-hidden /></span>
              <h3 className="mt-5 font-display text-2xl font-bold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{f.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
