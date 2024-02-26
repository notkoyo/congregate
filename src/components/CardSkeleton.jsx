import { Card, Skeleton } from "@nextui-org/react";

export default function CardSkeleton() {
  return (
    <Card className="w-96">
      <Skeleton className="rounded-lg mb-5">
        <div className="w-dvw h-60 rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </Card>
  );
}
{
  /* 
<Skeleton className="w-dvw h-60 object-cover rounded-lg"></Skeleton>
            <Skeleton></Skeleton>
            <Skeleton></Skeleton>
            <Skeleton></Skeleton> */
}
