import EventForm from "@/components/Events/EventForm";
import { Card, CardBody } from "@nextui-org/react";

export default function CreateEvent() {
  return (
    <Card>
      <CardBody>
        <EventForm />
      </CardBody>
    </Card>
  );
}
