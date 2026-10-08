import { Star } from "lucide-react";
export default function Rating({ value = 0, size = 14, showValue = true }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Rated ${value} out of 5`}>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} size={size} aria-hidden className={i <= Math.round(value) ? "fill-amber-400 text-amber-400" : "text-line fill-line"} />
        ))}
      </div>
      {showValue && <span className="text-xs font-medium text-ink/60">{value.toFixed(1)}</span>}
    </div>
  );
}
