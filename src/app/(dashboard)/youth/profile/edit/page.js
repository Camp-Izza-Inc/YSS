import { db } from "@/db";
import { headers } from "next/headers";
import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";
import EditProfileForm from "./EditProfileForm";

const getProfile = async (id) => {
  const profile = await db.youth.findUnique({
    where: {
      youth_id: id,
    },
  });
  return profile;
};

export default async function YouthEditProfile() {
  const userID = headers().get("id");
  const profile = await getProfile(userID);

  const saveUpdate = async (data) => {
    console.log(userID);
    console.log(data);
    // const user = await db.youth.update({
    //   where : {
    //     id : userID
    //   },
    //   data:
    // })
  };

  return (
    <div className="flex justify-center">
      <div
        className="bg-gray-700/90 outline outline-1 outline-gray-600 rounded-xl shadow-lg
        flex flex-col min-w-fit p-5 relative"
      >
        <div className="mb-1">
          <Link href="/youth/profile" className="btn btn-sm btn-ghost">
            <FaArrowLeft />
          </Link>
        </div>
        <h2 className="font-bold text-xl md:text-2xl text-center mb-4 text-offWhite">
          Edit Profile
        </h2>
        <EditProfileForm profile={profile} />
      </div>
    </div>
  );
}
