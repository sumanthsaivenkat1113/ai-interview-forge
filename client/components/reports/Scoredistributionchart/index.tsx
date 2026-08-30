import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/client/components/ui/card";
import { BarChart3 } from "lucide-react";
import { CHART_TEXT_COLOR, DANGER_COLOR, PRIMARY_COLOR, SUCCESS_COLOR, WARNING_COLOR } from "@/client/constants/reports";

export function ScoreDistributionChart({ scores }: { scores: number[] }) {
  const ranges = [
    { label: "0-49", count: 0, color: DANGER_COLOR, name: "Needs Improvement" },
    { label: "50-69", count: 0, color: WARNING_COLOR, name: "Developing" },
    { label: "70-84", count: 0, color: PRIMARY_COLOR, name: "Strong" },
    { label: "85-100", count: 0, color: SUCCESS_COLOR, name: "Excellent" },
  ];
  scores.forEach((score) => {
    if (score < 50) ranges[0].count++;
    else if (score < 70) ranges[1].count++;
    else if (score < 85) ranges[2].count++;
    else ranges[3].count++;
  });

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <BarChart3 className="h-5 w-5 text-primary" />
          Score Distribution
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          How your interview scores are distributed across performance tiers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ranges} layout="vertical" margin={{ left: 20, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fill: CHART_TEXT_COLOR, fontSize: 12 }}
                axisLine={{ stroke: "#334155" }}
                tickLine={{ stroke: "#334155" }}
              />
              <YAxis
                type="category"
                dataKey="label"
                tick={{ fill: "#E2E8F0", fontSize: 12, fontWeight: 500 }}
                axisLine={{ stroke: "#334155" }}
                tickLine={{ stroke: "#334155" }}
                width={60}
              />
              <Tooltip
                cursor={{ fill: "rgba(51, 65, 85, 0.3)" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload;
                    return (
                      <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
                        <p className="text-sm font-semibold text-foreground">{d.name}</p>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">{d.count}</span> interviews
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={32}>
                {ranges.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}