import { Activity, Star, TrendingDown, TrendingUp } from "lucide-react";

export function calculateAverage(values: number[]) {
  if (!values.length) return 0;
  return values.reduce((total, value) => total + value, 0) / values.length;
}

export function getPerformanceLabel(score: number) {
  if (score >= 85) {
    return {
      label: "Excellent",
      className: "text-emerald-500",
      bgClass: "bg-emerald-500/10",
      borderClass: "border-emerald-500/20",
      icon: Star,
    };
  }
  if (score >= 70) {
    return {
      label: "Strong",
      className: "text-primary",
      bgClass: "bg-primary/10",
      borderClass: "border-primary/20",
      icon: TrendingUp,
    };
  }
  if (score >= 50) {
    return {
      label: "Developing",
      className: "text-amber-500",
      bgClass: "bg-amber-500/10",
      borderClass: "border-amber-500/20",
      icon: Activity,
    };
  }
  return {
    label: "Needs Improvement",
    className: "text-rose-500",
    bgClass: "bg-rose-500/10",
    borderClass: "border-rose-500/20",
    icon: TrendingDown,
  };
}