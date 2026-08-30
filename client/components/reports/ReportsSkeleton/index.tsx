import { Card, CardContent, CardHeader } from "@/client/components/ui/card";
import { Skeleton } from "@/client/components/ui/skeleton";

export function ReportsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-48 bg-muted" />
          <Skeleton className="mt-2 h-4 w-96 bg-muted" />
        </div>
        <Skeleton className="h-12 w-32 bg-muted" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24 bg-muted" />
              <Skeleton className="h-4 w-4 bg-muted" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 bg-muted" />
              <Skeleton className="mt-2 h-3 w-32 bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="border-border bg-card">
            <CardHeader>
              <Skeleton className="h-5 w-32 bg-muted" />
              <Skeleton className="h-3 w-48 bg-muted" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}