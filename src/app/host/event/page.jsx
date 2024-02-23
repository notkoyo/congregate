import EventForm from "@/components/Events/EventForm";
import { Card, CardBody } from "@nextui-org/react";

export default function CreateEvent() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-2/3 p-4">
        <CardBody>
          <h1 className="pb-6 text-xl font-bold">Create an Event</h1>
          <EventForm />
        </CardBody>
      </Card>
    </div>
  );
}
