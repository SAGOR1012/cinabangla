import PageHeader from "@/components/PageHeader";
import CheckoutForm from "@/components/CheckoutForm";
export const metadata = { title: "Checkout", robots: { index: false } };
export default function CheckoutPage() {
  return (<><PageHeader title="Checkout" crumbs={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]} /><CheckoutForm /></>);
}
