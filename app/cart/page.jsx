import PageHeader from "@/components/PageHeader";
import CartView from "@/components/CartView";
export const metadata = { title: "Shopping Cart", robots: { index: false } };
export default function CartPage() {
  return (<><PageHeader title="Shopping Cart" crumbs={[{ label: "Cart" }]} /><CartView /></>);
}
