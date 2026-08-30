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
import { Code } from "lucide-react";
import { CHART_TEXT_COLOR, DANGER_COLOR, SUCCESS_COLOR, WARNING_COLOR } from "@/client/constants/reports";
import type { ClassifiedWorkspace } from "@/client/types/reports";

export function CodingPerformanceChart({ workspaces }: { workspaces: ClassifiedWorkspace[] }) {
  const codingWorkspaces = workspaces.filter((w) => (w.kind === "coding" || w.kind === "full") && w.analytics);
  const data = codingWorkspaces.map((w) => ({
    name: w.workspace.length > 15 ? w.workspace.slice(0, 15) + "..." : w.workspace,
    solved: w.analytics?.codingSolved || 0,
    total: w.analytics?.codingProblems || 0,
    rate: w.analytics?.codingProblems
      ? Math.round(((w.analytics?.codingSolved || 0) / (w.analytics?.codingProblems || 1)) * 100)
      : 0,
  }));

  if (data.length === 0) {
    return (
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Code className="h-5 w-5 text-primary" />
            Coding Performance
          </CardTitle>
          <CardDescription className="text-muted-foreground">Problem solving success rate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 text-muted-foreground">
            No coding interviews available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Code className="h-5 w-5 text-primary" />
          Coding Performance
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Problem solving success rate per workspace
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ left: 20, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis
                dataKey="name"
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
                        <p className="text-sm font-semibold text-foreground">{d.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Solved: <span className="font-medium text-foreground">{d.solved}</span> / {d.total}
                        </p>
                        <p className="text-sm font-semibold text-emerald-500 mt-1">Success Rate: {d.rate}%</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="rate" radius={[4, 4, 0, 0]} barSize={48}>
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.rate >= 70 ? SUCCESS_COLOR : entry.rate >= 50 ? WARNING_COLOR : DANGER_COLOR} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}