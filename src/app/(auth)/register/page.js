"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { registrationFormRequirements } from "@/constants";
import {
  FaEye,
  FaEyeSlash,
  FaCircleCheck,
  FaCircleExclamation,
} from "react-icons/fa6";
import { ICON_SIZE } from "@/constants";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alert, setAlert] = useState();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm({
    defaultValues: {
      name: {
        first_name: "",
        last_name: "",
      },
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (data) => {
    setAlert(null);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const responseBody = await response.json();
      if (response.status === 400) {
        throw `${responseBody.message}`;
      } else {
        setAlert({ message: responseBody.message, type: "success" });
      }
    } catch (e) {
      setAlert({ message: e, type: "error" });
    }
  };

  // render the alert indicating errors or successful submission
  const renderAlert = () => {
    return alert && alert.message && alert.type ? (
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
    <div className="flex flex-col gap-3 w-full px-5 sm:px-3 relative">
      <div>
        <h1 className="text-3xl text-center md:text-left md:text-4xl font-semibold mb-1">
          Parent Registration
        </h1>
        <p className="max-w-lg mb-3 text-gray-200 text-base mx-1">
          This is to be completed by <span className="underline">parents</span>{" "}
          registering their highschool youth for the YSS program.
        </p>
      </div>

      <form
        className="login-form flex flex-col gap-3 mx-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex flex-col w-full">
            <label htmlFor="first-name-field">First Name</label>
            <input
              id="first-name-field"
              type="text"
              placeholder="first name"
              aria-invalid={errors.name ? "true" : "false"}
              className={`input ${
                errors.name?.first_name ? "input-error" : ""
              }`}
              {...register("name.first_name", {
                required: "Required",
                minLength: { value: 2, message: "Required" },
              })}
            />
            {errors.name?.first_name && (
              <p role="alert" className="text-sm text-red-400">
                {errors.name.first_name.message}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="last-name-field">Last Name</label>
            <input
              id="last-name-field"
              type="text"
              placeholder="last name"
              aria-invalid={errors.name ? "true" : "false"}
              className={`input ${errors.name?.last_name ? "input-error" : ""}`}
              {...register("name.last_name", {
                required: "Required",
                minLength: { value: 2, message: "Required" },
              })}
            />
            {errors.name?.last_name && (
              <p role="alert" className="text-sm text-red-400">
                {errors.name.last_name.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="email-field">Email</label>
          <input
            id="email-field"
            type="email"
            placeholder="email"
            aria-invalid={errors.email ? "true" : "false"}
            className={`input ${errors.email ? "input-error" : ""}`}
            {...register("email", registrationFormRequirements.email)}
          />
          {errors.email && (
            <p role="alert" className="text-sm text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password-field">Password</label>
          <div className="relative">
            <input
              id="password-field"
              type={showPassword ? "text" : "password"}
              placeholder="password"
              aria-invalid={errors.password ? "true" : "false"}
              className={`input w-full ${errors.password ? "input-error" : ""}`}
              {...register("password", registrationFormRequirements.password)}
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
          {errors.password && (
            <div className="max-w-lg">
              <p role="alert" className="text-sm text-red-400">
                {errors.password.message}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col relative mb-3">
          <label htmlFor="confirm-password-field">Confirm Password</label>
          <div className="relative">
            <input
              id="confirm-password-field"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="confirm password"
              aria-invalid={errors.confirm_password ? "true" : "false"}
              className={`input w-full ${
                errors.confirm_password ? "input-error" : ""
              }`}
              {...register("confirm_password", {
                required: "Required",
                validate: (v) =>
                  v === getValues("password") || "Passwords do not match",
              })}
            />
            <label className="swap absolute right-1 bottom-3 z-50 text-dark">
              <input
                type="checkbox"
                onClick={() => {
                  setShowConfirmPassword((prev) => !prev);
                }}
              />
              <FaEye size="18" className="swap-on" />
              <FaEyeSlash size="18" className="swap-off" />
            </label>
          </div>
          {errors.confirm_password && (
            <div>
              <p role="alert" className="text-sm text-red-400 w-fit">
                {errors.confirm_password.message}
              </p>
            </div>
          )}
        </div>

        {renderAlert()}

        <div className="flex justify-center">
          <div className="flex flex-col justify-center gap-2">
            {isSubmitting ? (
              <button className="btn btn-primary">
                <span className="loading loading-spinner loading-sm"></span>
              </button>
            ) : (
              <input
                className="btn btn-primary"
                type="submit"
                value="REGISTER"
                disabled={isSubmitted}
              />
            )}
            <Link className="btn btn-outline" href="/login">
              RETURNING USER? LOGIN
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
