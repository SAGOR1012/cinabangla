import { Barlow_Condensed, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { getProducts } from "@/lib/api";
import { StoreProvider } from "@/context/StoreContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";

const display = Barlow_Condensed({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-display", display: "swap" });
const body = Hind_Siliguri({ subsets: ["latin", "bengali"], weight: ["400", "500", "600", "700"], variable: "--font-body", display: "swap" });

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  keywords: ["battery Bangladesh", "Mileage Power", "dry battery", "water battery", "battery charger", "solar battery", "China Bangla Power Tech"],
  openGraph: {
    title: site.title, description: site.description, siteName: site.name, type: "website", locale: "en_BD",
    images: [{ url: "/images/mileage-power.jpg", width: 1672, height: 941, alt: "Mileage Power 400Ah dry battery" }],
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, images: ["/images/mileage-power.jpg"] },
  icons: { icon: "/images/logo.png" },
};

export const viewport = { themeColor: "#0A4AA6" };

export default async function RootLayout({ children }) {
  const products = await getProducts();
  const orgJsonLd = {
    "@context": "https://schema.org", "@type": "Organization", name: site.name, url: site.url,
    logo: `${site.url}/images/logo.png`, telephone: site.phone,
    address: { "@type": "PostalAddress", streetAddress: site.branchOffice, addressLocality: "Dhaka", addressCountry: "BD" },
  };
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <StoreProvider products={products}>
          <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-white focus:p-3">Skip to content</a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <Toast />
        </StoreProvider>
      </body>
    </html>
  );
}
