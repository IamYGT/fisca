import { jsxs, jsx } from "react/jsx-runtime";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { u as useTranslation } from "./TranslationContext-BjzEj_91.js";
import "react";
function UserInfoPanel({ user }) {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 dark:text-gray-100 mb-4", children: t("ticket.userInformation") }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(FaUser, { className: "w-4 h-4 text-gray-400" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-700 dark:text-gray-300", children: user.name })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(FaEnvelope, { className: "w-4 h-4 text-gray-400" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-700 dark:text-gray-300", children: user.email })
      ] })
    ] })
  ] });
}
export {
  UserInfoPanel as default
};
