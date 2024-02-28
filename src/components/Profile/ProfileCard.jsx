"use client";

import { Card, CardBody } from "@nextui-org/react";
import ProfileDisplay from "./ProfileDisplay";

export default function ProfileCard() {
  return (
    <Card className="flex flex-col px-4 py-4 font-satoshi shadow-2xl sm:px-6 sm:py-6 md:px-8 md:py-8 lg:px-10 lg:py-10 xl:px-20">
      <CardBody>
        <ProfileDisplay />
      </CardBody>
    </Card>
  );
}

// "flex flex-col px-20 py-10 font-satoshi shadow-2xl"
