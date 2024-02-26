"use client";

import Link from "next/link";
import SignOutButton from "../../../components/SignOutButton";
import ProfileCreateForm from "@/components/Profile/ProfileCreateForm";
import { Card, CardBody } from "@nextui-org/react";

export default function Profile() {
  return (
    <>
      <div className="flex justify-between">
        <Link
          href="/"
          className="inline-block rounded bg-cyan-600 px-5 py-3 font-satoshi text-xl text-white hover:bg-cyan-600"
        >
          Home Page
        </Link>
      </div>
      <div className="flex h-screen flex-col items-center justify-center">
        <Card className="p-4">
          <CardBody>
            <div className="flex justify-between">
              <h1 className="pb-12 text-xl">
                Welcome to the Congregate Family!
              </h1>
              <SignOutButton
                text="Complete sign up later?"
                className="inline-block rounded bg-cyan-600 px-5 py-3 font-satoshi text-sm text-white hover:bg-cyan-600"
              />
            </div>
            <p className="pb-4">
              Please give us your details so we can match you to your ideal
              events
            </p>
            <ProfileCreateForm />
          </CardBody>
        </Card>
      </div>
    </>
  );
}
