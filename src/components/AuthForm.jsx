"use client";

import { supabaseAuth } from "@/utils/supabaseClient";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthForm() {
  //state
  const [isNewUser, setIsNewUser] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const router = useRouter();

  //state for display text
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignUp(e) {
    e.preventDefault();
    const { data, error } = await supabaseAuth.auth.signUp({
      email,
      password,
    });
    if (!error) {
      setIsSigningUp(true);
      setIsSigningIn(false);
    }
    
  }

  async function handleLogin(e) {
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
;
  }

  let signInMessage = "Sign In";

  if (isSigningIn) {
    signInMessage = "Signing In...";
  } else if (isNewUser) {
    signInMessage = "Sign Up";
  }

  const signUpMessage = (
    <p className="text-center text-black">
      Email sent! Check your email to confirm sign up.
    </p>
  );

  return (
    <div className="w-80">
      <form
        className="mb-4 flex flex-col gap-6 rounded bg-white px-8 pb-8 pt-6 shadow-md "
        onSubmit={isNewUser ? handleSignUp : handleLogin}
      >
        <input
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          type="submit"
        >
          {signInMessage}
        </button>

        <p>
          {isNewUser ? (
            <>
              Already have an Account?{" "}
              <button
                className="inline-block align-baseline text-sm font-bold text-blue-500 hover:text-blue-800"
                type="button"
                onClick={() => setIsNewUser(false)}
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <button
                className="inline-block align-baseline text-sm font-bold text-blue-500 hover:text-blue-800"
                type="button"
                onClick={() => setIsNewUser(true)}
              >
                Sign Up
              </button>
            </>
          )}
        </p>

        {isSigningUp && signUpMessage}
      </form>
    </div>
  );
}
