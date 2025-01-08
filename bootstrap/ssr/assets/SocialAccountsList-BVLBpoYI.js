import { jsx, jsxs } from "react/jsx-runtime";
import { u as useTranslation } from "./TranslationContext-BjzEj_91.js";
import { FaGithub, FaGoogle, FaFacebook } from "react-icons/fa";
import "react";
const socialIcons = {
  github: FaGithub,
  google: FaGoogle,
  facebook: FaFacebook
};
const socialColors = {
  github: "text-gray-800 dark:text-gray-200",
  google: "text-red-500",
  facebook: "text-blue-600"
};
const socialNames = {
  github: "GitHub",
  google: "Google",
  facebook: "Facebook"
};
function SocialAccountsList({ connectedAccounts, className = "" }) {
  const { t } = useTranslation();
  const connectedProviders = Object.entries(connectedAccounts).filter(([_, isConnected]) => isConnected);
  if (connectedProviders.length === 0) {
    return /* @__PURE__ */ jsx("div", { className, children: /* @__PURE__ */ jsx("p", { className: "text-gray-500 dark:text-gray-400 text-sm", children: t("no_connected_accounts") }) });
  }
  return /* @__PURE__ */ jsx("div", { className, children: /* @__PURE__ */ jsx("div", { className: "space-y-4", children: connectedProviders.map(([provider]) => {
    const Icon = socialIcons[provider];
    const colorClass = socialColors[provider];
    const providerName = socialNames[provider];
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: "flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center flex-1", children: [
            /* @__PURE__ */ jsx(Icon, { className: `h-6 w-6 ${colorClass}` }),
            /* @__PURE__ */ jsx("span", { className: "ml-3 font-medium text-gray-900 dark:text-gray-100", children: providerName })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400", children: t("connected") })
        ]
      },
      provider
    );
  }) }) });
}
export {
  SocialAccountsList as default
};
