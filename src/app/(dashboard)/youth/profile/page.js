import { db } from "@/db";
import { headers } from "next/headers";
import Link from "next/link";
import { ICON_SIZE } from "@/constants";
import {
  FaCakeCandles,
  FaGraduationCap,
  FaPenToSquare,
  FaPencil,
  FaPhone,
} from "react-icons/fa6";
import { FaAllergies } from "react-icons/fa";
import { MdNoFood } from "react-icons/md";
import { PiPersonArmsSpreadFill } from "react-icons/pi";
import { IoMaleFemaleSharp } from "react-icons/io5";
import { RiParentFill } from "react-icons/ri";
import { formatDate } from "@/utils";
import { MissingTag } from "@/components";

const getUserInfo = async (id) => {
  const account = await db.accounts.findUnique({
    where: {
      id: id,
    },
  });
  const profile = await db.youth.findUnique({
    where: {
      youth_id: id,
    },
  });
  const parent = await db.parents.findUnique({
    select: {
      first_name: true,
      last_name: true,
    },
    where: {
      parent_id: profile.parent_id,
    },
  });
  return { account: account, profile: profile, parent: parent };
};

export default async function YouthProfile() {
  const userID = headers().get("id");
  const { account, profile, parent } = await getUserInfo(userID);

  const renderProfileWidget = () => (
    <div className="bg-gray-700/90 outline outline-1 outline-gray-600 rounded-xl shadow-lg p-5 w-fit">
      <h2 className="font-bold text-2xl text-center mb-4 text-offWhite">
        My Profile
      </h2>

      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-3 justify-center mb-4">
        <div className="avatar placeholder mb-2 lg:m-0">
          <div className="bg-neutral-focus text-neutral-content outline outline-1 outline-gray-600 rounded-full w-28">
            <span className="text-4xl">{profile.first_name[0]}</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-5 gap-2 text-base md:text-lg sm:mx-3">
          <ul className="font-medium flex flex-col gap-2">
            <li className="flex items-center gap-3 font-semibold">
              <div className="badge-label">
                <PiPersonArmsSpreadFill size="18" /> Name:{" "}
              </div>
              {`${profile.first_name} ${profile.last_name}`}
            </li>
            <li className="flex items-center gap-3 font-semibold">
              <div className="badge-label">
                <IoMaleFemaleSharp size="17" /> Gender:{" "}
              </div>
              {profile.gender == "f" ? "Female" : "Male"}
            </li>
            <li className="flex items-center gap-3 font-semibold">
              <div className="badge-label">
                <FaCakeCandles size="15" /> Date of Birth:{" "}
              </div>
              {formatDate(profile.birthday)}
            </li>
            <li className="flex items-center gap-3 font-semibold">
              <div className="badge-label">
                <FaGraduationCap size="15" /> Grade:{" "}
              </div>
              {`${profile.grade}th`}
            </li>
            <li className="flex items-center gap-3 font-semibold">
              <div className="badge-label">
                <RiParentFill size="18" /> Parent:{" "}
              </div>
              {`${parent.first_name} ${parent.last_name}`}
            </li>
            <li className="flex items-center gap-3 font-semibold">
              <div className="badge-label">
                <FaPhone size="15" /> Phone #:{" "}
              </div>
              {profile.phone_number}
            </li>
          </ul>
          <ul className="font-medium flex flex-col gap-2">
            <li
              className={`flex font-semibold ${
                profile.allergies
                  ? "flex-col gap-1"
                  : "flex-row items-center gap-3"
              }`}
            >
              <div className="badge-label">
                <FaAllergies size="15" /> Allergies:{" "}
              </div>
              {profile.allergies ? <p>{profile.allergies}</p> : <MissingTag />}
            </li>
            <li
              className={`flex font-semibold ${
                profile.dietary_restrictions
                  ? "flex-col gap-1"
                  : "flex-row items-center gap-3"
              }`}
            >
              <div className="badge-label">
                <MdNoFood size="15" /> Dietary Restrictions:{" "}
              </div>
              {profile.dietary_restrictions ? (
                <p>{profile.dietary_restrictions}</p>
              ) : (
                <MissingTag />
              )}
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-center">
        <Link className="btn btn-accent text-base" href="profile/edit">
          <FaPenToSquare size={ICON_SIZE} />
          Edit
        </Link>
      </div>
    </div>
  );

  const renderSurveyWidget = () => (
    <div className="bg-primary-50 text-dark outline outline-1 outline-gray-700 rounded-xl shadow-lg p-5 w-fit">
      <h2 className="font-bold text-2xl">Pre-Retreat Survey</h2>
      <p className="font-medium text-base mb-4">
        Answering this quick survey will help us get to know you better before
        the summit!
      </p>
      <div className="flex justify-center">
        <Link className="btn btn-primary text-base" href="profile/survey">
          <FaPencil />
          Begin
        </Link>
      </div>
    </div>
  );

  return (
    <div className="mt-4 flex flex-col gap-5 items-center">
      {renderProfileWidget()}
      {renderSurveyWidget()}
    </div>
  );
}
