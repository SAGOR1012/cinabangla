import Link from "next/link";
import Image from "next/image";
export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-brand-red text-white">
      <Image src="/images/mileage-power.jpg" alt="" fill sizes="100vw" className="object-cover opacity-10 mix-blend-multiply" aria-hidden />
      <div className="container-x relative flex flex-col items-start justify-between gap-8 py-14 md:flex-row md:items-center md:py-20">
        <div>
          <h2 className="font-display text-4xl font-extrabold md:text-6xl">Ready to Power Your Journey?</h2>
          <p className="mt-3 max-w-xl text-lg text-white/90">Explore our complete range of battery and power solutions.</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link href="/products" className="btn bg-white !px-8 !py-3.5 text-base text-brand-reddark hover:bg-ink hover:text-white">Shop Now</Link>
          <Link href="/contact" className="btn-ghost-light !px-8 !py-3.5 text-base">Contact Us</Link>
        </div>
      </div>
    </section>
  );
}
