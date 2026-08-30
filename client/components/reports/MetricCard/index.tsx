import { Card, CardContent, CardHeader, CardTitle } from "@/client/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: any;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  colorClass?: string;
  bgClass?: string;
}

export function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  colorClass = "text-primary",
  bgClass = "bg-primary/10",
}: MetricCardProps) {
  return (
    <Card className="border-border bg-card transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={`rounded-lg ${bgClass} p-2 ${colorClass}`}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        {trend && trendValue && (
          <div
            className={`mt-3 flex items-center text-xs font-medium ${
              trend === "up"
                ? "text-emerald-500"
                : trend === "down"
                ? "text-rose-500"
                : "text-muted-foreground"
            }`}
          >
            {trend === "up" && <TrendingUp className="mr-1 h-3 w-3" />}
            {trend === "down" && <TrendingDown className="mr-1 h-3 w-3" />}
            {trendValue}
          </div>
        )}
      </CardContent>
    </Card>
  );
}