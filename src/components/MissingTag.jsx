import { FaCircleExclamation } from "react-icons/fa6";

const MissingTag = () => (
  <span className="text-red-500 select-none flex items-center gap-1">
    <FaCircleExclamation size="20" /> Missing
  </span>
);

export default MissingTag;
