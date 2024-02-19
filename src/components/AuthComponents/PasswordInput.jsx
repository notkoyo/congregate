"use client";

import { useState } from "react";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeIcons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeIcons/EyeSlashFilledIcon";

export default function PasswordInput() {
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validatePassword = (password) =>
    password.match(/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/i);

  const handlePasswordChange = (newPassword) => {
    setPassword(newPassword);
    if (newPassword === "") {
      setIsValid(true);
    } else {
      setIsValid(validatePassword(newPassword));
    }
  };

  return (
    <Input
      value={password}
      label="Password"
      variant="bordered"
      endContent={
        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
      isInvalid={!isValid}
      color={password !== "" ? (isValid ? "success" : "danger") : "default"}
      errorMessage={!isValid && "Please enter a valid password"}
      onValueChange={handlePasswordChange}
      className="max-w-xs"
    />
  );
}