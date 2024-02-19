"use client";

{/*

  - Possible bug with isSigningIn - needs checking
  - Styling

*/}

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseAuth } from "@/utils/supabaseClient";

import { EyeFilledIcon } from "./_eye-icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "./_eye-icons/EyeSlashFilledIcon";
import { Button, Progress, Input, Divider, Link } from "@nextui-org/react";
import GoogleIcon from "./GoogleIcon";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isProgressVisible, setIsProgressVisible] = useState(false);

  const [isNewUser, setIsNewUser] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { data, error } = await supabaseAuth.auth.signUp({
      email,
      password,
    });
    if (!error) {
      setIsSigningUp(true);
      setIsSigningIn(false);
    }
    console.log({ data, error });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    const { data, error } = await supabaseAuth.auth.signInWithPassword({
      email,
      password,
    });
    if (!error) {
      router.push("/profile");
    } else {
      setIsSigningUp(false);
    }
    // console.log({ data, error });
  };

  const handleGoogle = async () => {
    // console.log("here");
    const { user, session, error } = await supabaseAuth.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `http://localhost:3000/auth/callback`,
      },
    });
    if (!error) {
      router.push("/profile");
    }
    // console.log({ user, session, error });
  };

  let signInMessage = "Login";

  const signUpMessage = (
    <p className="text-center text-black">
      Email sent! Check your email to confirm sign up.
    </p>
  );

  isNewUser ? (signInMessage = "Sign Up") : undefined;

  const validateEmail = (email) =>
    email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

  const handleEmailChange = (newEmail) => {
    setEmail(newEmail);
    if (newEmail === "") {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(validateEmail(newEmail));
    }
  };

  let complexityScore = 0;

  const toggleVisibility = () => setIsProgressVisible(!isProgressVisible);

  const validatePassword = (password) =>
    password.match(
      /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[\d].*[\d])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/g,
    );

  const testComplexity = (password) => {
    complexityScore += /(?=.*[a-z].*[a-z].*[a-z])/g.test(password) ? 25 : 0;
    complexityScore += /(?=.*[A-Z].*[A-Z])/g.test(password) ? 25 : 0;
    complexityScore += /(?=.*[!@#$&*])/g.test(password) ? 25 : 0;
    complexityScore += /(?=.*[\d].*[\d])/g.test(password) ? 25 : 0;
  };

  const handlePasswordChange = (newPassword) => {
    testComplexity(newPassword);
    newPassword === ""
      ? setPasswordStrength(0)
      : setPasswordStrength(complexityScore);
    setPassword(newPassword);
    newPassword === ""
      ? setIsPasswordValid(true)
      : setIsPasswordValid(validatePassword(newPassword));
  };

  return (
    <form
      onSubmit={isNewUser ? handleSignUp : handleLogin}
      className="flex flex-col gap-4 font-satoshi"
    >
      <h2 className="text-center text-2xl font-bold mb-12">{isNewUser ? "Create an account" : "Login"}</h2>
      <Input
        isClearable
        value={email}
        type="email"
        label="Email"
        variant="faded"
        isInvalid={!isEmailValid}
        color={email !== "" ? (isEmailValid ? "success" : "danger") : "default"}
        errorMessage={!isEmailValid && "Please enter a valid email"}
        onValueChange={handleEmailChange}
        className="max-w-xs font-medium mb-2"
      />
      <Input
        value={password}
        label="Password"
        variant="faded"
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isProgressVisible ? (
              <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
            ) : (
              <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
            )}
          </button>
        }
        type={isProgressVisible ? "text" : "password"}
        isInvalid={!isPasswordValid}
        color={
          password !== "" ? (isPasswordValid ? "success" : "danger") : "default"
        }
        errorMessage={!isPasswordValid && "Please enter a valid password"}
        onValueChange={handlePasswordChange}
        className="max-w-xs font-medium mt-2"
      />
      <Progress
        aria-label="password strength bar"
        className={passwordStrength > 0 ? "" : "hidden"}
        color={passwordStrength === 100 ? "success" : "danger"}
        size="sm"
        value={passwordStrength}
      />
        {isNewUser ? (
          <div className="flex gap-1 justify-center my-1">
            <p className="cursor-default text-sm">Already have an account?</p>
            <Link className="font-medium text-sm cursor-pointer" onPress={() => setIsNewUser(false)}>
              Login
            </Link>
          </div>
        ) : (
          <div className="flex gap-1 justify-center my-1">
            <p className="cursor-default text-sm">Don't have an account?</p>
            <Link className="font-medium text-sm cursor-pointer" onPress={() => setIsNewUser(true)}>
              Sign Up
            </Link>
          </div>
        )}
      {isSigningUp && signUpMessage}
      <Button
        isLoading={isSigningIn}
        type="submit"
        variant="solid"
        color="primary"
        className="font-semibold"
      >
        {signInMessage}
      </Button>
      <Divider className="my-5" />
      <Button onPress={handleGoogle} endContent={<GoogleIcon />}>
        Login with Google
      </Button>
    </form>
  );
}
