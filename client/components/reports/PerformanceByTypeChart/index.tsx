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
import { PieChart as PieChartIcon } from "lucide-react";
import { CHART_TEXT_COLOR, PRIMARY_COLOR, SUCCESS_COLOR, WARNING_COLOR } from "@/client/constants/reports";
import { calculateAverage } from "@/client/utils/reports";
import type { ClassifiedWorkspace, InterviewKind } from "@/client/types/reports";

export function PerformanceByTypeChart({ workspaces }: { workspaces: ClassifiedWorkspace[] }) {
  const types: InterviewKind[] = ["full", "coding", "theory"];
  const labels = { full: "Full Mock", coding: "Coding", theory: "Theory" };
  const colors = { full: PRIMARY_COLOR, coding: SUCCESS_COLOR, theory: WARNING_COLOR };

  const data = types.map((type) => {
    const scores = workspaces
      .filter((w) => w.kind === type && w.analytics?.score !== undefined)
      .map((w) => w.analytics!.score);
    return {
      type: labels[type],
      average: Math.round(calculateAverage(scores)),
      count: scores.length,
      color: colors[type],
    };
  });

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <PieChartIcon className="h-5 w-5 text-primary" />
          Performance by Type
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Average score across each interview format
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ left: 20, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis
                dataKey="type"
                tick={{ fill: "#E2E8F0", fontSize: 12 }}
                axisLine={{ stroke: "#334155" }}
                tickLine={{ stroke: "#334155" }}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: CHART_TEXT_COLOR, fontSize: 12 }}
                axisLine={{ stroke: "#334155" }}
                tickLine={{ stroke: "#334155" }}
              />
              <Tooltip
                cursor={{ fill: "rgba(51, 65, 85, 0.3)" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload;
                    return (
                      <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
                        <p className="text-sm font-semibold text-foreground">{d.type}</p>
                        <p className="text-sm text-muted-foreground">
                          Average: <span className="font-medium text-foreground">{d.average}%</span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{d.count} interviews</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="average" radius={[4, 4, 0, 0]} barSize={48}>
                {data.map((entry, index) => (
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