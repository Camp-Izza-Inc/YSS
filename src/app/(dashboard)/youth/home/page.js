import { db } from "@/db";
import { headers } from "next/headers";
import Link from "next/link";
import { TASKS, ICON_SIZE } from "@/constants";
import {
  FaCircleCheck,
  FaCircleXmark,
  FaLock,
  FaArrowRight,
} from "react-icons/fa6";

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
  const groups = await db.youth_groups.findUnique({
    where: {
      youth_id: id,
    },
  });
  return { account: account, profile: profile, groups: groups };
};

export default async function YouthHome() {
  const userID = headers().get("id");
  const { account, profile, groups } = await getUserInfo(userID);
  const groupSelectionCompleted = groups != null;
  const personalDetailsCompleted =
    profile.allergies != null && profile.dietary_restrictions != null;
  const surveyCompleted = profile.survey_completed;

  const renderTodoWidget = () => (
    <div className="bg-offWhite rounded-xl shadow-md text-dark p-4 flex-1 w-fit">
      <h2 className="mb-2 font-semibold text-xl">My Tasks</h2>
      <div className="flex flex-col gap-2 text-base sm:text-lg">
        {TASKS.map((task, i) => {
          const completed = eval(`${task.id}Completed`);
          return (
            <Link
              key={task.id}
              className={`task py-3 px-4 rounded-2xl flex items-center gap-3 ${
                completed ? "bg-lime-600/75" : "bg-red-500/80"
              }`}
              href={task.href}
            >
              <div className="flex-shrink-0">
                {completed ? (
                  <FaCircleCheck size={ICON_SIZE} />
                ) : (
                  <FaCircleXmark size={ICON_SIZE} />
                )}
              </div>
              <div>
                <h3 className="font-bold">
                  {i + 1} - {task.title}
                </h3>
                <p>{task.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );

  const renderGroupsWidget = () => {
    return groupSelectionCompleted ? (
      <div className="rounded-xl shadow-md bg-offWhite text-dark p-4 flex-1 w-fit">
        {/* TO-DO */}
        mygroups
      </div>
    ) : (
      <div className="rounded-xl shadow-md bg-offWhite text-dark p-4 flex-1 flex flex-col">
        <h2 className="mb-2 font-semibold text-xl">My Groups</h2>
        {!personalDetailsCompleted || !surveyCompleted ? (
          <div className="">
            <FaLock size={ICON_SIZE} /> <label>Group Selection Locked</label>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-center items-center">
            <div>
              <Link href="/youth/groups" className="btn btn-primary text-lg">
                Choose my groups <FaArrowRight size={ICON_SIZE} />
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="">
      <h2 className="text-2xl font-bold text-center mb-6 shadow-sm">
        Welcome,{" "}
        <span className="text-accent">{`${profile.first_name} ${profile.last_name}`}</span>
      </h2>
      <div className="flex flex-col lg:flex-row gap-5 px-2 items-center lg:items-stretch lg:justify-center">
        {renderTodoWidget()}
        {renderGroupsWidget()}
      </div>
    </div>
  );
}
