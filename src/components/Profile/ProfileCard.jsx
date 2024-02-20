"use client";

import { Card, CardBody } from "@nextui-org/react";
import ProfileDisplay from "./ProfileDisplay";
import ProfileCreate from "./ProfileCreate";

export default function ProfileCard() {
  return (
    <Card className="px-20 py-10 font-satoshi shadow-2xl">
      <CardBody>
        <ProfileDisplay />
      </CardBody>
    </Card>
  );
}
