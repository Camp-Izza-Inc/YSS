"use client";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  return (
    <div className="flex flex-col gap-3 w-full">
      <h1 className="text-4xl font-semibold mb-3">Forgot Password?</h1>

      <form className="login-form flex flex-col gap-2 mx-1">
        <div className="flex flex-col">
          <label htmlFor="email-field">Email</label>
          <input
            id="email-field"
            type="email"
            placeholder="email"
            className="py-2 px-3 rounded-md"
          />
        </div>

        <div className="mt-5 flex justify-center">
          <div className="flex flex-col justify-center gap-2">
            <button className="button-primary">RESET PASSWORD</button>
            <Link className="button-outline" href="/login">
              BACK TO LOGIN
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
