import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
} from "@nextui-org/react";

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
          className="w-400 h-260 rounded-xl object-cover"
          src={data?.photos}
        />
      </CardBody>
      <CardFooter className="flex-col items-start px-4 pb-0 pt-2">
        <p>{data?.price}</p>
        <p>{data?.postcode}</p>
        <p>{data?.address_1}</p>
        <p>{data?.city}</p>
      </CardFooter>
    </Card>
  );
}
