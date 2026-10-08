import PageHeader from "@/components/PageHeader";
import AboutSection from "@/components/AboutSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";
export const metadata = {
  title: "About Us",
  description: "China Bangla Power Tech is a battery and power solutions company based in Dhaka, Bangladesh.",
  alternates: { canonical: "/about" },
};
export default function AboutPage() {
  return (<><PageHeader title="About Us" crumbs={[{ label: "About" }]} /><AboutSection /><WhyChooseUs /><Stats /><CTA /></>);
}
