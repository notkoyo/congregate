"use client";

import { useState } from "react";

import { Button, Progress } from "@nextui-org/react";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";

export default function AuthForm() {
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleSubmit = () => {
    if (typeof window !== "undefined") {
      console.log("submitted entry");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-satoshi">
      <EmailInput />
      <PasswordInput setPasswordStrength={setPasswordStrength} />
      <Progress
        aria-label="password strength bar"
        className={passwordStrength > 0 ? "" : "hidden"}
        color={passwordStrength === 100 ? "success" : "danger"}
        size="sm"
        value={passwordStrength} />
      <Button type="submit" variant="solid" color="primary" className="font-semibold">
        Login
      </Button>
    </form>
  )
}