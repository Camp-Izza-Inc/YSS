import { FaUser, FaArrowRightFromBracket } from "react-icons/fa6";
import { FaCog } from "react-icons/fa";
import { ICON_SIZE } from "@/constants";
import Link from "next/link";

export default function UserButton({ setLogoutStatus }) {
  const handleLogout = async () => {
    document.getElementById("logout-message-modal").showModal();
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });
      const body = await response.json();
      if (body.success) {
        setLogoutStatus("success");
        window.location.href = "/login";
      }
    } catch (e) {
      setLogoutStatus("error");
      console.log(e);
    }
  };

  return (
    <details className="dropdown dropdown-end">
      <summary className="btn btn-accent btn-circle rounded-full">
        <FaUser size={ICON_SIZE - 4} />
      </summary>
      <ul className="shadow menu dropdown-content z-[1] bg-base-200 rounded-box w-fit">
        <li>
          <Link className="font-semibold" href="settings">
            <FaCog size={ICON_SIZE} />
            Settings
          </Link>
        </li>
        <li>
          <button className="font-semibold" onClick={handleLogout}>
            <FaArrowRightFromBracket size={ICON_SIZE} />
            Logout
          </button>
        </li>
      </ul>
    </details>
  );
}
