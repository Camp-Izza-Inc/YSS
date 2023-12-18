"use client";
import { useForm } from "react-hook-form";
import { FaAllergies } from "react-icons/fa";
import { MdNoFood } from "react-icons/md";
import Link from "next/link";
import { formatDateYearFirst } from "@/constants";
import { FaPhone } from "react-icons/fa6";

export default function EditProfileForm({ profile }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    allergies: `${profile.allergies || ""}`,
    dietary_restrictions: `${profile.dietary_restrictions || ""}`,
    phone_number: `${profile.phone_number || ""}`,
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
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
          className="rounded-lg p-2 text-dark flex-1 w-full"
          {...register("allergies", { required: "Required" })}
        />
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
          className="rounded-lg p-2 text-dark flex-1 w-full"
        />
      </div>
      <div className="flex flex-col sm:flex-row items-start gap-2">
        <label htmlFor="phone-field" className="badge-label">
          <FaPhone size="15" />
          Phone #:
        </label>
        <input type="tel" placeholder={profile.phone_number} />
      </div>

      <div className="flex justify-center gap-2 mt-2">
        <Link className="btn btn-error flex-1" href="/youth/profile">
          Cancel
        </Link>
        <input className="btn btn-success flex-1" type="submit" value="SAVE" />
      </div>
    </form>
  );
}
