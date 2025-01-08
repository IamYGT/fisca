import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
import { u as useTranslation } from "./TranslationContext-BjzEj_91.js";
import "react";
function EmailVerificationNotice({ status }) {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-gray-800 dark:text-gray-200", children: [
      t("email_unverified"),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: route("verification.send"),
          method: "post",
          as: "button",
          className: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800",
          children: t("resend_verification")
        }
      )
    ] }),
    status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "mt-2 text-sm font-medium text-green-600 dark:text-green-400", children: t("verification_link_sent") })
  ] });
}
export {
  EmailVerificationNotice as default
};
