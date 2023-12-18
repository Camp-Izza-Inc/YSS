"use client";
import { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaCircleCheck,
  FaCircleExclamation,
} from "react-icons/fa6";
import { ICON_SIZE } from "@/constants";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [alert, setAlert] = useState();
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    setSubmitting(true);
    e.preventDefault();
    setAlert(null);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          email: email.toLowerCase(),
          password: password,
        }),
      });
      const responseBody = await response.json();
      if (!responseBody.auth) {
        setAlert({
          message: responseBody.message,
          type: "error",
        });
      } else {
        const account_type = responseBody.account_type;
        setAlert({
          message: "Login Successful! Redirecting...",
          type: "success",
        });
        window.location.href = `/${account_type}`;
      }
      setSubmitting(false);
    } catch (e) {
      setAlert({
        message: e,
        type: "error",
      });
      setSubmitting(false);
    }
  };

  const renderAlert = () => {
    return alert ? (
      <div
        className={`alert mb-3 text-sky-50 ${
          alert.type === "error" ? "alert-error" : "alert-success"
        }`}
      >
        {alert.type === "error" ? (
          <FaCircleExclamation size={ICON_SIZE} />
        ) : (
          <FaCircleCheck size={ICON_SIZE} />
        )}
        <span className="text-center">{alert.message}</span>
      </div>
    ) : null;
  };

  return (
    <div className="flex flex-col gap-3 w-full px-5 sm:px-3">
      <h1 className="text-5xl font-semibold mb-3">Login</h1>

      <form className="login-form flex flex-col mx-1" onSubmit={handleSubmit}>
        <div className="flex flex-col mb-2">
          <label htmlFor="email-field">Email</label>
          <input
            id="email-field"
            type="email"
            placeholder="email"
            className="input"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col relative">
          <label htmlFor="password-field">Password</label>
          <input
            id="password-field"
            type={showPassword ? "text" : "password"}
            placeholder="password"
            className="input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="swap absolute right-1 bottom-3 z-50 text-dark">
            <input
              type="checkbox"
              onClick={() => {
                setShowPassword((prev) => !prev);
              }}
            />
            <FaEye size="18" className="swap-on" />
            <FaEyeSlash size="18" className="swap-off" />
          </label>
        </div>
        <Link
          className="mt-1 mb-3 font-semibold hover:underline text-primary-100"
          href="/forgotpassword"
        >
          Forgot Password?
        </Link>
        {renderAlert()}
        <div className="mb-5 flex justify-center">
          <div className="flex flex-col justify-center gap-2">
            <button
              className="btn btn-primary"
              disabled={!email || !password}
              type="submit"
            >
              {submitting ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <>LOGIN</>
              )}
            </button>
            <Link className="btn btn-outline" href="/register">
              NEW HERE? REGISTER
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
