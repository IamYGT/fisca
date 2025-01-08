import { jsx } from "react/jsx-runtime";
const PriorityBadge = ({ priority }) => {
  const colors = {
    low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  };
  return /* @__PURE__ */ jsx("span", { className: `px-3 py-1.5 text-xs font-medium rounded-full ${colors[priority]}`, children: priority });
};
const StatusBadge = ({ status }) => {
  const colors = {
    open: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    answered: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    closed: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  };
  return /* @__PURE__ */ jsx("span", { className: `px-3 py-1.5 text-xs font-medium rounded-full ${colors[status]}`, children: status });
};
export {
  PriorityBadge,
  StatusBadge
};
