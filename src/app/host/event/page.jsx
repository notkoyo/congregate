import EventForm from "@/components/Events/EventForm";
import { Card, CardBody } from "@nextui-org/react";

export default function CreateEvent() {
  return (
    <div className="flex justify-center sm:pt-24">
      <Card className="w-screen max-w-screen-md p-4 sm:w-fit">
        <CardBody>
          <h1 className="pb-6 text-xl font-bold">Create an Event</h1>
          <EventForm />
        </CardBody>
      </Card>
    </div>
  );
}
