"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/client/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/client/components/ui/table";
import { Badge } from "@/client/components/ui/badge";
import { Button } from "@/client/components/ui/button";
import { ChevronRight, Clock } from "lucide-react";
import { getPerformanceLabel } from "@/client/utils/reports";
import type { ClassifiedWorkspace } from "@/client/types/reports";

function getRoute(w: ClassifiedWorkspace) {
  if (w.kind === "full") return `/results/${w.id}`;
  if (w.kind === "coding") return `/results/${w.id}/mi/coding`;
  return `/results/${w.id}/mi/theory`;
}

export function RecentInterviewsTable({ workspaces }: { workspaces: ClassifiedWorkspace[] }) {
  const router = useRouter();
  const recent = [...workspaces]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 10);

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Clock className="h-5 w-5 text-primary" />
          Recent Interviews
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Your most recently updated interview workspaces
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border">
              <TableHead className="text-muted-foreground">Workspace</TableHead>
              <TableHead className="text-muted-foreground">Company</TableHead>
              <TableHead className="text-muted-foreground">Role</TableHead>
              <TableHead className="text-muted-foreground">Type</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-right text-muted-foreground">Score</TableHead>
              <TableHead className="text-right text-muted-foreground">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recent.map((w) => {
              const performance = w.analytics?.score !== undefined ? getPerformanceLabel(w.analytics.score) : null;
              return (
                <TableRow key={w.id} className="border-border transition-colors hover:bg-muted/50">
                  <TableCell className="font-medium text-foreground">
                    {w.workspace}
                    {w.subject && <div className="text-xs text-muted-foreground mt-0.5">{w.subject}</div>}
                  </TableCell>
                  <TableCell className="text-foreground">{w.target_company || "—"}</TableCell>
                  <TableCell className="text-foreground">{w.target_role || "—"}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`capitalize ${
                        w.kind === "full"
                          ? "border-primary/20 bg-primary/10 text-primary"
                          : w.kind === "coding"
                          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
                          : "border-amber-500/20 bg-amber-500/10 text-amber-500"
                      }`}
                    >
                      {w.kind}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {w.analytics?.completed ? (
                      <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20 border">
                        Completed
                      </Badge>
                    ) : w.analytics ? (
                      <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/20 border">
                        In Progress
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground border-border">
                        Pending
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {performance ? (
                      <Badge
                        variant="outline"
                        className={`${performance.className} ${performance.borderClass} bg-transparent font-semibold`}
                      >
                        {w.analytics?.score}% • {performance.label}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground text-sm">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary hover:bg-primary/10"
                      onClick={() => router.push(getRoute(w))}
                    >
                      View <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            {recent.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                  No interviews available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}