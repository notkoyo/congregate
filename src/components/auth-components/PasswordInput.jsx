"use client";

import { useState } from "react";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "./_eye-icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "./_eye-icons/EyeSlashFilledIcon";

export default function PasswordInput({ setPasswordStrength }) {
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  let complexityScore = 0;

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validatePassword = (password) => 
    password.match(/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[\d].*[\d])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/i);

  const testComplexity = (password) => {
    complexityScore += /(?=.*[a-z].*[a-z].*[a-z])/g.test(password) ? 25 : 0;
    complexityScore += /(?=.*[A-Z].*[A-Z])/g.test(password) ? 25 : 0;
    complexityScore += /(?=.*[!@#$&*])/g.test(password) ? 25 : 0;
    complexityScore += /(?=.*[\d].*[\d])/g.test(password) ? 25 : 0;
  }

  const handlePasswordChange = (newPassword) => {
    testComplexity(newPassword);
    newPassword === "" ? setPasswordStrength(0) : setPasswordStrength(complexityScore);
    setPassword(newPassword);
    newPassword === "" ? setIsValid(true) : setIsValid(validatePassword(newPassword));
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
      onValueChange={(handlePasswordChange)}
      className="max-w-xs"
    />
  );
}