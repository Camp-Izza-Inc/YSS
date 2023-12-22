"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaAllergies } from "react-icons/fa";
import { MdNoFood } from "react-icons/md";
import Link from "next/link";
import { ICON_SIZE, formatDateYearFirst } from "@/constants";
import { FaCircleCheck, FaCircleExclamation, FaPhone } from "react-icons/fa6";

export default function EditProfileForm({ profile }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm({
    allergies: "",
    dietary_restrictions: "",
    phone_number: "",
  });
  const [alert, setAlert] = useState();

  const onSubmit = async (data) => {
    setAlert(null);
    const requestData = {};
    for (const [key, val] of Object.entries(data)) {
      if (val.length > 0) {
        // only update non-empty fields on form
        requestData[key] = val;
      }
    }
    if (Object.keys(requestData).length > 0) {
      try {
        const response = await fetch("/api/youth/updateProfile", {
          method: "POST",
          body: JSON.stringify(requestData),
        });
        if (response.status === 200) {
          setAlert({ message: "Changes saved!", type: "success" });
          window.location.href = "/youth/profile";
        }
      } catch (e) {
        setAlert({ message: e, type: "error" });
      }
    }
  };

  // renders the alert that relays an error or indicates a successful update/edit
  const renderAlert = () => {
    return alert && alert.message && alert.type ? (
      <div
        className={`alert absolute bottom-[-15%] left-[25%] w-fit text-sky-50 ${
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
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 mx-2 text-base md:text-lg"
      >
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="allergies-field" className="badge-label">
            <FaAllergies size="15" />
            Allergies:{" "}
          </label>
          <textarea
            id="allergies-field"
            placeholder={profile.allergies ? profile.allergies : "Allergies"}
            {...register("allergies", {
              maxLength: {
                value: 200,
                message: "Max length 200 characters",
              },
            })}
          />
          {errors.allergies && (
            <p role="alert" className="text-sm text-red-400">
              {errors.allergies.message}
            </p>
          )}
        </div>

        <div className="flex flex-col items-start gap-2">
          <label htmlFor="dietary-restrictions-field" className="badge-label">
            <MdNoFood size="15" />
            Dietary Restrictions:{" "}
          </label>
          <textarea
            id="dietary-restrictions-field"
            placeholder={
              profile.dietary_restrictions
                ? profile.dietary_restrictions
                : "Dietary Restrictions"
            }
            {...register("dietary_restrictions", {
              maxLength: {
                value: 200,
                message: "Max length 200 characters",
              },
            })}
          />
          {errors.dietary_restrictions && (
            <p role="alert" className="text-sm text-red-400">
              {errors.dietary_restrictions.message}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-start gap-2">
          <label htmlFor="phone-field" className="badge-label">
            <FaPhone size="15" />
            Phone #:
          </label>
          <div>
            <input
              type="tel"
              placeholder={profile.phone_number}
              {...register("phone_number", {
                maxLength: {
                  value: 10,
                  message: "Please enter a 10-digit phone number",
                },
                minLength: {
                  value: 10,
                  message: "Please enter a 10-digit phone number",
                },
                pattern: {
                  value: /^\d+$/,
                  message: "Please enter a 10-digit phone number",
                },
              })}
            />
            {errors.phone_number && (
              <p role="alert" className="text-sm text-red-400">
                {errors.phone_number.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-2">
          <Link className="btn btn-error flex-1" href="/youth/profile">
            Cancel
          </Link>
          {isSubmitting ? (
            <button className="btn btn-success flex-1">
              <span className="loading loading-spinner loading-sm"></span>
            </button>
          ) : (
            <input
              className="btn btn-success flex-1"
              type="submit"
              value="SAVE"
              disabled={isSubmitting}
            />
          )}
        </div>
      </form>
      {renderAlert()}
    </div>
  );
}
