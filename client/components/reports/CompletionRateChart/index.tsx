import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/client/components/ui/card";
import { CheckCircle } from "lucide-react";
import { SUCCESS_COLOR, WARNING_COLOR } from "@/client/constants/reports";
import type { ClassifiedWorkspace } from "@/client/types/reports";

export function CompletionRateChart({ workspaces }: { workspaces: ClassifiedWorkspace[] }) {
  const completed = workspaces.filter((w) => w.analytics?.completed).length;
  const pending = workspaces.length - completed;
  const total = workspaces.length || 1;
  const data = [
    { name: "Completed", value: completed, color: SUCCESS_COLOR },
    { name: "Pending", value: pending, color: WARNING_COLOR },
  ];

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <CheckCircle className="h-5 w-5 text-primary" />
          Completion Rate
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {completed} of {workspaces.length} interviews completed
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload;
                    return (
                      <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
                        <p className="text-sm font-semibold text-foreground">{d.name}</p>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">{d.value}</span> interviews
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {Math.round((d.value / total) * 100)}%
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => <span className="text-sm text-muted-foreground">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}