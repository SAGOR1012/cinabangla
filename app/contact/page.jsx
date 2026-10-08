import PageHeader from "@/components/PageHeader";
import ContactSection from "@/components/ContactSection";
export const metadata = {
  title: "Contact Us",
  description: "Call 01335219984 or visit China Bangla Power Tech in Gulshan and Hazaribagh, Dhaka.",
  alternates: { canonical: "/contact" },
};
export default function ContactPage() {
  return (<><PageHeader title="Contact" subtitle="Talk to us about batteries, chargers and power solutions." crumbs={[{ label: "Contact" }]} /><ContactSection /></>);
}
