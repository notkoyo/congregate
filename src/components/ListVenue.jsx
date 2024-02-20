import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import Link from "next/link";

export default function ListVenue({ venue }) {
  console.log(venue, "venue");
  return (
    <Link href={`/venues/${venue.id}`}>
      <Card className="py-4">
        <CardHeader className="h-20 flex-col items-start overflow-hidden px-4 pb-0 pt-2">
          <p className="text-tiny font-bold uppercase">{venue.name}</p>
          <small className="text-default-500">{venue.description}</small>
        </CardHeader>
        <CardBody className=" overflow-visible py-2">
          <Image
            alt="Card background"
            className="rounded-xl object-cover"
            src={venue.photos}
          />
        </CardBody>
        <CardBody className="overflow-visible py-2">
          <p className="text-tiny font-bold uppercase">{venue.address_1}</p>
          <p className="text-tiny font-bold uppercase">{venue.postcode}</p>
          <p className="text-tiny font-bold uppercase">{venue.city}</p>
        </CardBody>
      </Card>
    </Link>
  );
}
