// All editable site-wide content lives here.
export const site = {
  name: "China Bangla Power Tech",
  tagline: "World Power at Hand",
  title: "China Bangla Power Tech | Battery & Power Solutions",
  description:
    "China Bangla Power Tech provides reliable battery, charger, solar and power solutions in Bangladesh.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com", // TODO: set real domain
  phone: "01335219984",
  chairman: "MD Samsul Islam",
  headOffice: "Gulshan, Dhaka, Bangladesh",
  headOfficeShort: "Gulshan, Dhaka",
  branchOffice: "76, Kalunagar, Hazaribagh, Dhaka 1211",
  mapQuery: "76 Kalunagar, Hazaribagh, Dhaka 1211",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "About Us", href: "/about" },
  { label: "Why Choose Us", href: "/#why-us" },
  { label: "Contact", href: "/contact" },
];

export const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const heroBadges = [
  { icon: "Zap", label: "High Performance" },
  { icon: "BatteryCharging", label: "Long Lasting" },
  { icon: "ShieldCheck", label: "Reliable Power" },
];

export const slides = [
  {
    title: "Power That Moves You",
    subtitle: "Reliable batteries for reliable performance.",
    cta: { label: "Shop Batteries", href: "/products" },
    theme: "light",
    images: [
      { src: "/images/evon-ultra.png", alt: "EVON Ultra automotive battery" },
      { src: "/images/china-gold.png", alt: "China Gold water battery 12V-200" },
    ],
  },
  {
    title: "Mileage Power",
    subtitle: "Built for performance. Designed for reliability.",
    cta: { label: "Explore Mileage Power", href: "/products/mileage-power-400ah" },
    theme: "dark",
    images: [{ src: "/images/mileage-power.jpg", alt: "Mileage Power 400Ah dry battery", cover: true }],
  },
  {
    title: "Complete Power Solutions",
    subtitle: "Battery, charger, solar and energy solutions under one roof.",
    cta: { label: "View All Categories", href: "/categories" },
    theme: "blue",
    images: [
      { src: "/images/eilong-aluminium.png", alt: "Eilong quick charger, aluminium" },
      { src: "/images/eilong-copper.png", alt: "Eilong quick charger, copper" },
      { src: "/images/china-gold.png", alt: "China Gold water battery" },
    ],
  },
];

export const whyChooseUs = [
  { icon: "BadgeCheck", title: "Premium Quality", text: "Reliable products selected for performance and durability." },
  { icon: "Headset", title: "Trusted Service", text: "Professional customer support and dependable service." },
  { icon: "Tag", title: "Competitive Pricing", text: "Quality power solutions at competitive prices." },
  { icon: "Gauge", title: "Reliable Performance", text: "Products designed to deliver consistent performance." },
];

// Stats: only values that can be verified from the site itself are enabled.
// "categories" and "products" are computed from the data files in components/Stats.jsx.
// TODO: replace with real, confirmed figures before publishing, e.g.
// { value: "1000+", label: "Happy Customers" }, { value: "5+", label: "Years of Experience" }.
export const stats = [
  { key: "categories", label: "Product Categories" },
  { key: "products", label: "Products Listed" },
  { value: "2", label: "Offices in Dhaka" },
  { value: "01335219984", label: "Call to Order", href: "tel:01335219984" },
];

export const aboutPoints = [
  "Battery, charger, solar and power accessories under one roof",
  "Own-brand products including Mileage Power, China Gold and Eilong",
  "Head office in Gulshan and branch office in Hazaribagh, Dhaka",
];
