"use client";

import { useState } from "react";
import { Input } from "@nextui-org/react";

export default function EmailInput() {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);

  const validateEmail = (email) =>
    email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

  const handleEmailChange = (newEmail) => {
    setEmail(newEmail);
    if (newEmail === "") {
      setIsValid(true);
    } else {
      setIsValid(validateEmail(newEmail));
    }
  };

  return (
    <Input
      isClearable
      value={email}
      type="email"
      label="Email"
      variant="bordered"
      isInvalid={!isValid}
      color={email !== "" ? (isValid ? "success" : "danger") : "default"}
      errorMessage={!isValid && "Please enter a valid email"}
      onValueChange={handleEmailChange}
      className="max-w-xs"
    />
  );
}