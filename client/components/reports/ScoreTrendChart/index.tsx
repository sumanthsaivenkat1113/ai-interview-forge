import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/client/components/ui/card";
import { LineChart as LineChartIcon } from "lucide-react";
import { CHART_TEXT_COLOR, PRIMARY_COLOR } from "@/client/constants/reports";
import type { ClassifiedWorkspace } from "@/client/types/reports";

export function ScoreTrendChart({ workspaces }: { workspaces: ClassifiedWorkspace[] }) {
  const sorted = [...workspaces]
    .filter((w) => w.analytics?.score !== undefined && w.analytics?.completed)
    .sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime())
    .slice(-10);

  const data = sorted.map((w) => ({
    name: w.workspace.length > 12 ? w.workspace.slice(0, 12) + "..." : w.workspace,
    score: w.analytics!.score,
    type: w.kind,
  }));

  if (data.length === 0) {
    return (
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <LineChartIcon className="h-5 w-5 text-primary" />
            Score Trend
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Your performance trajectory over recent interviews
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 text-muted-foreground">
            No completed interviews to show
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <LineChartIcon className="h-5 w-5 text-primary" />
          Score Trend
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Your performance trajectory over recent interviews
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ left: 20, right: 20 }}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={PRIMARY_COLOR} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={PRIMARY_COLOR} stopOpacity={0} />
                </linearGradient>
              </defs>
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
                cursor={{ stroke: "#334155", strokeWidth: 1, strokeDasharray: "4 4" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload;
                    return (
                      <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
                        <p className="text-sm font-semibold text-foreground">{d.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Score: <span className="font-medium text-foreground">{d.score}%</span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 capitalize">Type: {d.type}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="score"
                stroke={PRIMARY_COLOR}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorScore)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}