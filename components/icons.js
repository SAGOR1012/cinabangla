import { Zap, BatteryCharging, ShieldCheck, BadgeCheck, Headset, Tag, Gauge, Car, Droplets, Battery, Sun, Cable, Package } from "lucide-react";
export const iconMap = { Zap, BatteryCharging, ShieldCheck, BadgeCheck, Headset, Tag, Gauge, Car, Droplets, Battery, Sun, Cable, Package };
export const Icon = ({ name, ...props }) => { const C = iconMap[name] || Package; return <C {...props} />; };
