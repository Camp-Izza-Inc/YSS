import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

export default async function YouthSurvey() {
  return (
    <div className="flex justify-center">
      <div className="bg-primary-50 text-dark outline outline-1 outline-gray-700 rounded-xl shadow-lg p-5 w-fit">
        <div className="mb-1">
          <Link href="/youth/profile">
            <FaArrowLeft />
          </Link>
        </div>
        <h2 className="font-bold text-xl sm:text-2xl text-center">
          Pre-Retreat Survey
        </h2>
        <p className="font-medium text-base mb-4">
          Answering this quick survey will help us get to know you better before
          the summit!
        </p>
      </div>
    </div>
  );
}
