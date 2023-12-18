import {
  HiHome,
  HiIdentification,
  HiShoppingCart,
  HiCalendar,
  HiClipboardList,
} from "react-icons/hi";
import { FaChild, FaExclamationCircle } from "react-icons/fa";
import { MdRequestPage, MdSports, MdCampaign } from "react-icons/md";
import { PiUsersFourFill } from "react-icons/pi";

export const ICON_SIZE = 20;
export const TOKEN_EXPIRATION = 60 * 60 * 24; // 1 day
export const COOKIE_NAME = "YSSAUTH";

export const formatDateYearFirst = (dateToFormat) => {
  const date = new Date(dateToFormat);
  let m = (date.getMonth() + 1).toString().padStart(2, 0);
  let d = date.getDate().toString().padStart(2, 0);
  return `${date.getFullYear()}-${m}-${d}`;
};

export const registrationFormRequirements = {
  email: {
    required: "Required",
    pattern: {
      value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      message: "Please enter a valid email",
    },
  },
  password: {
    required: "Required",
    minLength: {
      value: 8,
      message:
        "Password must be 8-15 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
    },
    maxLength: {
      value: 15,
      message:
        "Password must be 8-15 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
    },
    pattern: {
      value:
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
      message:
        "Password must be 8-15 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
    },
  },
};

export const parentNavLinks = [
  {
    title: "Home",
    id: "home",
    icon: <HiHome size={ICON_SIZE} />,
  },
  {
    title: "My Info",
    id: "info",
    icon: <HiIdentification size={ICON_SIZE} />,
  },
  {
    title: "My Youth",
    id: "youth",
    icon: <FaChild size={ICON_SIZE} />,
  },
  {
    title: "Payment",
    id: "payment",
    icon: <HiShoppingCart size={ICON_SIZE} />,
  },
];

export const youthNavLinks = [
  {
    title: "Home",
    id: "home",
    icon: <HiHome size={ICON_SIZE} />,
  },
  {
    title: "My Profile",
    id: "profile",
    icon: <HiIdentification size={ICON_SIZE} />,
  },
  {
    title: "My Groups",
    id: "groups",
    icon: <PiUsersFourFill size={ICON_SIZE} />,
  },
  {
    title: "My Schedule",
    id: "schedule",
    icon: <HiCalendar size={ICON_SIZE} />,
  },
];

export const adminNavLinks = [
  {
    title: "Youth",
    id: "youth",
    icon: <FaChild size={ICON_SIZE} />,
  },
  {
    title: "Parents",
    id: "parents",
    icon: <HiIdentification size={ICON_SIZE} />,
  },
  {
    title: "Groups",
    id: "groups",
    icon: <PiUsersFourFill size={ICON_SIZE} />,
  },
  {
    title: "Roster",
    id: "roster",
    icon: <HiClipboardList size={ICON_SIZE} />,
  },
  {
    title: "Counselors",
    id: "counselors",
    icon: <MdSports size={ICON_SIZE} />,
  },
  {
    title: "Financial Aid",
    id: "financialaid",
    icon: <MdRequestPage size={ICON_SIZE} />,
  },
  {
    title: "Program Info",
    id: "program",
    icon: <MdCampaign size={ICON_SIZE} />,
  },
];

export const RATING_QS = [
  {
    id: "spirituality",
    prompt: "Spirituality (Closeness to God)",
  },
  {
    id: "knowledge",
    prompt: "Religious Knowledge",
  },
  {
    id: "improvement",
    prompt: "Actively improving myself mentally, physically, spiritually",
  },
  {
    id: "community",
    prompt: "Actively involved in making my community better",
  },
];

export const OPEN_END_QS = [
  {
    id: "question",
    prompt:
      "What's one burning question you hope to get answered at this year's summit?",
  },
  {
    id: "activity",
    prompt:
      "What's one activity you're looking forward to at this year's summit?",
  },
  {
    id: "hopes",
    prompt: "What do you hope to get out of the retreat?",
  },
];

export const SHIRT_SIZES = [
  {
    id: "S",
    title: "Small",
  },
  {
    id: "M",
    title: "Medium",
  },
  {
    id: "L",
    title: "Large",
  },
  {
    id: "XL",
    title: "XLarge",
  },
  {
    id: "XXL",
    title: "XXLarge",
  },
];

export const TASKS = [
  {
    id: "personalDetails",
    title: "Complete personal details on profile",
    description: "Must be completed in order to unlock group selection",
    href: "/youth/profile",
  },
  {
    id: "survey",
    title: "Complete pre-retreat survey",
    description: "Must be completed in order to unlock group selection",
    href: "/youth/profile",
  },
  {
    id: "groupSelection",
    title: "Choose groups",
    description: "Choose your bus, family, and cabin",
    href: "/youth/groups",
  },
];
