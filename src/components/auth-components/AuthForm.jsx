"use client";

import { useState } from "react";

import { Progress } from "@nextui-org/react";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";

export default function AuthForm() {
  const [passwordStrength, setPasswordStrength] = useState(0);

  return (
    <form className="flex flex-col gap-4">
      <EmailInput />
      <PasswordInput setPasswordStrength={setPasswordStrength} />
      <Progress
        aria-label="password strength bar"
        className={passwordStrength > 0 ? "" : "hidden"}
        color={passwordStrength === 100 ? "success" : "danger"}
        size="sm"
        value={passwordStrength} />
    </form>
  )
}