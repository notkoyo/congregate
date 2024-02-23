import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
  Button,
} from "@nextui-org/react";
import Link from "next/link";

export default function App({ venue }) {
  const data = venue[0];
  return (
    <Card className="py-4">
      <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
        <p className="text-tiny font-bold uppercase">{data?.name}</p>
        <small className="text-default-500">{data?.description}</small>
      </CardHeader>
      <CardBody className="flex w-full flex-col items-center overflow-visible py-2 text-center">
        <Image
          alt="Card background"
          className="h-260 w-400 rounded-xl object-cover"
          src={data?.photos}
        />
      </CardBody>
      <CardFooter className="flex-col items-start px-4 pb-0 pt-2">
        <p>{data?.price}</p>
        <p>{data?.postcode}</p>
        <p>{data?.address_1}</p>
        <p>{data?.city}</p>
        <Link href="/host/event">
          <Button
            onPress={() => {
              const eventForm = JSON.parse(
                localStorage.getItem("eventFormDetails"),
              );
              eventForm.venue_id = data.venue_id;
              localStorage.setItem(
                "eventFormDetails",
                JSON.stringify(eventForm),
              );
            }}
          >
            Choose
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
